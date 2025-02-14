import { createContext, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { entradaSalidaValidacion } from "../settings/validacionConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CAMPOS_FILTRO_ENTRADA_SALIDA,
  CAMPOS_MOVIMIENTO,
} from "../settings/formConfig";
import { getColumnasTablaSubModulo } from "../services/sistema";
import { IDS_SUBMODULOS } from "../settings/sistemaConfig";
import { mapArray, mapObject, mapToTree } from "../settings/utils";
import {
  compColumnasTablaMappingRules,
  entAltaInmuebleMappingRules,
  entBajaInmuebleMappingRules,
  entModificacionInmuebleMappingRules,
  entMovimientoBienMappingRules,
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
import {
  actualizarMovimiento,
  cambiarEtapaMovimiento,
  crearMovimiento,
  getAlmacenes,
  getEtapasMovimiento,
  getMovimiento,
  getMovimientos,
} from "../services/almacen";

const EntradaSalidaContext = createContext();

export const useEntradaSalida = () => {
  const context = useContext(EntradaSalidaContext);
  if (!context) {
    throw new Error(
      "useAdministradorSolicitudes debe ser usado dentro de un AdministradorSolicitudesProvider"
    );
  }
  return context;
};

const columnasMovimiento = [
  {
    field: "idMovimiento",
    headerName: "ID Movimiento",
    width: 150,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "idPeriodo",
    headerName: "ID Periodo",
    width: 150,
    headerClassName: "celdas-encabezado-tabla",
  },

  {
    field: "tipoMovimiento",
    headerName: "Tipo Movimiento",
    width: 180,
    type: "string",
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "conceptoMovimiento",
    headerName: "Concepto Movimiento",
    width: 200,
    type: "string",
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "etapa",
    headerName: "Etapa",
    width: 180,
    type: "string",
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "almacen",
    headerName: "Almacén",
    width: 180,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "familia",
    headerName: "Familia",
    width: 180,
    type: "string",
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "proveedor",
    headerName: "Proveedor",
    width: 180,
    type: "string",
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "metodoAdquisicion",
    headerName: "Método Adquisición",
    width: 200,
    type: "string",
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "numeroFactura",
    headerName: "Número Factura",
    width: 180,
    type: "string",
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "importeTotal",
    headerName: "Importe Total",
    width: 180,
    type: "string",
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "observaciones",
    headerName: "Observaciones",
    type: "string",
    width: 250,
    headerClassName: "celdas-encabezado-tabla",
  },

  {
    field: "fechaResepcion",
    headerName: "Fecha Recepción",
    width: 180,
    type: "string",
    headerClassName: "celdas-encabezado-tabla",
  },
];

const columnasDetalles = [
  {
    field: "idArticulo",
    headerName: "ID Artículo",
    width: 150,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "articulo",
    headerName: "Artículo",
    width: 450,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "cantidad",
    headerName: "Cantidad",
    width: 150,
    type: "string",
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "precio",
    headerName: "Precio Unitario",
    width: 150,
    type: "string",
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "total",
    headerName: "Subtotal",
    width: 180,
    type: "string",
    headerClassName: "celdas-encabezado-tabla",
  },
];

const estadoInicialTablaSuperior = {
  columnas: columnasMovimiento,
  datos: [],
  campoId: "idMovimiento",
  titulo: "Movimientos",
};

const estadoInicialTablaInferior = {
  columnas: columnasDetalles,
  datos: [],
  campoId: "idArticulo",
  titulo: "Detalles Movimiento",
};

const estadoInicialDialogo = {
  abierto: false,
  modo: MODO_DIALOGO.CREACION,
  id: 0,
};

export const EntradaSalidaProvider = ({ children }) => {
  const idSubModulo = IDS_SUBMODULOS.ADMINISTRADOR_CEDULAS_BIENES_INMUEBLES;
  const { PERIODO, BUSQUEDA_FECHA, FECHA_INICIO, FECHA_FIN } =
    CAMPOS_FILTRO_ENTRADA_SALIDA;
  const multiTabla = useMultiTablaDatos({
    estadoInicialTablaSuperior: estadoInicialTablaSuperior,
    estadoInicialTablaInferior: estadoInicialTablaInferior,
  });
  const dialogoBienes = useDialogoControl({
    estadoInicialDialogo: estadoInicialDialogo,
  });
  const {
    cargando,
    tablaSuperior,
    addDatosTablaInferior,
    addDatosTablaSuperior,
    iniciarCargaTablas,
    finalizarCargaTablas,
    iniciarCargaTablaInferior,
    finalizarCargaTablaInferior,
  } = multiTabla;
  const { handleIniciarCarga, handleFinalizarCarga, handleError, sleep } =
    useSistema();
  const { showSnackbar } = useSnackbar();
  const formManager = useForm({
    resolver: yupResolver(entradaSalidaValidacion),
    mode: "onChange",
  });
  const { setValue, getValues, trigger } = formManager;
  const [inicio, setInicio] = useState(false);
  const [almacen, setAlmacen] = useState([]);
  const [opcionesFiltros, setOpcionesFiltros] = useState({
    periodos: [],
    almacenes: [],
  });

  const handleAlmacen = (idAlmacen) => {
    if (!inicio) {
      setInicio(true);
    }
    setAlmacen(idAlmacen);
  };

  const obtenerParametrosFiltro = () => ({
    periodo: getValues(PERIODO).id,
    almacen: almacen,
    busquedaPorFecha: getValues(BUSQUEDA_FECHA),
    fechaInicio: getValues(FECHA_INICIO).format(DATE_FORMAT.ESTANDAR),
    fechaFin: getValues(FECHA_FIN).format(DATE_FORMAT.ESTANDAR),
  });

  const handleGetMovimientos = () => {
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

          if (almacen.length === 0) {
            throw new Error(
              "Por favor, selecciona una unidad administrativa para continuar con tu solicitud."
            );
          }

          const parametrosFiltro = obtenerParametrosFiltro();
          return getMovimientos(parametrosFiltro);
        })
        .then((movimientos) => {
          resolve(movimientos);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const handleGetMovimiento = ({ filaSeleccionada }) => {
    return new Promise((resolve, reject) => {
      if (dialogoBienes.esDialogoCreacion()) {
        resolve(null);
        return;
      }
      getMovimiento({ id: filaSeleccionada[0] })
        .then((movimiento) => {
          resolve(movimiento);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const handleGetDetallesMovimiento = ({ filaSeleccionada }) => {
    return new Promise((resolve, reject) => {
      if (filaSeleccionada.length === 0) {
        sleep(500).then(() => resolve([]));
        return;
      }

      sleep(300).then(() => {
        try {
          const idMovimiento = filaSeleccionada[0];
          const filaSeleccionadaData = tablaSuperior.datos.find(
            (e) => e.idMovimiento === idMovimiento
          );
          const listaArticulos = filaSeleccionadaData.articulos;
          const articulos = listaArticulos.split("||").map((article) => {
            const attributes = article.split("|").reduce((obj, pair) => {
              const [key, value] = pair
                .split(":")
                .map((item) => item.trim().replace(/^'|'$/g, ""));
              obj[key] = isNaN(value) ? value : Number(value);
              return obj;
            }, {});
            return attributes;
          });
          resolve(articulos);
        } catch (error) {
          reject(error);
        }
      });
    });
  };

  const handleCargarDetallesMovimientos = ({ filaSeleccionada }) => {
    iniciarCargaTablaInferior();
    handleGetDetallesMovimiento({ filaSeleccionada: filaSeleccionada })
      .then((detallesMovimiento) => {
        addDatosTablaInferior(detallesMovimiento);
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        finalizarCargaTablaInferior();
      });
  };

  const handleCrearMovimiento = ({ formData }) => {
    return new Promise((resolve, reject) => {
      const data = mapObject(formData, entMovimientoBienMappingRules);
      crearMovimiento({ data: data })
        .then(() => {
          showSnackbar("Movimiento creado correctamente");
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const handleModificarMovimiento = ({ formData, idMovimiento }) => {
    return new Promise((resolve, reject) => {
      const data = mapObject(formData, entMovimientoBienMappingRules);
      actualizarMovimiento({
        id: idMovimiento,
        data: data,
      })
        .then(() => {
          showSnackbar("Movimiento modificado correctamente");
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const handleGetEtapaPorMovimiento = ({ filaSeleccionada }) => {
    return new Promise((resolve, reject) => {
      if (filaSeleccionada.length === 0) {
        resolve([]);
        return;
      }
      const idMovimiento = filaSeleccionada[0];
      getEtapasMovimiento({ idMovimiento: idMovimiento })
        .then((etapas) => {
          resolve(etapas);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const handleCambiarEtapaMovimeinto = ({ filaSeleccionada, etapa }) => {
    return new Promise((resolve, reject) => {
      if (filaSeleccionada.length === 0) {
        resolve([]);
        return;
      }
      const idMovimiento = filaSeleccionada[0];
      cambiarEtapaMovimiento({
        idMovimiento: idMovimiento,
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
      const articulos = formData[CAMPOS_MOVIMIENTO.AUX_ARTICULOS];
      if (Array.isArray(articulos)) {
        formData[`${CAMPOS_MOVIMIENTO.ARTICULOS}Real`] = articulos
          .map(
            (articulo) =>
              `'idArticulo':'${articulo.id}'|'articulo':'${articulo.articulo}'|'cantidad':'${articulo.cantidad ?? ""}'|'precio':'${articulo.precio ?? ""}'|'total':'${articulo.total ?? ""}'`
          )
          .join("||");
      }
      if (esCreacion) {
        handleCrearMovimiento({ formData: formData })
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        handleModificarMovimiento({
          formData: formData,
          idMovimiento: filaSeleccionada[0],
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

  useEffect(() => {
    handleIniciarCarga(MODO_CARGA.MODULO);
    Promise.all([getPeriodos(), getAlmacenes({ isLabel: true })])
      .then(([periodosData, almacenes]) => {
        setOpcionesFiltros({
          periodos: periodosData,
          almacenes: almacenes,
        });
      })
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
    if (almacen.length === 0) return;
    iniciarCargaTablas();
    handleGetMovimientos()
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
  }, [almacen]);

  return (
    <EntradaSalidaContext.Provider
      value={{
        formManager,
        opcionesFiltros,
        almacen,
        cargando,
        dialogoBienes,
        multiTabla,
        handleAlmacen,
        handleCambiarEtapaMovimeinto,
        handleGetMovimiento,
        handleGetMovimientos,
        handleEnviar,
        handleCargarDetallesMovimientos,
        handleGetEtapaPorMovimiento,
      }}
    >
      {children}
    </EntradaSalidaContext.Provider>
  );
};
