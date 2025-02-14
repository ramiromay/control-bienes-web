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
  aplicarDepreciacion,
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
import {
  CAMPOS_DEPRECIACION,
  CAMPOS_FILTRO_INVENTARIO,
} from "../settings/formConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  depreciacionValidacion,
  inventarioValidacion,
} from "../settings/validacionConfig";
import { useSnackbar } from "./SnackbarContext";

const DepreciacionContext = createContext();

export const useDepreciacion = () => {
  if (!DepreciacionContext) {
    throw new Error(
      "useInventarioMueble debe ser usado dentro de InventarioMuebleProvider"
    );
  }
  return useContext(DepreciacionContext);
};

const estadoInicialDialogo = {
  abierto: false,
  modo: MODO_DIALOGO.CREACION,
  id: 0,
};

const columns = [
  {
    field: "tipoBien",
    headerName: "TipoBien",
    type: "string",
    width: 150,
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
    field: "centroCosto",
    headerName: "Centro de Costo",
    type: "string",
    width: 250,
    headerClassName: "celdas-encabezado-tabla",
  },
  {
    field: "descripcion",
    headerName: "Motivo de NO depreciación",
    type: "string",
    width: 350,
    headerClassName: "celdas-encabezado-tabla",
  },
];

const opcionesMeses = [
  { id: 1, name: "Enero" },
  { id: 2, name: "Febrero" },
  { id: 3, name: "Marzo" },
  { id: 4, name: "Abril" },
  { id: 5, name: "Mayo" },
  { id: 6, name: "Junio" },
  { id: 7, name: "Julio" },
  { id: 8, name: "Agosto" },
  { id: 9, name: "Septiembre" },
  { id: 10, name: "Octubre" },
  { id: 11, name: "Noviembre" },
  { id: 12, name: "Diciembre" },
];

const opcionesTipoDepreciacion = [
  { id: 1, name: "Global" },
  { id: 2, name: "Individual" },
];

const opcionesTiposBienes = [
  {
    id: 1,
    name: "Bienes Muebles y Vehículos",
    nivelCompleto: "1",
    children: [],
  },
  {
    id: 2,
    name: "Bienes Inmuebles",
    nivelCompleto: "2",
    children: [],
  },
];

