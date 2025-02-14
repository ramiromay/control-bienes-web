import { createContext, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { administradorSolicitudesValidacion } from "../settings/validacionConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CAMPOS_ALTA_VEHICULO,
  CAMPOS_BAJA_INMUEBLE,
  CAMPOS_BAJA_VEHICULO,
  CAMPOS_DESINCORPORACION_VEHICULO,
  CAMPOS_DESTINO_FINAL_VEHICULO,
  CAMPOS_FILTRO_ADMINISTRADOR_SOLICITUDES,
  CAMPOS_MODIFICACION_INMUEBLE,
  CAMPOS_MODIFICACION_VEHICULO,
  CAMPOS_MOVIMIENTO_VEHICULO,
} from "../settings/formConfig";
import {
  actualizarTramiteAltaInmueble,
  actualizarTramiteAltaMueble,
  actualizarTramiteAltaVehiculo,
  actualizarTramiteBajaInmueble,
  actualizarTramiteBajaMueble,
  actualizarTramiteBajaVehiculo,
  actualizarTramiteDesincorporacionMueble,
  actualizarTramiteDesincorporacionVehiculo,
  actualizarTramiteDestinoFinalMueble,
  actualizarTramiteDestinoFinalVehiculo,
  actualizarTramiteModificacionInmueble,
  actualizarTramiteModificacionMueble,
  actualizarTramiteModificacionVehiculo,
  actualizarTramiteMovimientoMueble,
  actualizarTramiteMovimientoVehiculo,
  cambiarEtapaSolicitudMueble,
  cambiarEtapaTramiteInmueble,
  cambiarEtapaTramiteMueble,
  cambiarEtapaTramiteVehiculo,
  crearSolicitud,
  crearSolicitudInmueble,
  crearSolicitudVehiculo,
  crearTramiteAltaInmueble,
  crearTramiteAltaMueble,
  crearTramiteAltaVehiculo,
  crearTramiteBajaInmueble,
  crearTramiteBajaMueble,
  crearTramiteBajaVehiculo,
  crearTramiteDesincorporacionMueble,
  crearTramiteDesincorporacionVehiculo,
  crearTramiteDestinoFinalMueble,
  crearTramiteDestinoFinalVehiculo,
  crearTramiteModificacionInmueble,
  crearTramiteModificacionMueble,
  crearTramiteModificacionVehiculo,
  crearTramiteMovimientoMueble,
  crearTramiteMovimientoVehiculo,
  getDepreciacionPorBien,
  getEtapasPorSolicitud,
  getEtapasPorTramite,
  getSolicitudesInmuebles,
  getSolicitudesMuebles,
  getSolicitudesVehiculos,
  getSolicitudInmueble,
  getSolicitudMueble,
  getSolicitudPemiteModificaciones,
  getSolicitudVehiculo,
  getTramiteAltaInmueble,
  getTramiteAltaMueble,
  getTramiteAltaVehiculo,
  getTramiteBajaInmueble,
  getTramiteBajaMueble,
  getTramiteBajaVehiculo,
  getTramiteDesincorporacionMueble,
  getTramiteDesincorporacionVehiculo,
  getTramiteDestinoFinalMueble,
  getTramiteDestinoFinalVehiculo,
  getTramiteModificacionInmueble,
  getTramiteModificacionMueble,
  getTramiteModificacionVehiculo,
  getTramiteMovimientoMueble,
  getTramiteMovimientoVehiculo,
  getTramitesPorSolicitud,
  modificarSolicitudInmueble,
  modificarSolicitudMueble,
  modificarSolicitudVehiculo,
} from "../services/patrimonio";
import { getColumnasTablaSubModulo } from "../services/sistema";
import { IDS_SUBMODULOS, TIPOS_TRAMITES } from "../settings/sistemaConfig";
import { mapArray, mapObject, mapToTree } from "../settings/utils";
import {
  compColumnasTablaMappingRules,
  entAltaInmuebleMappingRules,
  entAltaMuebleMappingRules,
  entAltaVehiculoMappingRules,
  entBajaInmuebleMappingRules,
  entBajaMuebleMappingRules,
  entBajaVehiculoMappingRules,
  entDesincorporacionMuebleMappingRules,
  entDesincorporacionVehiculoMappingRules,
  entDestinoFinalMuebleMappingRules,
  entDestinoFinalVehiculoMappingRules,
  entModificacionInmuebleMappingRules,
  entModificacionMuebleMappingRules,
  entModificacionVehiculoMappingRules,
  entMovimientoMuebleMappingRules,
  entMovimientoVehiculoMappingRules,
  entSolicitudMueble,
  entSolicitudVehiculo,
} from "../settings/mappingRulesConfig";
import { getPeriodos, getUnidadesAdministrativas } from "../services/general";
import { useSistema } from "./SistemaContext";
import {
  DATE_FORMAT,
  MODO_CARGA,
  MODO_DIALOGO,
} from "../settings/appConstants";
import { useSnackbar } from "./SnackbarContext";
import useMultiTablaDatos from "./useMultiTablaDatos";
import useDialogoControl from "./useDialogoControl";

