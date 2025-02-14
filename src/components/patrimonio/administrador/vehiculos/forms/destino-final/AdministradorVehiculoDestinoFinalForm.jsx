import { useEffect, useState } from "react";
import DialogoEmergentePasos from "../../../../../utils/DialogoEmergentePasos";
import { useSistema } from "../../../../../../context/SistemaContext";
import { useAdministradorMueble } from "../../../../../../context/AdministradorMuebleContext";
import { useMultiTabla } from "../../../../../../context/MultiTablaContext";
import useFormPasos from "../../../../../../context/useFormPasos";
import {
  muebleDestinoFinalValidacion,
  vehiculoDestinoFinalValidacion,
} from "../../../../../../settings/validacionConfig";
import { useSnackbar } from "../../../../../../context/SnackbarContext";
import { getBienesInventarioPorTipo } from "../../../../../../services/patrimonio";
import { getUnidadesAdministrativas } from "../../../../../../services/general";
import {
  compEmpleadoMappingRules,
  compUnidadAdministrativaMappingRules,
} from "../../../../../../settings/mappingRulesConfig";
import { mapArray } from "../../../../../../settings/utils";
import { CAMPOS_DESTINO_FINAL_VEHICULO } from "../../../../../../settings/formConfig";
import dayjs from "dayjs";
import { getEmpleados } from "../../../../../../services/seguridad";
import AdministradorVehiculoDestinoFinalDatoGeneralForm from "./AdministradorVehiculoDestinoFinalDatoGeneralForm";
import { useAdministradorVehiculo } from "../../../../../../context/AdministradorVehiculoContext";
import { MOTIVO_TRAMITE } from "../../../../../../settings/sistemaConfig";

