import { createContext, useContext, useEffect, useState } from "react";
import { useSistema } from "./SistemaContext";
import useDialogoControl from "./useDialogoControl";
import {
  DATE_FORMAT,
  MODO_CARGA,
  MODO_DIALOGO,
} from "../settings/appConstants";
import { IDS_SUBMODULOS } from "../settings/sistemaConfig";
import { set, useForm } from "react-hook-form";
import { getPeriodos, getUnidadesAdministrativas } from "../services/general";
import {
  getArticulos,
  getBienesMuebles,
  getSolicitudesInmuebles,
} from "../services/patrimonio";
import { mapToTree, mapToTreeArticulo } from "../settings/utils";
import {
  compArticuloHierarchyMappingRules,
  compUnidadAdministrativaHierarchyMappingRules,
} from "../settings/mappingRulesConfig";
import { CAMPOS_FILTRO_INVENTARIO } from "../settings/formConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { inventarioValidacion } from "../settings/validacionConfig";

const InventarioMuebleContext = createContext();

export const useInventarioMueble = () => {
  if (!InventarioMuebleContext) {
    throw new Error(
      "useInventarioMueble debe ser usado dentro de InventarioMuebleProvider"
    );
  }
  return useContext(InventarioMuebleContext);
};

const estadoInicialDialogo = {
  abierto: false,
  modo: MODO_DIALOGO.CREACION,
  id: 0,
};

const columns = [
  {
    field: "idBien",
    headerName: "ID Bien",
    type: "string",
    width: 120,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "folioBien",
    headerName: "Folio Bien",
    type: "string",
    width: 150,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "unidadAdministrativa",
    headerName: "Unidad Administrativa",
    type: "string",
    width: 200,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "tipoBien",
    headerName: "Tipo Bien",
    type: "string",
    width: 150,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "familia",
    headerName: "Familia",
    type: "string",
    width: 150,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "subfamilia",
    headerName: "Subfamilia",
    type: "string",
    width: 150,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "descripcion",
    headerName: "Descripción",
    type: "string",
    width: 250,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "activo",
    headerName: "Activo",
    type: "boolean",
    width: 100,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "fechaAlta",
    headerName: "Fecha Alta",
    type: "string",
    width: 150,
    headerClassName: "celdas-encabezado-tabla",
  },
];

