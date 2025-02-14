import { useEffect, useState } from "react";
import DialogoEmergentePasos from "../../../../../utils/DialogoEmergentePasos";
import { useMultiTabla } from "../../../../../../context/MultiTablaContext";
import { useSistema } from "../../../../../../context/SistemaContext";
import { useAdministradorMueble } from "../../../../../../context/AdministradorMuebleContext";
import {
  muebleDesincorporacionValidaicion,
  solicitudMuebleValidacion,
  vehiculoDesincorporacionValidaicion,
} from "../../../../../../settings/validacionConfig";
import useFormPasos from "../../../../../../context/useFormPasos";
import AdministradorMuebleDesincorporacionDatoGeneralForm from "./AdministradorVehiculoDesincorporacionDatoGeneralForm";
import { useSnackbar } from "../../../../../../context/SnackbarContext";
import { getUnidadesAdministrativas } from "../../../../../../services/general";
import { getBienesInventarioPorTipo } from "../../../../../../services/patrimonio";
import { mapArray } from "../../../../../../settings/utils";
import {
  compEmpleadoMappingRules,
  compUnidadAdministrativaMappingRules,
  entDesincorporacionVehiculoMappingRules,
} from "../../../../../../settings/mappingRulesConfig";
import {
  CAMPOS_DESINCORPORACION_MUEBLE,
  CAMPOS_DESINCORPORACION_VEHICULO,
} from "../../../../../../settings/formConfig";
import dayjs from "dayjs";
import { useAdministradorVehiculo } from "../../../../../../context/AdministradorVehiculoContext";
import AdministradorVehiculoDesincorporacionDatoGeneralForm from "./AdministradorVehiculoDesincorporacionDatoGeneralForm";
import { getEmpleados } from "../../../../../../services/seguridad";

const pasosFormDesincorporacionMueble = ["Datos Generales"];
const AdministradorVehiculoDesincorporacionForm = () => {
  const { handleError } = useSistema();
  const {
    dialogoTramites,
    handleEnviarTramiteDesincorporacionVehiculo,
    handleCargarTramites,
    handleGetTramiteDesincorporacionVehiculo,
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
    detalleDesincorporacion: null,
  });
  const esVisualizacion = esDialogoVisualizacion();
  const esCreacion = esDialogoCreacion();
  const tituloDialogo = getTituloDialogo("Desincorporación Bien Mueble");
  const { showSnackbar } = useSnackbar();

  const {
    pasoManager,
    formManager,
    handleSiguientePaso,
    handlePasoAnterior,
    handleCloseForm,
  } = useFormPasos({
    schemes: vehiculoDesincorporacionValidaicion,
    handleClose: handleCerrarDialogo,
    stepsLength: pasosFormDesincorporacionMueble.length,
    esVisualizacion: esVisualizacion,
  });
  const { indexActual, indexError } = pasoManager;
  const { formState, handleSubmit, setValue } = formManager;
  const { errors } = formState;

  const handleSubmitDesincorporacionVehiculo = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviarTramiteDesincorporacionVehiculo({
      filaSeleccionada: tablaInferior,
      formData: data,
      esCreacion: esCreacion,
    })
      .then(() => {
        handleCloseForm();
        const mensaje = esCreacion
          ? "Tramite de desincorporación creado correctamente"
          : "Tramite de desincorporación modificado correctamente";
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
      handleGetTramiteDesincorporacionVehiculo({
        filaSeleccionada: tablaInferior,
      }),
    ])
      .then(
        ([
          empleadosData,
          unidadesAdministrativasData,
          bienes,
          detalleDesincorporacion,
        ]) => {
          const empleados = mapArray(empleadosData, compEmpleadoMappingRules);
          const unidadesAdministrativas = mapArray(
            unidadesAdministrativasData,
            compUnidadAdministrativaMappingRules
          );

          setComplementos({
            empleados: empleados,
            bienes: bienes,
            unidadesAdministrativas: unidadesAdministrativas,
            detalleDesincorporacion: detalleDesincorporacion,
          });
        }
      )
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  useEffect(() => {
    const {
      detalleDesincorporacion,
      bienes,
      unidadesAdministrativas,
      empleados,
    } = complementos;
    if (detalleDesincorporacion) {
      console.log(detalleDesincorporacion);
      const foliosBien = detalleDesincorporacion.folioBien.split(",");
      setValue(
        CAMPOS_DESINCORPORACION_VEHICULO.FOLIO_SOLICITUD,
        detalleDesincorporacion.idSolicitud
      );
      setValue(
        CAMPOS_DESINCORPORACION_VEHICULO.EMPLEADO,
        empleados.find((e) => (e.id = detalleDesincorporacion.idEmpleado))
      );
      setValue(
        CAMPOS_DESINCORPORACION_VEHICULO.UNIDAD_ADMINISTRATIVA,
        unidadesAdministrativas.find(
          (e) => e.id === detalleDesincorporacion.nivelUnidadAdministrativa
        )
      );
      setValue(
        CAMPOS_DESINCORPORACION_VEHICULO.FOLIO_BIEN,
        bienes.filter((e) => foliosBien.includes(e.folioBien))
      );
      setValue(
        CAMPOS_DESINCORPORACION_VEHICULO.OBSERVACIONES,
        detalleDesincorporacion.observaciones
      );
      setValue(
        CAMPOS_DESINCORPORACION_VEHICULO.FECHA_PUBLICACION,
        detalleDesincorporacion.fechaPublicacion
          ? dayjs(detalleDesincorporacion.fechaPublicacion)
          : null
      );
      setValue(
        CAMPOS_DESINCORPORACION_VEHICULO.NO_PUBLICACION,
        detalleDesincorporacion.numeroPublicacion
      );
      setValue(
        CAMPOS_DESINCORPORACION_VEHICULO.DESCRIPCION_DESINCORPORACION,
        detalleDesincorporacion.descripcionDesincorporacion
      );
    }
  }, [complementos.detalleDesincorporacion]);

  const getStepContent = (step) => {
    switch (step) {
      default:
        return (
          <AdministradorVehiculoDesincorporacionDatoGeneralForm
            formManager={formManager}
            esVisualizacion={esVisualizacion}
            complementos={complementos}
            informacionExtra={informacionTablaSuperior}
          />
        );
    }
  };
  return (
    <DialogoEmergentePasos
      abierto={dialogo.abierto}
      titulo={tituloDialogo}
      pasos={pasosFormDesincorporacionMueble}
      indexActual={indexActual}
      indexError={indexError}
      cargando={cargando}
      handleEnviar={handleSubmitDesincorporacionVehiculo}
      handleCerrar={handleCloseForm}
      getContenidoPaso={getStepContent}
      handleSiguiente={handleSiguientePaso}
      handleAnterior={handlePasoAnterior}
      isVisualizacion={esVisualizacion}
      errors={errors}
    />
  );
};

export default AdministradorVehiculoDesincorporacionForm;
