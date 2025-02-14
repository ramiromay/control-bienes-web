import { useEffect, useState } from "react";
import useFormPasos from "../../context/useFormPasos";
import { useSeguridad } from "../../context/SeguridadContext";
import { getNacionalidades, getNombramientos } from "../../services/general";
import { useSistema } from "../../context/SistemaContext";
import { getPermisos, getRoles } from "../../services/seguridad";
import { empleadoValidacion } from "../../settings/validacionConfig";
import SeguridadFormEmpleado from "./SeguridadFormEmpleado";
import SeguridadFormUsuario from "./SeguridadFormUsuario";
import SeguridadFormRolPermiso from "./SeguridadFormRolPermiso";
import { mapArray } from "../../settings/utils";
import {
  compNacionalidadesMappingRules,
  compNombramientoMappingRules,
  compRolesMappingRules,
} from "../../settings/mappingRulesConfig";
import { useSnackbar } from "../../context/SnackbarContext";
import useTabla from "../../context/Tabla/useTabla";
import { CAMPOS_EMPLEADO } from "../../settings/formConfig";
import dayjs from "dayjs";
import { DATE_FORMAT } from "../../settings/appConstants";
import DialogoEmergentePasos from "../utils/DialogoEmergentePasos";

const formEmpleado = 0;
const formUsuario = 1;
const pasosFormEmpleado = ["Empleado", "Usuario", "Rol Y Permisos"];

