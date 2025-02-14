import { useEffect } from "react";
import { useEntradaSalida } from "../../../context/EntradaSalidaContext";
import { IDS_SUBMODULOS } from "../../../settings/sistemaConfig";
import { useSistema } from "../../../context/SistemaContext";
import { Box } from "@mui/material";
import EntradaSalidaFiltro from "./EntradaSalidaFiltro";
import { MultiTablaProvider } from "../../../context/MultiTablaContext";
import EntradaSalidaMultiTabla from "./EntradaSalidaMultiTabla";
import EntradaSalidaSkeleton from "./EntradaSalidaSkeleton";
import EntradaSalidaMovimientoForm from "./forms/movimiento/EntradaSalidaMovimientoForm";

const EntradaSalida = () => {
  const { handleChangeModulo, handleEsCargaModulo } = useSistema();
  const {
    dialogoBienes,
    handleCargarDetallesMovimientos,
    almacen,
    multiTabla,
  } = useEntradaSalida();

  useEffect(() => {
    handleChangeModulo({
      idSubModulo: IDS_SUBMODULOS.ENTRADAS_SALIDAS,
    });
  }, []);

  if (handleEsCargaModulo()) {
    return <EntradaSalidaSkeleton />;
  }

  return (
    <Box className="contenedor-sub-modulo">
      <EntradaSalidaFiltro />
      <MultiTablaProvider
        handleCargarDatosTabla={handleCargarDetallesMovimientos}
        unidadAdministrativa={almacen}
        multiTabla={multiTabla}
      >
        <EntradaSalidaMultiTabla />
        {dialogoBienes.dialogo.abierto && <EntradaSalidaMovimientoForm />}
      </MultiTablaProvider>
    </Box>
  );
};

export default EntradaSalida;
