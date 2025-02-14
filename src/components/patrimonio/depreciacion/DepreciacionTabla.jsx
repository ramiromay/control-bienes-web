import { Box, InputAdornment, Stack, Typography } from "@mui/material";
import { useDepreciacion } from "../../../context/DepreciacionContext";
import { useSistema } from "../../../context/SistemaContext";
import useTabla from "../../../context/Tabla/useTabla";
import TablaSkeleton from "../../utils/TablaSkeleton";
import { EncabezadoSeccion, Tabla } from "../../utils";
import DepreciacionActions from "./DepreciacionActions";
import FormCampoEntrada from "../../utils/FormCampoEntrada";
import { CAMPOS_DEPRECIACION } from "../../../settings/formConfig";
import { CategoryOutlined } from "@mui/icons-material";

const DepreciacionTabla = () => {
  const { handleEsCargaDatos } = useSistema();
  const { tabla, formManager } = useDepreciacion();
  const { control, formState, watch } = formManager;
  const { errors } = formState;
  const { filaSeleccionada, handleFilaSeleccionada, handlerQuitarSeleccion } =
    useTabla();
  const numeroBienesDepreciados = Number(
    watch(CAMPOS_DEPRECIACION.NUMERO_BIENES_DEPRECIADOS)
  );
  const numeroBienesNoDepreciados = Number(
    watch(CAMPOS_DEPRECIACION.NUMERO_BIENES_NO_DEPRECIADOS)
  );

  return (
    <Box className="tabla-unica">
      {handleEsCargaDatos() ? (
        <TablaSkeleton />
      ) : (
        <Stack direction="row">
          <Tabla
            columnas={tabla.columnas}
            datos={tabla.datos}
            filaSeleccionada={filaSeleccionada}
            handleFilaSeleccionada={handleFilaSeleccionada}
            orderBy={tabla.campoId}
            cargando={tabla.cargando}
            componenteActions={
              <DepreciacionActions
                titulo={tabla.titulo}
                handleQuitarSeleccion={handlerQuitarSeleccion}
              />
            }
          />
          <Stack
            direction="column"
            sx={{
              height: "100%",
              borderLeft: "1px solid #e0e0e0",
              width: "400px",
            }}
          >
            <EncabezadoSeccion
              icono={<CategoryOutlined />}
              titulo="Resultados de Depreciación"
            />
            <Box className="contenedor-seccion alto-completo padding-igual">
              <FormCampoEntrada
                id={CAMPOS_DEPRECIACION.MONTO_TOTAL_DEPRECIADO}
                name={CAMPOS_DEPRECIACION.MONTO_TOTAL_DEPRECIADO}
                label="Monto total depreciado"
                control={control}
                defaultValue="0"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  },
                }}
                error={errors[CAMPOS_DEPRECIACION.MONTO_TOTAL_DEPRECIADO]}
                helperText={
                  errors[CAMPOS_DEPRECIACION.MONTO_TOTAL_DEPRECIADO]?.message
                }
                disabled
              />
              <FormCampoEntrada
                id={CAMPOS_DEPRECIACION.NUMERO_BIENES_DEPRECIADOS}
                name={CAMPOS_DEPRECIACION.NUMERO_BIENES_DEPRECIADOS}
                label="Número de bienes depreciados"
                control={control}
                defaultValue="0"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="start">
                        {numeroBienesDepreciados === 1 ? "Bien" : "Bienes"}
                      </InputAdornment>
                    ),
                  },
                }}
                error={errors[CAMPOS_DEPRECIACION.NUMERO_BIENES_DEPRECIADOS]}
                helperText={
                  errors[CAMPOS_DEPRECIACION.NUMERO_BIENES_DEPRECIADOS]?.message
                }
                disabled
              />
              <FormCampoEntrada
                id={CAMPOS_DEPRECIACION.NUMERO_BIENES_NO_DEPRECIADOS}
                name={CAMPOS_DEPRECIACION.NUMERO_BIENES_NO_DEPRECIADOS}
                label="Número de bienes sin depreciar"
                control={control}
                defaultValue="0"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="start">
                        {numeroBienesNoDepreciados === 1 ? "Bien" : "Bienes"}
                      </InputAdornment>
                    ),
                  },
                }}
                error={errors[CAMPOS_DEPRECIACION.NUMERO_BIENES_NO_DEPRECIADOS]}
                helperText={
                  errors[CAMPOS_DEPRECIACION.NUMERO_BIENES_NO_DEPRECIADOS]
                    ?.message
                }
                disabled
              />
              <FormCampoEntrada
                id={CAMPOS_DEPRECIACION.TOTAL_BIENES}
                name={CAMPOS_DEPRECIACION.TOTAL_BIENES}
                label="Total de bienes encontrados"
                control={control}
                defaultValue="0"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="start">
                        {numeroBienesNoDepreciados + numeroBienesDepreciados ===
                        1
                          ? "Bien"
                          : "Bienes"}
                      </InputAdornment>
                    ),
                  },
                }}
                error={errors[CAMPOS_DEPRECIACION.TOTAL_BIENES]}
                helperText={errors[CAMPOS_DEPRECIACION.TOTAL_BIENES]?.message}
                disabled
              />
            </Box>
          </Stack>
        </Stack>
      )}
    </Box>
  );
};

export default DepreciacionTabla;