const SeguridadForm = () => {
  const { handleError } = useSistema();
  const {
    dialogo,
    handleCerrarDialogo,
    handleEnviar,
    handleGetEmpleadoById,
    getTituloDialogo,
    esDialogoModificacion,
    esDialogoVisualizacion,
  } = useSeguridad();
  const { showSnackbar } = useSnackbar();
  const { filaSeleccionada } = useTabla();
  const [cargando, setCargando] = useState(false);
  const [complemento, setComplemento] = useState({
    nombramientos: [],
    nacionalidades: [],
    roles: [],
    permisos: [],
    empleado: null,
  });
  const esVisualizacion = esDialogoVisualizacion();
  const esModificacion = esDialogoModificacion();
  const tituloDialogo = getTituloDialogo("Empleado Y Usuario");
  const idEmpleado = filaSeleccionada[0];
  const {
    pasoManager,
    formManager,
    handleSiguientePaso,
    handlePasoAnterior,
    handleCloseForm,
  } = useFormPasos({
    schemes: empleadoValidacion(esModificacion),
    handleClose: handleCerrarDialogo,
    stepsLength: pasosFormEmpleado.length,
    esVisualizacion: esVisualizacion,
  });
  const { indexActual, indexError } = pasoManager;
  const { formState, handleSubmit, setValue } = formManager;
  const { errors } = formState;

  useEffect(() => {
    setCargando(true);
    Promise.all([
      getNombramientos(),
      getNacionalidades(),
      getRoles(),
      getPermisos(),
      handleGetEmpleadoById(idEmpleado),
    ])
      .then(([nombramientos, nacionalidades, roles, permisos, empleado]) => {
        const nombramientosMap = mapArray(
          nombramientos,
          compNombramientoMappingRules
        );
        const nacionalidadesMap = mapArray(
          nacionalidades,
          compNacionalidadesMappingRules
        );
        const rolesMap = mapArray(roles, compRolesMappingRules);
        setComplemento({
          nombramientos: nombramientosMap,
          nacionalidades: nacionalidadesMap,
          roles: rolesMap,
          permisos: permisos,
          empleado: empleado,
        });
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        setCargando(false);
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const empleado = complemento.empleado;
    if (empleado) {
      const {
        idEmpleado,
        nombres,
        apellidoPaterno,
        apellidoMaterno,
        hombre,
        fechaNacimiento,
        rfc,
        idNacionalidad,
        usuario,
        email,
        telefono,
        idRol,
        permisos,
        fechaIngreso,
        idNombramiento,
        activo,
        fechaCreacion,
        fechaModificacion,
      } = empleado;
      const nacionalidadSeleccionada = complemento.nacionalidades.find(
        (e) => e.id === idNacionalidad
      );
      const nombramientoSeleccionado = complemento.nombramientos.find(
        (e) => e.id === idNombramiento
      );
      const rolSeleccionado = complemento.roles.find((e) => e.id === idRol);
      const dateFormat = DATE_FORMAT.DEFAULT;

      setValue(CAMPOS_EMPLEADO.ID_EMPLEADO, idEmpleado);
      setValue(CAMPOS_EMPLEADO.NOMBRES, nombres);
      setValue(CAMPOS_EMPLEADO.APELLIDO_PATERNO, apellidoPaterno);
      setValue(CAMPOS_EMPLEADO.APELLIDO_MATERNO, apellidoMaterno);
      setValue(CAMPOS_EMPLEADO.HOMBRE, hombre);
      setValue(CAMPOS_EMPLEADO.FECHA_NACIMIENTO, dayjs(fechaNacimiento));
      setValue(CAMPOS_EMPLEADO.RFC, rfc);
      setValue(CAMPOS_EMPLEADO.NACIONALIDAD, nacionalidadSeleccionada);
      setValue(CAMPOS_EMPLEADO.USUARIO, usuario);
      setValue(CAMPOS_EMPLEADO.EMAIL, email);
      setValue(CAMPOS_EMPLEADO.TELEFONO, telefono);
      setValue(CAMPOS_EMPLEADO.ROL, rolSeleccionado);
      setValue(CAMPOS_EMPLEADO.PERMISOS, permisos);
      setValue(CAMPOS_EMPLEADO.FECHA_INGRESO, dayjs(fechaIngreso));
      setValue(CAMPOS_EMPLEADO.NOMBRAMIENTO, nombramientoSeleccionado);
      setValue(CAMPOS_EMPLEADO.ACTIVO, activo);
      setValue(
        CAMPOS_EMPLEADO.FECHA_CREACION,
        dayjs(fechaCreacion).format(dateFormat)
      );
      setValue(
        CAMPOS_EMPLEADO.FECHA_MODIFICACION,
        dayjs(fechaModificacion).format(dateFormat)
      );
    }
  }, [complemento]);

  const handleSubmitEmpleado = handleSubmit(async (data) => {
    if (indexActual !== pasosFormEmpleado.length) return;
    setCargando(true);
    await handleEnviar(idEmpleado, data)
      .then(() => {
        handleCloseForm();
        const mensaje = esModificacion
          ? "Empleado modificado exitosamente"
          : "Empleado creado exitosamente";
        showSnackbar(mensaje);
      })
      .catch((error) => {
        handlePasoAnterior();
        handleError(error);
      })
      .finally(() => {
        setCargando(false);
      });
  });

  const getStepContent = (step) => {
    switch (step) {
      case formEmpleado:
        return (
          <SeguridadFormEmpleado
            formManager={formManager}
            nacionalidades={complemento.nacionalidades}
            nombramientos={complemento.nombramientos}
            esVisualizacion={esVisualizacion}
            esModificacion={esModificacion}
          />
        );
      case formUsuario:
        return (
          <SeguridadFormUsuario
            formManager={formManager}
            esModificacion={esModificacion}
            esVisualizacion={esVisualizacion}
          />
        );
      default:
        return (
          <SeguridadFormRolPermiso
            formManager={formManager}
            permisos={complemento.permisos}
            roles={complemento.roles}
            esVisualizacion={esVisualizacion}
          />
        );
    }
  };

  return (
    <DialogoEmergentePasos
      abierto={dialogo.abierto}
      titulo={tituloDialogo}
      pasos={pasosFormEmpleado}
      indexActual={indexActual}
      indexError={indexError}
      cargando={cargando}
      handleEnviar={handleSubmitEmpleado}
      handleCerrar={handleCloseForm}
      getContenidoPaso={getStepContent}
      handleSiguiente={handleSiguientePaso}
      handleAnterior={handlePasoAnterior}
      isVisualizacion={esVisualizacion}
      errors={errors}
    />
  );
};

export default SeguridadForm;