const pasosFormDestinoFinal = ["Datos Generales"];
const AdministradorVehiculoDestinoFinalForm = () => {
  const { handleError } = useSistema();
  const {
    dialogoTramites,
    handleEnviarDestinoFinalVehiculo,
    handleCargarTramites,
    handleGetTramiteDestinoFinalVehiculo,
  } = useAdministradorVehiculo();
  const {
    dialogo,
    esDialogoVisualizacion,
    esDialogoCreacion,
    handleCerrarDialogo,
    getTituloDialogo,
  } = dialogoTramites;
  const { filaSeleccionada, handleQuitarSeleccionTablaInferior } =
    useMultiTabla();
  const { informacionTablaSuperior, informacionTablaInferior } =
    filaSeleccionada;
  const { tablaSuperior, tablaInferior } = filaSeleccionada;
  const [cargando, setCargando] = useState(false);
  const [complementos, setComplementos] = useState({
    empleados: [],
    unidadesAdministrativas: [],
    bienes: [],
    detalleDestinoFinal: null,
  });
  const esVisualizacion = esDialogoVisualizacion();
  const esCreacion = esDialogoCreacion();
  const tituloDialogo = getTituloDialogo("Destino Final Bien Vehículo");
  const { showSnackbar } = useSnackbar();
  const esEnajenacion =
    informacionTablaSuperior.idMotivoTramite ===
    MOTIVO_TRAMITE.ENAJENACION_VEHICULOS;

  const {
    pasoManager,
    formManager,
    handleSiguientePaso,
    handlePasoAnterior,
    handleCloseForm,
  } = useFormPasos({
    schemes: vehiculoDestinoFinalValidacion(
      informacionTablaSuperior.idMotivoTramite
    ),
    handleClose: handleCerrarDialogo,
    stepsLength: pasosFormDestinoFinal.length,
    esVisualizacion: esVisualizacion,
  });
  const { indexActual, indexError } = pasoManager;
  const { formState, handleSubmit, setValue } = formManager;
  const { errors } = formState;

  const handleSubmitDestinoFinalVehiculo = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviarDestinoFinalVehiculo({
      filaSeleccionada: tablaInferior,
      formData: data,
      esCreacion: esCreacion,
    })
      .then(() => {
        handleCloseForm();
        const mensaje = esCreacion
          ? "Tramite de destino final creado correctamente"
          : "Tramite de destino final modificado correctamente";
        showSnackbar(mensaje);
        handleQuitarSeleccionTablaInferior();
        handleCargarTramites({ filaSeleccionada: tablaSuperior });
      })
      .catch((error) => {
        handlePasoAnterior();
        handleError(error);
        console.error(error);
      })
      .finally(() => {
        setCargando(false);
      });
  });

  useEffect(() => {
    const idDetalleSolicitud =
      informacionTablaInferior && informacionTablaInferior.idDetalleSolicitud
        ? informacionTablaInferior.idDetalleSolicitud
        : null;
    setCargando(true);
    Promise.all([
      getEmpleados(),
      getUnidadesAdministrativas({ desdeNivel: 3, hastaNivel: 3 }),
      getBienesInventarioPorTipo({
        idTipoBien: 3,
        detalleSolicitud: idDetalleSolicitud,
      }),
      handleGetTramiteDestinoFinalVehiculo({ filaSeleccionada: tablaInferior }),
    ])
      .then(
        ([
          empleadosData,
          unidadesAdministrativasData,
          bienes,
          detalleDestinoFinal,
        ]) => {
          const empleados = mapArray(empleadosData, compEmpleadoMappingRules);
          const unidadesAdministrativas = mapArray(
            unidadesAdministrativasData,
            compUnidadAdministrativaMappingRules
          );
          setValue(
            CAMPOS_DESTINO_FINAL_VEHICULO.MOTIVO_TRAMITE,
            informacionTablaSuperior.idMotivoTramite
          );
          setComplementos({
            empleados: empleados,
            bienes: bienes,
            unidadesAdministrativas: unidadesAdministrativas,
            detalleDestinoFinal: detalleDestinoFinal,
          });
        }
      )
      .catch((error) => {
        handleError(error);
        console.log(error);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  useEffect(() => {
    const { detalleDestinoFinal, bienes, unidadesAdministrativas, empleados } =
      complementos;
    if (detalleDestinoFinal) {
      const foliosBien = detalleDestinoFinal.folioBien.split(",");
      console.log(detalleDestinoFinal);
      setValue(
        CAMPOS_DESTINO_FINAL_VEHICULO.FOLIO_SOLICITUD,
        detalleDestinoFinal.idSolicitud
      );
      setValue(
        CAMPOS_DESTINO_FINAL_VEHICULO.EMPLEADO,
        empleados.find((e) => e.id === detalleDestinoFinal.idEmpleado)
      );
      setValue(
        CAMPOS_DESTINO_FINAL_VEHICULO.FOLIO_BIEN,
        bienes.filter((e) => foliosBien.includes(e.folioBien))
      );
      setValue(
        CAMPOS_DESTINO_FINAL_VEHICULO.UNIDAD_ADMINISTRATIVA,
        unidadesAdministrativas.find(
          (e) => e.id === detalleDestinoFinal.nivelUnidadAdministrativa
        )
      );
      if (informacionTablaSuperior.idMotivoTramite === 55) {
        setValue(
          CAMPOS_DESTINO_FINAL_VEHICULO.FOLIO_DESTRUCCION,
          detalleDestinoFinal.folioDestruccion
        );
        setValue(
          CAMPOS_DESTINO_FINAL_VEHICULO.FECHA_DESTRUCCION,
          detalleDestinoFinal.fechaDestruccion
            ? dayjs(detalleDestinoFinal.fechaDestruccion)
            : null
        );
        setValue(
          CAMPOS_DESTINO_FINAL_VEHICULO.DESCRIPCION_DESTRUCCION,
          detalleDestinoFinal.descripcionDestruccion
        );
      } else if (informacionTablaSuperior.idMotivoTramite === 54) {
        // folioEnajenacion: null,
        // fechaEnajenacion: null,
        // avaluoEnajenacion: null,
        // importeAvaluoEnajenacion: null,
        // importeEnajenacion: null,
        // descripcionEnajenacion: null
        setValue(
          CAMPOS_DESTINO_FINAL_VEHICULO.FOLIO_ENAJENACION,
          detalleDestinoFinal.folioEnajenacion
        );
        setValue(
          CAMPOS_DESTINO_FINAL_VEHICULO.FECHA_ENAJENACION,
          detalleDestinoFinal.fechaEnajenacion
            ? dayjs(detalleDestinoFinal.fechaEnajenacion)
            : null
        );
        setValue(
          CAMPOS_DESTINO_FINAL_VEHICULO.AVALUO_ENAJENACION,
          detalleDestinoFinal.avaluoEnajenacion
        );
        setValue(
          CAMPOS_DESTINO_FINAL_VEHICULO.IMPORTE_ENAJENACION,
          detalleDestinoFinal.importeAvaluoEnajenacion
        );
        setValue(
          CAMPOS_DESTINO_FINAL_VEHICULO.DESCRIPCION_ENAJENACION,
          detalleDestinoFinal.descripcionEnajenacion
        );
      }
    }
  }, [complementos.detalleDestinoFinal]);

  const getStepContent = (step) => {
    switch (step) {
      default:
        return (
          <AdministradorVehiculoDestinoFinalDatoGeneralForm
            formManager={formManager}
            esVisualizacion={esVisualizacion}
            complementos={complementos}
            esEnajenacion={esEnajenacion}
            informacionExtra={informacionTablaSuperior}
          />
        );
    }
  };
  return (
    <DialogoEmergentePasos
      abierto={dialogo.abierto}
      titulo={tituloDialogo}
      pasos={pasosFormDestinoFinal}
      indexActual={indexActual}
      indexError={indexError}
      cargando={cargando}
      handleEnviar={handleSubmitDestinoFinalVehiculo}
      handleCerrar={handleCloseForm}
      getContenidoPaso={getStepContent}
      handleSiguiente={handleSiguientePaso}
      handleAnterior={handlePasoAnterior}
      isVisualizacion={esVisualizacion}
      errors={errors}
    />
  );
};

export default AdministradorVehiculoDestinoFinalForm;