export const InventarioMuebleProvider = ({ children }) => {
  const {
    handleError,
    handleEsCargaModulo,
    handleIniciarCarga,
    handleFinalizarCarga,
    handleChangeModulo,
  } = useSistema();
  const dialogoManager = useDialogoControl({
    estadoInicialDialogo: estadoInicialDialogo,
  });
  const [tabla, setTabla] = useState({
    columnas: columns,
    datos: [],
    campoId: "idBien",
    titulo: "Bienes Muebles",
  });
  const [unidadAdministrativa, setUnidadAdministrativa] = useState(null);
  const [tipoBien, setTipoBien] = useState(null);
  const [opcionesFiltros, setOpcionesFiltros] = useState({
    periodos: [],
    unidadesAdministrativas: [],
    tiposBienes: [],
    tiposBienesOriginal: [],
  });
  const formManager = useForm({
    resolver: yupResolver(inventarioValidacion),
    mode: "onChange",
  });
  const { setValue, getValues, trigger } = formManager;

  const handleSetUnidadAdministrativa = (idUnidadAdministrativa) => {
    setUnidadAdministrativa(idUnidadAdministrativa);
    setTipoBien(null);
  };

  const handleSetTipoBien = (idTipoBien) => {
    setTipoBien(idTipoBien);
    setUnidadAdministrativa(null);
  };

  const obtenerParametrosFiltro = () => {
    const dataTipoBien = opcionesFiltros.tiposBienesOriginal.find(
      (e) => e.nivelCompleto === tipoBien
    );
    return {
      periodo: getValues(CAMPOS_FILTRO_INVENTARIO.PERIODO)?.id,
      unidadAdministrativa: unidadAdministrativa,
      busquedaPorTipoBien: Boolean(tipoBien),
      estadoBien: Boolean(getValues(CAMPOS_FILTRO_INVENTARIO.ESTADO_BIEN)?.id),
      idBusqueda: dataTipoBien ? dataTipoBien.id : -1,
      nivelArticulo: dataTipoBien
        ? dataTipoBien.nivelCompleto.split(".").length
        : null,
      busquedaPorFecha: getValues(CAMPOS_FILTRO_INVENTARIO.BUSQUEDA_FECHA),
      fechaInicio: getValues(CAMPOS_FILTRO_INVENTARIO.FECHA_INICIO).format(
        DATE_FORMAT.ESTANDAR
      ),
      fechaFin: getValues(CAMPOS_FILTRO_INVENTARIO.FECHA_FIN).format(
        DATE_FORMAT.ESTANDAR
      ),
    };
  };

  const handleGetBienesMuebles = () => {
    handleIniciarCarga(MODO_CARGA.DATOS);
    trigger()
      .then((valido) => {
        if (!valido) {
          throw new Error(
            "Por favor, revisa los Filtros de Búsqueda. Algunos campos obligatorios están incompletos o contienen errores."
          );
        }

        if (
          (!unidadAdministrativa || unidadAdministrativa.length === 0) &&
          (!tipoBien || tipoBien.length === 0)
        ) {
          throw new Error(
            "Por favor, selecciona una Unidad Administrativa o una categoria para continuar con tu solicitud."
          );
        }
        const parametrosFiltro = obtenerParametrosFiltro();
        console.log(parametrosFiltro);
        return getBienesMuebles(parametrosFiltro);
      })
      .then((bienes) => {
        console.log(bienes);
        setTabla((prev) => ({
          ...prev,
          datos: bienes,
        }));
      })
      .catch((error) => {
        console.error(error);
        handleError(error);
      })
      .finally(() => {
        handleFinalizarCarga();
      });
  };

  useEffect(() => {
    handleIniciarCarga(MODO_CARGA.MODULO);
    handleChangeModulo({
      idSubModulo: IDS_SUBMODULOS.INVENTARIO_BIENES_MUEBLES,
    });
    Promise.all([
      getPeriodos(),
      getArticulos({ tipoBien: 1 }),
      getUnidadesAdministrativas({ desdeNivel: 1, hastaNivel: 3 }),
    ])
      .then(([periodosData, tiposBienesData, unidadesAdministrativasData]) => {
        const tiposBienes = mapToTreeArticulo(
          tiposBienesData,
          compArticuloHierarchyMappingRules
        );
        const unidadesAdministrativas = mapToTree(
          unidadesAdministrativasData,
          compUnidadAdministrativaHierarchyMappingRules
        );
        setOpcionesFiltros({
          tiposBienesOriginal: tiposBienesData,
          periodos: periodosData,
          tiposBienes: tiposBienes,
          unidadesAdministrativas: unidadesAdministrativas,
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
    setValue(CAMPOS_FILTRO_INVENTARIO.PERIODO, periodoMasReciente);
    // eslint-disable-next-line
  }, [opcionesFiltros.periodos]);

  useEffect(() => {
    if (unidadAdministrativa) {
      handleGetBienesMuebles();
    }
    // eslint-disable-next-line
  }, [unidadAdministrativa]);

  useEffect(() => {
    if (tipoBien) {
      handleGetBienesMuebles();
    }
    // eslint-disable-next-line
  }, [tipoBien]);

  return (
    <InventarioMuebleContext.Provider
      value={{
        tabla,
        unidadAdministrativa,
        tipoBien,
        dialogoManager,
        formManager,
        opcionesFiltros,
        handleSetUnidadAdministrativa,
        handleSetTipoBien,
        handleGetBienesMuebles,
      }}
    >
      {children}
    </InventarioMuebleContext.Provider>
  );
};
