import { createContext, useContext, useEffect, useState } from "react";
import { useSistema } from "./SistemaContext";
import useDialogoControl from "./useDialogoControl";
import {
  DATE_FORMAT,
  MODO_CARGA,
  MODO_DIALOGO,
} from "../settings/appConstants";
import { IDS_SUBMODULOS } from "../settings/sistemaConfig";
import { useForm } from "react-hook-form";
import { getPeriodos, getUnidadesAdministrativas } from "../services/general";
import {
  getArticulos,
  getBienesInmuebles,
  getBienesMuebles,
  getBienesVehiculos,
} from "../services/patrimonio";
import { mapToTree, mapToTreeArticulo } from "../settings/utils";
import {
  compArticuloHierarchyMappingRules,
  compUnidadAdministrativaHierarchyMappingRules,
} from "../settings/mappingRulesConfig";
import { CAMPOS_FILTRO_INVENTARIO } from "../settings/formConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { inventarioValidacion } from "../settings/validacionConfig";
import {
  getAlmacenes,
  getBienesAlmacen,
  getBienesAlmacenPorFiltro,
} from "../services/almacen";

const InventarioAlmacenContext = createContext();

export const useInventarioAlmacen = () => {
  if (!InventarioAlmacenContext) {
    throw new Error(
      "useInventarioMueble debe ser usado dentro de InventarioMuebleProvider"
    );
  }
  return useContext(InventarioAlmacenContext);
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
    width: 100,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "almacen",
    headerName: "Almacén",
    type: "string",
    width: 150,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "bien",
    headerName: "Bien",
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
    field: "descripcion",
    headerName: "Descripción",
    type: "string",
    width: 200,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "existencia",
    headerName: "Existencia",
    type: "string",
    width: 120,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "unidadMedida",
    headerName: "Unidad de Medida",
    type: "string",
    width: 150,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "precioUnitario",
    headerName: "Precio Unitario",
    type: "string",
    width: 150,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "codigoArmonizado",
    headerName: "Código Armonizado",
    type: "string",
    width: 150,
    headerClassName: "celdas-encabezado-tabla",
  },
];

export const InventarioAlmacenProvider = ({ children }) => {
  const {
    handleError,
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
    titulo: "Bienes",
  });
  const [almacen, setAlmacen] = useState(null);
  const [opcionesFiltros, setOpcionesFiltros] = useState({
    periodos: [],
    almacen: [],
  });
  const formManager = useForm({
    resolver: yupResolver(inventarioValidacion),
    mode: "onChange",
  });
  const { setValue, getValues, trigger } = formManager;

  const handleSetAlmacenes = (idAlmacen) => {
    setAlmacen(idAlmacen);
  };

  const obtenerParametrosFiltro = () => {
    return {
      periodo: getValues(CAMPOS_FILTRO_INVENTARIO.PERIODO)?.id,
      almacen: almacen,
      busquedaPorFecha: getValues(CAMPOS_FILTRO_INVENTARIO.BUSQUEDA_FECHA),
      fechaInicio: getValues(CAMPOS_FILTRO_INVENTARIO.FECHA_INICIO).format(
        DATE_FORMAT.ESTANDAR
      ),
      fechaFin: getValues(CAMPOS_FILTRO_INVENTARIO.FECHA_FIN).format(
        DATE_FORMAT.ESTANDAR
      ),
    };
  };

  const handleGetBienesAlmacen = () => {
    handleIniciarCarga(MODO_CARGA.DATOS);
    trigger()
      .then((valido) => {
        if (!valido) {
          throw new Error(
            "Por favor, revisa los Filtros de Búsqueda. Algunos campos obligatorios están incompletos o contienen errores."
          );
        }
        if (!almacen || almacen.length === 0) {
          throw new Error(
            "Por favor, selecciona un almacen para continuar con tu solicitud."
          );
        }

        if (almacen[0] === "0") {
          throw new Error(
            "No se permite filtrar por todos los almacenes a la vez, por favor, selecciona un almacen para continuar con tu solicitud."
          );
        }
        const parametrosFiltro = obtenerParametrosFiltro();
        return getBienesAlmacenPorFiltro(parametrosFiltro);
      })
      .then((bienes) => {
        setTabla((prev) => ({
          ...prev,
          datos: bienes,
        }));
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        handleFinalizarCarga();
      });
  };

  useEffect(() => {
    handleIniciarCarga(MODO_CARGA.MODULO);
    handleChangeModulo({
      idSubModulo: IDS_SUBMODULOS.INVENTARIO_ALMACENES,
    });
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
    setValue(CAMPOS_FILTRO_INVENTARIO.PERIODO, periodoMasReciente);
    // eslint-disable-next-line
  }, [opcionesFiltros.periodos]);

  useEffect(() => {
    if (almacen) {
      handleGetBienesAlmacen();
    }
    // eslint-disable-next-line
  }, [almacen]);

  return (
    <InventarioAlmacenContext.Provider
      value={{
        tabla,
        unidadAdministrativa: almacen,
        dialogoManager,
        formManager,
        opcionesFiltros,
        handleSetAlmacenes,
        handleGetBienesAlmacen,
      }}
    >
      {children}
    </InventarioAlmacenContext.Provider>
  );
};