export const DepreciacionProvider = ({ children }) => {
  const {
    handleError,
    handleIniciarCarga,
    handleFinalizarCarga,
    handleChangeModulo,
  } = useSistema();
  const dialogoManager = useDialogoControl({
    estadoInicialDialogo: estadoInicialDialogo,
  });
  const { handleAbrirDialogo, handleCerrarDialogo } = dialogoManager;
  const [tabla, setTabla] = useState({
    columnas: columns,
    datos: [],
    campoId: "idDepreciacion",
    titulo: "Depreciación",
  });
  const [unidadAdministrativa, setUnidadAdministrativa] = useState(null);
  const [opcionesFiltros, setOpcionesFiltros] = useState({
    periodos: [],
    unidadesAdministrativas: [],
    meses: opcionesMeses,
    tiposBienes: opcionesTiposBienes,
    tiposDepreciacion: opcionesTipoDepreciacion,
  });
  const formManager = useForm({
    resolver: yupResolver(depreciacionValidacion),
    mode: "onChange",
  });
  const { showSnackbar } = useSnackbar();
  const { setValue, getValues, trigger, handleSubmit } = formManager;

  const handleSetUnidadAdministrativa = (idUnidadAdministrativa) => {
    setUnidadAdministrativa(idUnidadAdministrativa);
  };

  const obtenerParametrosFiltro = () => {
    return {
      periodo: getValues(CAMPOS_DEPRECIACION.PERIODO)?.id,
      unidadAdministrativa: unidadAdministrativa,
      mes: getValues(CAMPOS_DEPRECIACION.MES)?.id,
      tipoBien: getValues(CAMPOS_DEPRECIACION.TIPO_BIEN)?.id,
      tipoDepreciacion: getValues(CAMPOS_DEPRECIACION.TIPO_DEPRECIACION)?.id,
      folioBien: getValues(CAMPOS_DEPRECIACION.FOLIO_BMS),
    };
  };

  const handleValidarDepreciacion = () => {
    trigger()
      .then((valido) => {
        if (!valido) {
          throw new Error(
            "Por favor, revisa los Filtros de Búsqueda. Algunos campos obligatorios están incompletos o contienen errores."
          );
        }

        const parametrosFiltro = obtenerParametrosFiltro();
        console.log(parametrosFiltro);
        if (parametrosFiltro.tipoDepreciacion === 1 && !unidadAdministrativa) {
          throw new Error(
            "Por favor, selecciona una unidad administrativa para continuar con tu solicitud."
          );
        }
        if (unidadAdministrativa === "0") {
          throw new Error(
            "No se permite depreciar todos los bienes en una sola ejecución, es necesario que seleccione solo una secretaria."
          );
        }
        handleAbrirDialogo(MODO_DIALOGO.DEPRECIACION);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const handleAplicarDepreciacion = handleSubmit(async () => {
    handleIniciarCarga(MODO_CARGA.DIALOGO);
    trigger()
      .then((valido) => {
        if (!valido) {
          throw new Error(
            "Por favor, revisa los Filtros de Búsqueda. Algunos campos obligatorios están incompletos o contienen errores."
          );
        }

        const parametrosFiltro = obtenerParametrosFiltro();
        if (parametrosFiltro.tiposDepreciacion == 1 && !unidadAdministrativa) {
          throw new Error(
            "Por favor, selecciona una unidad administrativa para continuar con tu solicitud."
          );
        }
        if (unidadAdministrativa == "0") {
          throw new Error(
            "No se permite depreciar todos los bienes en una sola ejecución, es necesario que seleccione solo una secretaria."
          );
        }
        return aplicarDepreciacion(parametrosFiltro);
      })
      .then((resumenDepreciacion) => {
        const formateador = new Intl.NumberFormat("es-MX", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        });
        setValue(
          CAMPOS_DEPRECIACION.MONTO_TOTAL_DEPRECIADO,
          formateador.format(resumenDepreciacion.montoDepreciado ?? 0)
        );
        setValue(
          CAMPOS_DEPRECIACION.TOTAL_BIENES,
          formateador.format(resumenDepreciacion.totalBienes ?? 0)
        );
        setValue(
          CAMPOS_DEPRECIACION.NUMERO_BIENES_DEPRECIADOS,
          formateador.format(resumenDepreciacion.numeroBienesDepreciados ?? 0)
        );
        setValue(
          CAMPOS_DEPRECIACION.NUMERO_BIENES_NO_DEPRECIADOS,
          formateador.format(resumenDepreciacion.numeroBienesNoDepreciados ?? 0)
        );
        setTabla((prev) => ({
          ...prev,
          datos: resumenDepreciacion.Errores ? resumenDepreciacion.Errores : [],
        }));
        showSnackbar("Se completo la depreciación de bienes");
      })
      .catch((error) => {
        showSnackbar(
          "Ocurrio un error inesperado al depreciar los bienes",
          "error"
        );
        handleError(error);
      })
      .finally(() => {
        handleCerrarDialogo();
        handleFinalizarCarga();
      });
  });

  useEffect(() => {
    handleIniciarCarga(MODO_CARGA.MODULO);
    handleChangeModulo({
      idSubModulo: IDS_SUBMODULOS.DEPRECIACION,
    });
    Promise.all([
      getPeriodos(),
      getUnidadesAdministrativas({ desdeNivel: 1, hastaNivel: 1 }),
    ])
      .then(([periodosData, unidadesAdministrativasData]) => {
        const unidadesAdministrativas = mapToTree(
          unidadesAdministrativasData,
          compUnidadAdministrativaHierarchyMappingRules
        );
        setOpcionesFiltros((prevState) => ({
          ...prevState,
          periodos: periodosData,
          unidadesAdministrativas: unidadesAdministrativas,
        }));
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
    setValue(CAMPOS_DEPRECIACION.PERIODO, periodoMasReciente);
    setValue(CAMPOS_DEPRECIACION.TIPO_DEPRECIACION, { id: 1, name: "Global" });
    // eslint-disable-next-line
  }, [opcionesFiltros.periodos]);

  return (
    <DepreciacionContext.Provider
      value={{
        tabla,
        unidadAdministrativa,
        dialogoManager,
        formManager,
        opcionesFiltros,
        handleSetUnidadAdministrativa,
        handleAplicarDepreciacion,
        handleValidarDepreciacion,
      }}
    >
      {children}
    </DepreciacionContext.Provider>
  );
};
