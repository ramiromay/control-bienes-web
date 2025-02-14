import { createContext, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { administradorSolicitudesValidacion } from "../settings/validacionConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CAMPOS_ALTA_MUEBLE,
  CAMPOS_BAJA_MUEBLE,
  CAMPOS_DESINCORPORACION_MUEBLE,
  CAMPOS_DESTINO_FINAL_MUEBLE,
  CAMPOS_FILTRO_ADMINISTRADOR_SOLICITUDES,
  CAMPOS_MODIFICACION_MUEBLE,
  CAMPOS_MOVIMIENTO_MUEBLE,
} from "../settings/formConfig";
import {
  actualizarTramiteAltaMueble,
  actualizarTramiteBajaMueble,
  actualizarTramiteDesincorporacionMueble,
  actualizarTramiteDestinoFinalMueble,
  actualizarTramiteModificacionMueble,
  actualizarTramiteMovimientoMueble,
  cambiarEtapaSolicitudMueble,
  cambiarEtapaTramiteMueble,
  crearSolicitud,
  crearTramiteAltaMueble,
  crearTramiteBajaMueble,
  crearTramiteDesincorporacionMueble,
  crearTramiteDestinoFinalMueble,
  crearTramiteModificacionMueble,
  crearTramiteMovimientoMueble,
  getEtapasPorSolicitud,
  getEtapasPorTramite,
  getSolicitudesMuebles,
  getSolicitudMueble,
  getSolicitudPemiteModificaciones,
  getTramiteAltaMueble,
  getTramiteBajaMueble,
  getTramiteDesincorporacionMueble,
  getTramiteDestinoFinalMueble,
  getTramiteModificacionMueble,
  getTramiteMovimientoMueble,
  getTramitesPorSolicitud,
  modificarSolicitudMueble,
} from "../services/patrimonio";
import { getColumnasTablaSubModulo } from "../services/sistema";
import { IDS_SUBMODULOS, TIPOS_TRAMITES } from "../settings/sistemaConfig";
import { mapArray, mapObject, mapToTree } from "../settings/utils";
import {
  compColumnasTablaMappingRules,
  entAltaMuebleMappingRules,
  entBajaMuebleMappingRules,
  entDesincorporacionMuebleMappingRules,
  entDestinoFinalMuebleMappingRules,
  entModificacionMuebleMappingRules,
  entMovimientoMuebleMappingRules,
  entSolicitudMueble,
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

const AdministradorMuebleContext = createContext();

export const useAdministradorMueble = () => {
  const context = useContext(AdministradorMuebleContext);
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

export const AdministradorMuebleProvider = ({ children }) => {
  const idSubModulo = IDS_SUBMODULOS.ADMINISTRADOR_CEDULAS_BIENES_MUEBLES;
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

  const handleGetSolicitudesMuebles = () => {
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
          return getSolicitudesMuebles(parametrosFiltro);
        })
        .then((solicitudesData) => {
          resolve(solicitudesData);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const handleGetSolicitudMueble = ({ filaSeleccionada }) => {
    return new Promise((resolve, reject) => {
      if (dialogoSolicitudes.esDialogoCreacion()) {
        resolve(null);
        return;
      }
      getSolicitudMueble({ idSolicitud: filaSeleccionada[0] })
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

  const handleCrearSolicitudMueble = ({ formData }) => {
    return new Promise((resolve, reject) => {
      const data = mapObject(formData, entSolicitudMueble);
      crearSolicitud({ data: data })
        .then(() => {
          showSnackbar("Solicitud creada correctamente");
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const handleModificarSolicitudMueble = ({ formData, idSolicitud }) => {
    return new Promise((resolve, reject) => {
      const data = mapObject(formData, entSolicitudMueble);
      modificarSolicitudMueble({
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
    console.log("filaSeleccionada", filaSeleccionada);
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
    await cambiarEtapaTramiteMueble({
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
        handleCrearSolicitudMueble({ formData: formData })
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        handleModificarSolicitudMueble({
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

  const handleCrearTramiteAltaMueble = async ({ formData }) => {
    const entidadData = mapObject(formData, entAltaMuebleMappingRules);
    await crearTramiteAltaMueble({ data: entidadData });
  };

  const handleActualizarTramiteAltaMueble = async ({
    filaSeleccionada,
    formData,
  }) => {
    const idTramiteAlta = parseInt(filaSeleccionada[0]);
    const entidadData = mapObject(formData, entAltaMuebleMappingRules);
    await actualizarTramiteAltaMueble({
      idTramiteAlta: idTramiteAlta,
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

  const handleEnviarTramiteAltaMueble = async ({
    filaSeleccionada,
    formData,
    esCreacion,
  }) => {
    convertirCaracteristicasToString({
      formData: formData,
      campoCaracteristica: CAMPOS_ALTA_MUEBLE.AUX_CARACTERISTICA,
    });
    convertirResponsablesToString({
      formData: formData,
      campoResponsables: CAMPOS_ALTA_MUEBLE.RESPONSABLES,
    });
    if (esCreacion) {
      await handleCrearTramiteAltaMueble({ formData: formData });
    } else {
      await handleActualizarTramiteAltaMueble({
        filaSeleccionada: filaSeleccionada,
        formData: formData,
      });
    }
  };

  const handleGetTramiteAltaMueble = async ({ filaSeleccionada }) => {
    if (filaSeleccionada.length === 0) {
      return null;
    }
    return await getTramiteAltaMueble({ idTramiteAlta: filaSeleccionada[0] });
  };

  const handleCrearTramiteModificacionMueble = async ({ formData }) => {
    const data = mapObject(formData, entModificacionMuebleMappingRules);
    await crearTramiteModificacionMueble({ data });
  };

  const handleActualizarTramiteModificacionMueble = async ({
    filaSeleccionada,
    formData,
  }) => {
    if (filaSeleccionada.length === 0) {
      return;
    }
    const idTramiteModificacion = filaSeleccionada[0];
    const data = mapObject(formData, entModificacionMuebleMappingRules);
    await actualizarTramiteModificacionMueble({
      idTramiteModificacion: idTramiteModificacion,
      data: data,
    });
  };

  const handleGetTramiteModificacionMueble = async ({ filaSeleccionada }) => {
    if (filaSeleccionada.length === 0) {
      return null;
    }
    return await getTramiteModificacionMueble({
      idTramiteModificacion: filaSeleccionada[0],
    });
  };

  const handleEnviarTramiteModificacionMueble = async ({
    filaSeleccionada,
    formData,
    esCreacion,
  }) => {
    convertirCaracteristicasToString({
      formData: formData,
      campoCaracteristica: CAMPOS_MODIFICACION_MUEBLE.AUX_CARACTERISTICA,
    });

    if (esCreacion) {
      await handleCrearTramiteModificacionMueble({ formData: formData });
    } else {
      await handleActualizarTramiteModificacionMueble({
        filaSeleccionada: filaSeleccionada,
        formData: formData,
      });
    }
  };

  const handleCrearTramiteBajaMueble = async ({ formData }) => {
    const data = mapObject(formData, entBajaMuebleMappingRules);
    await crearTramiteBajaMueble({ data: data });
  };

  const handleActualizarTramiteBajaMueble = async ({
    filaSeleccionada,
    formData,
  }) => {
    const data = mapObject(formData, entBajaMuebleMappingRules);
    await actualizarTramiteBajaMueble({
      idTramiteBaja: filaSeleccionada[0],
      data: data,
    });
  };

  const handleGetTramiteBajaMueble = async ({ filaSeleccionada }) => {
    if (filaSeleccionada.length === 0) {
      return null;
    }
    return await getTramiteBajaMueble({ idTramiteBaja: filaSeleccionada[0] });
  };

  const handleEnviarBajaMueble = async ({
    filaSeleccionada,
    formData,
    esCreacion,
  }) => {
    formData[`${CAMPOS_BAJA_MUEBLE.FOLIO_BIEN}Real`] = formData.folioBien
      .map((item) => item.folioBien)
      .join(",");
    formData[`${CAMPOS_BAJA_MUEBLE.LISTA_DOCUMENTO}Real`] =
      formData.listaDocumentos
        ? formData.listaDocumentos.map((item) => item.folioBien).join(",")
        : "";

    if (esCreacion) {
      await handleCrearTramiteBajaMueble({ formData: formData });
      return;
    }
    await handleActualizarTramiteBajaMueble({
      filaSeleccionada: filaSeleccionada,
      formData: formData,
    });
  };

  const handleCrearTramiteMovimientoMueble = async ({ formData }) => {
    console.log(formData);
    const data = mapObject(formData, entMovimientoMuebleMappingRules);
    console.log(data);
    await crearTramiteMovimientoMueble({ data: data });
  };

  const handleActualizarTramiteMovimientoMueble = async ({
    filaSeleccionada,
    formData,
  }) => {
    const data = mapObject(formData, entMovimientoMuebleMappingRules);
    await actualizarTramiteMovimientoMueble({
      idTramiteMovimiento: filaSeleccionada[0],
      data: data,
    });
  };

  const handleGetTramiteMovimientoMueble = async ({ filaSeleccionada }) => {
    if (filaSeleccionada.length === 0) {
      return null;
    }
    return await getTramiteMovimientoMueble({
      idTramiteMovimiento: filaSeleccionada[0],
    });
  };

  const handleEnviarTramiteMomientoMueble = async ({
    filaSeleccionada,
    formData,
    esCreacion,
  }) => {
    formData[`${CAMPOS_MOVIMIENTO_MUEBLE.FOLIO_BIEN}Real`] = formData.folioBien
      .map((item) => item.folioBien)
      .join(",");
    formData[`${CAMPOS_MOVIMIENTO_MUEBLE.NUEVO_RESGUARDANTE}Real`] =
      formData.resguardantes
        ? formData.resguardantes.map((item) => item.id).join(",")
        : "";
    console.log(formData);
    if (esCreacion) {
      await handleCrearTramiteMovimientoMueble({ formData: formData });
    } else {
      await handleActualizarTramiteMovimientoMueble({
        filaSeleccionada: filaSeleccionada,
        formData: formData,
      });
    }
  };

  const handleCrearTramiteDesincorporacionMueble = async ({ formData }) => {
    const data = mapObject(formData, entDesincorporacionMuebleMappingRules);
    await crearTramiteDesincorporacionMueble({ data: data });
  };

  const handleActualizarTramiteDesincorporacionMueble = async ({
    filaSeleccionada,
    formData,
  }) => {
    const data = mapObject(formData, entDesincorporacionMuebleMappingRules);
    await actualizarTramiteDesincorporacionMueble({
      idTramiteDesincorporacion: filaSeleccionada[0],
      data: data,
    });
  };

  const handleGetTramiteDesincorporacionMueble = async ({
    filaSeleccionada,
  }) => {
    if (filaSeleccionada.length === 0) {
      return null;
    }
    return await getTramiteDesincorporacionMueble({
      idTramiteDesincorporacion: filaSeleccionada[0],
    });
  };

  const handleEnviarTramiteDesincorporacionMueble = async ({
    filaSeleccionada,
    formData,
    esCreacion,
  }) => {
    formData[`${CAMPOS_DESINCORPORACION_MUEBLE.FOLIO_BIEN}Real`] =
      formData.folioBien.map((item) => item.folioBien).join(",");
    if (esCreacion) {
      await handleCrearTramiteDesincorporacionMueble({ formData: formData });
      return;
    }
    await handleActualizarTramiteDesincorporacionMueble({
      filaSeleccionada: filaSeleccionada,
      formData: formData,
    });
  };

  const handleCrearTramiteDestinoFinalMueble = async ({ formData }) => {
    const data = mapObject(formData, entDestinoFinalMuebleMappingRules);
    await crearTramiteDestinoFinalMueble({ data: data });
  };

  const handleActualizarTramiteDestinoFinalMueble = async ({
    filaSeleccionada,
    formData,
  }) => {
    const data = mapObject(formData, entDestinoFinalMuebleMappingRules);
    await actualizarTramiteDestinoFinalMueble({
      idTramiteDestinoFinal: filaSeleccionada[0],
      data: data,
    });
  };

  const handleGetTramiteDestinoFinalMueble = async ({ filaSeleccionada }) => {
    if (filaSeleccionada.length === 0) return null;
    return await getTramiteDestinoFinalMueble({
      idTramiteDestinoFinal: filaSeleccionada[0],
    });
  };

  const handleEnviarDestinoFinalMueble = async ({
    filaSeleccionada,
    formData,
    esCreacion,
  }) => {
    formData[`${CAMPOS_DESTINO_FINAL_MUEBLE.FOLIO_BIEN}Real`] =
      formData.folioBien.map((item) => item.folioBien).join(",");
    if (esCreacion) {
      await handleCrearTramiteDestinoFinalMueble({ formData: formData });
      return;
    }

    await handleActualizarTramiteDestinoFinalMueble({
      filaSeleccionada: filaSeleccionada,
      formData: formData,
    });
  };

  useEffect(() => {
    handleIniciarCarga(MODO_CARGA.MODULO);
    Promise.all([
      getPeriodos(),
      getUnidadesAdministrativas(),
      getColumnasTablaSubModulo(idSubModulo),
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
    handleGetSolicitudesMuebles()
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
    <AdministradorMuebleContext.Provider
      value={{
        formManager,
        opcionesFiltros,
        unidadAdministrativa,
        cargando,
        dialogoSolicitudes,
        dialogoTramites,
        multiTabla,
        handleUnidadAdministrativa,
        handleCrearSolicitudMueble,
        handleGetSolicitudesMuebles,
        handleGetSolicitudMueble,
        handleEnviar,
        handleValidarSolicitudPermiteModificacion,
        handleGetEtapaPorSolicitud,
        handleCambiarEtapaSolicitudMueble,
        handleGetTramitesMueblePorSolicitud,
        handleCargarTramites,
        handleEnviarTramiteAltaMueble,
        handleGetTramiteAltaMueble,
        handleEnviarTramiteModificacionMueble,
        handleGetTramiteModificacionMueble,
        handleEnviarBajaMueble,
        handleGetTramiteBajaMueble,
        handleEnviarTramiteMomientoMueble,
        handleGetTramiteMovimientoMueble,
        handleEnviarTramiteDesincorporacionMueble,
        handleGetTramiteDesincorporacionMueble,
        handleEnviarDestinoFinalMueble,
        handleGetTramiteDestinoFinalMueble,
        handleGetEtapasPorTramite,
        handleCambiarEtapaTramiteMueble,
      }}
    >
      {children}
    </AdministradorMuebleContext.Provider>
  );
};