const AdministradorInmuebleContext = createContext();

export const useAdministradorInmueble = () => {
  const context = useContext(AdministradorInmuebleContext);
  if (!context) {
    throw new Error(
      "useAdministradorSolicitudes debe ser usado dentro de un AdministradorSolicitudesProvider"
    );
  }
  return context;
};

const estadoInicialTablaSuperior = {
  columnas: [],
  datos: [],
  campoId: "id",
  titulo: "Solicitudes",
};

const estadoInicialTablaInferior = {
  columnas: [],
  datos: [],
  campoId: "id",
  titulo: "Trámites",
};

const estadoInicialDialogo = {
  abierto: false,
  modo: MODO_DIALOGO.CREACION,
  id: 0,
};

export const AdministradorInmuebleProvider = ({ children }) => {
  const idSubModulo = IDS_SUBMODULOS.ADMINISTRADOR_CEDULAS_BIENES_INMUEBLES;
  const { PERIODO, BUSQUEDA_FECHA, FECHA_INICIO, FECHA_FIN } =
    CAMPOS_FILTRO_ADMINISTRADOR_SOLICITUDES;
  const multiTabla = useMultiTablaDatos({
    estadoInicialTablaSuperior: estadoInicialTablaSuperior,
    estadoInicialTablaInferior: estadoInicialTablaInferior,
  });
  const dialogoSolicitudes = useDialogoControl({
    estadoInicialDialogo: estadoInicialDialogo,
  });
  const dialogoTramites = useDialogoControl({
    estadoInicialDialogo: estadoInicialDialogo,
  });
  const {
    cargando,
    addDatosTablaInferior,
    addDatosTablaSuperior,
    iniciarCargaTablas,
    finalizarCargaTablas,
    iniciarCargaTablaInferior,
    finalizarCargaTablaInferior,
    addColumnasTablaSuperior,
    addColumnasTablaInferior,
  } = multiTabla;
  const { handleIniciarCarga, handleFinalizarCarga, handleError, sleep } =
    useSistema();
  const { showSnackbar } = useSnackbar();
  const formManager = useForm({
    resolver: yupResolver(administradorSolicitudesValidacion),
    mode: "onChange",
  });
  const { setValue, getValues, trigger } = formManager;
  const [inicio, setInicio] = useState(false);
  const [unidadAdministrativa, setUnidadAdministrativa] = useState([]);
  const [opcionesFiltros, setOpcionesFiltros] = useState({
    periodos: [],
    unidadesAdministrativas: [],
  });

  const handleUnidadAdministrativa = (idUnidadAdministrativa) => {
    if (!inicio) {
      setInicio(true);
    }
    setUnidadAdministrativa(idUnidadAdministrativa);
  };

  const obtenerParametrosFiltro = () => ({
    periodo: getValues(PERIODO).id,
    unidadAdministrativa: unidadAdministrativa,
    busquedaPorFecha: getValues(BUSQUEDA_FECHA),
    fechaInicio: getValues(FECHA_INICIO).format(DATE_FORMAT.ESTANDAR),
    fechaFin: getValues(FECHA_FIN).format(DATE_FORMAT.ESTANDAR),
  });

  const handleGetSolicitudesInmuebles = () => {
    return new Promise((resolve, reject) => {
      trigger()
        .then((valido) => {
          if (!inicio) {
            resolve([]);
            return;
          }
          if (!valido) {
            throw new Error(
              "Por favor, revisa los Filtros de Búsqueda. Algunos campos obligatorios están incompletos o contienen errores."
            );
          }

          if (unidadAdministrativa.length === 0) {
            throw new Error(
              "Por favor, selecciona una Unidad Administrativa para continuar con tu solicitud."
            );
          }

          const parametrosFiltro = obtenerParametrosFiltro();
          return getSolicitudesInmuebles(parametrosFiltro);
        })
        .then((solicitudesData) => {
          resolve(solicitudesData);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const handleGetSolicitudInmueble = ({ filaSeleccionada }) => {
    return new Promise((resolve, reject) => {
      if (dialogoSolicitudes.esDialogoCreacion()) {
        resolve(null);
        return;
      }
      getSolicitudInmueble({ idSolicitud: filaSeleccionada[0] })
        .then((solicitudData) => {
          resolve(solicitudData);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const handleGetTramitesMueblePorSolicitud = ({ filaSeleccionada }) => {
    return new Promise((resolve, reject) => {
      if (filaSeleccionada.length === 0) {
        sleep(500).then(() => resolve([]));
        return;
      }
      getTramitesPorSolicitud({ idSolicitud: filaSeleccionada[0] })
        .then((tramitesData) => {
          resolve(tramitesData);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const handleCargarTramites = ({ filaSeleccionada }) => {
    iniciarCargaTablaInferior();
    handleGetTramitesMueblePorSolicitud({ filaSeleccionada: filaSeleccionada })
      .then((tramitesData) => {
        addDatosTablaInferior(tramitesData);
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        finalizarCargaTablaInferior();
      });
  };

  const handleCrearSolicitudVehiculo = ({ formData }) => {
    return new Promise((resolve, reject) => {
      const data = mapObject(formData, entSolicitudVehiculo);

      crearSolicitudInmueble({ data: data })
        .then(() => {
          showSnackbar("Solicitud creada correctamente");
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const handleModificarSolicitudVehiculo = ({ formData, idSolicitud }) => {
    return new Promise((resolve, reject) => {
      const data = mapObject(formData, entSolicitudVehiculo);
      modificarSolicitudInmueble({
        idSolicitud: idSolicitud,
        data: data,
      })
        .then(() => {
          showSnackbar("Solicitud modificada correctamente");
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const handleValidarSolicitudPermiteModificacion = ({ filaSeleccionada }) => {
    return new Promise((resolve, reject) => {
      const idSolicitud = filaSeleccionada[0];
      getSolicitudPemiteModificaciones({ idSolicitud: idSolicitud })
        .then((permiteModificacion) => {
          resolve(permiteModificacion);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const handleGetEtapaPorSolicitud = ({ filaSeleccionada }) => {
    return new Promise((resolve, reject) => {
      if (filaSeleccionada.length === 0) {
        resolve([]);
        return;
      }
      const idSolicitud = filaSeleccionada[0];
      getEtapasPorSolicitud({ idSolicitud: idSolicitud })
        .then((solicitudData) => {
          resolve(solicitudData);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const handleGetEtapasPorTramite = async ({ filaSeleccionada }) => {
    if (filaSeleccionada.length === 0) {
      return [];
    }
    return await getEtapasPorTramite({ idTramite: filaSeleccionada[0] });
  };

  const handleCambiarEtapaTramiteMueble = async ({
    filaSeleccionada,
    etapa,
  }) => {
    if (filaSeleccionada.length === 0) {
      return [];
    }
    await cambiarEtapaTramiteInmueble({
      idTramite: filaSeleccionada[0],
      etapa: etapa,
    });
  };

  const handleCambiarEtapaSolicitudMueble = ({ filaSeleccionada, etapa }) => {
    return new Promise((resolve, reject) => {
      if (filaSeleccionada.length === 0) {
        resolve([]);
        return;
      }
      const idSolicitud = filaSeleccionada[0];
      cambiarEtapaSolicitudMueble({
        idSolicitud: idSolicitud,
        etapa: etapa,
      })
        .then(() => {
          showSnackbar("Etapa cambiada correctamente");
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const handleEnviar = ({ formData, filaSeleccionada, esCreacion }) => {
    return new Promise((resolve, reject) => {
      if (esCreacion) {
        handleCrearSolicitudVehiculo({ formData: formData })
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        handleModificarSolicitudVehiculo({
          formData: formData,
          idSolicitud: filaSeleccionada[0],
        })
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  };

  const handleCrearTramiteAltaInmueble = async ({ formData }) => {
    const entidadData = mapObject(formData, entAltaInmuebleMappingRules);
    console.log(entidadData);
    await crearTramiteAltaInmueble({ data: entidadData });
  };

  const handleActualizarTramiteAltaInmueble = async ({
    filaSeleccionada,
    formData,
  }) => {
    const idTramiteAlta = parseInt(filaSeleccionada[0]);
    const entidadData = mapObject(formData, entAltaInmuebleMappingRules);
    console.log("data", entidadData);
    console.log(formData);
    console.log(idTramiteAlta);
    await actualizarTramiteAltaInmueble({
      idTramite: idTramiteAlta,
      data: entidadData,
    });
  };

  const convertirCaracteristicasToString = ({
    formData,
    campoCaracteristica,
  }) => {
    const caracteristicas = formData[campoCaracteristica];
    if (Array.isArray(caracteristicas)) {
      formData[`${campoCaracteristica}Real`] = caracteristicas
        .map(
          (caracteristica) =>
            `'folio':'${caracteristica.id}'|'etiqueta':'${caracteristica.name}'|'valor':'${caracteristica.valor ?? ""}'|'estado':'${caracteristica.estado ?? ""}'`
        )
        .join("||");
    }
  };

  const convertirResponsablesToString = ({ formData, campoResponsables }) => {
    const responsables = formData[campoResponsables];
    if (Array.isArray(responsables)) {
      formData[`${campoResponsables}Real`] = responsables
        .map((responsable) => responsable.id.toString())
        .join(",");
    }
  };

  const convertirBienToString = ({ formData, campoBien }) => {
    const bienes = formData[campoBien];
    if (Array.isArray(bienes)) {
      formData[`${campoBien}Real`] = bienes
        .map((bien) => bien.idBien.toString())
        .join(",");
    }
  };

  const handleEnviarTramiteAltaInmueble = async ({
    filaSeleccionada,
    formData,
    esCreacion,
  }) => {
    convertirCaracteristicasToString({
      formData: formData,
      campoCaracteristica: CAMPOS_ALTA_VEHICULO.AUX_CARACTERISTICA,
    });
    convertirResponsablesToString({
      formData: formData,
      campoResponsables: CAMPOS_ALTA_VEHICULO.RESPONSABLES,
    });
    if (esCreacion) {
      await handleCrearTramiteAltaInmueble({ formData: formData });
      return;
    }
    await handleActualizarTramiteAltaInmueble({
      filaSeleccionada: filaSeleccionada,
      formData: formData,
    });
  };

  const handleGetTramiteAltaInmueble = async ({ filaSeleccionada }) => {
    if (filaSeleccionada.length === 0) {
      return null;
    }
    return await getTramiteAltaInmueble({
      idTramite: filaSeleccionada[0],
    });
  };

  const handleCrearTramiteModificacionInmueble = async ({ formData }) => {
    const data = mapObject(formData, entModificacionInmuebleMappingRules);
    await crearTramiteModificacionInmueble({ data });
  };

  const handleActualizarTramiteModificacionInmueble = async ({
    filaSeleccionada,
    formData,
  }) => {
    if (filaSeleccionada.length === 0) {
      return;
    }
    const idTramiteModificacion = filaSeleccionada[0];
    const data = mapObject(formData, entModificacionInmuebleMappingRules);
    await actualizarTramiteModificacionInmueble({
      idTramite: idTramiteModificacion,
      data: data,
    });
  };

  const handleGetTramiteModificacionInmueble = async ({ filaSeleccionada }) => {
    if (filaSeleccionada.length === 0) {
      return null;
    }
    return await getTramiteModificacionInmueble({
      idTramite: filaSeleccionada[0],
    });
  };

  const handleEnviarTramiteModificacionInmueble = async ({
    filaSeleccionada,
    formData,
    esCreacion,
  }) => {
    if (esCreacion) {
      await handleCrearTramiteModificacionInmueble({ formData: formData });
    } else {
      await handleActualizarTramiteModificacionInmueble({
        filaSeleccionada: filaSeleccionada,
        formData: formData,
      });
    }
  };

  const handleCrearTramiteBajaInmueble = async ({ formData }) => {
    const data = mapObject(formData, entBajaInmuebleMappingRules);
    await crearTramiteBajaInmueble({ data: data });
  };

  const handleActualizarTramiteBajaInmueble = async ({
    filaSeleccionada,
    formData,
  }) => {
    const data = mapObject(formData, entBajaInmuebleMappingRules);
    await actualizarTramiteBajaInmueble({
      idTramite: filaSeleccionada[0],
      data: data,
    });
  };

  const handleGetTramiteBajaInmueble = async ({ filaSeleccionada }) => {
    if (filaSeleccionada.length === 0) {
      return null;
    }
    return await getTramiteBajaInmueble({ idTramite: filaSeleccionada[0] });
  };

  const handleEnviarBajaInmueble = async ({
    filaSeleccionada,
    formData,
    esCreacion,
  }) => {
    if (esCreacion) {
      await handleCrearTramiteBajaInmueble({ formData: formData });
      return;
    }
    await handleActualizarTramiteBajaInmueble({
      filaSeleccionada: filaSeleccionada,
      formData: formData,
    });
  };

  useEffect(() => {
    handleIniciarCarga(MODO_CARGA.MODULO);
    Promise.all([
      getPeriodos(),
      getUnidadesAdministrativas(),
      getColumnasTablaSubModulo(1),
    ])
      .then(
        ([
          periodosData,
          unidadesAdministrativasData,
          columnasSolicitudesData,
        ]) => {
          const columnasSolicitudesExtraParams = {
            headerClassName: "celdas-encabezado-tabla",
          };
          const columnasSolicitudesMuebles = mapArray(
            columnasSolicitudesData,
            compColumnasTablaMappingRules,
            columnasSolicitudesExtraParams
          );

          const columnasSolicitudes = [];
          const columnasTramites = [];

          columnasSolicitudesMuebles.forEach((columna) => {
            if (columna.field.startsWith("i_")) {
              const modificada = columna.field.startsWith("i_")
                ? { ...columna, field: columna.field.slice(2) }
                : columna;
              columnasSolicitudes.push(modificada);
            } else {
              columnasTramites.push(columna);
            }
          });
          const unidadesAdministrativas = mapToTree(
            unidadesAdministrativasData
          );

          addColumnasTablaSuperior(columnasTramites);
          addColumnasTablaInferior(columnasSolicitudes);
          setOpcionesFiltros({
            periodos: periodosData,
            unidadesAdministrativas: unidadesAdministrativas,
          });
        }
      )
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        handleFinalizarCarga();
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const { periodos } = opcionesFiltros;
    if (!periodos) return;
    const periodoMasReciente = periodos[periodos.length - 1];
    setValue(PERIODO, periodoMasReciente);
    // eslint-disable-next-line
  }, [opcionesFiltros.periodos]);

  useEffect(() => {
    if (unidadAdministrativa.length === 0) return;
    iniciarCargaTablas();
    handleGetSolicitudesInmuebles()
      .then((solicitudes) => {
        addDatosTablaSuperior(solicitudes);
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        finalizarCargaTablas();
      });
    // eslint-disable-next-line
  }, [unidadAdministrativa]);

  return (
    <AdministradorInmuebleContext.Provider
      value={{
        formManager,
        opcionesFiltros,
        unidadAdministrativa,
        cargando,
        dialogoSolicitudes,
        dialogoTramites,
        multiTabla,
        handleUnidadAdministrativa,
        handleCrearSolicitudMueble: handleCrearSolicitudVehiculo,
        handleGetSolicitudesMuebles: handleGetSolicitudesInmuebles,
        handleGetSolicitudMueble: handleGetSolicitudInmueble,
        handleEnviar,
        handleValidarSolicitudPermiteModificacion,
        handleGetEtapaPorSolicitud,
        handleCambiarEtapaSolicitudMueble,
        handleGetTramitesMueblePorSolicitud,
        handleCargarTramites,
        handleEnviarTramiteAltaInmueble,
        handleGetTramiteAltaInmueble,
        handleEnviarTramiteModificacionInmueble,
        handleGetTramiteModificacionInmueble,
        handleEnviarBajaInmueble,
        handleGetTramiteBajaInmueble,
        handleGetEtapasPorTramite,
        handleCambiarEtapaTramiteMueble,
      }}
    >
      {children}
    </AdministradorInmuebleContext.Provider>
  );
};
