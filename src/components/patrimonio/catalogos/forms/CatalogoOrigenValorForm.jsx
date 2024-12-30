import DialogoEmergente from "../../../utils/DialogoEmergente";
import { useForm } from "react-hook-form";
import { useCatalogo } from "../../../../context/CatalogoContext";
import FormCampoEntrada from "../../../utils/FormCampoEntrada";
import useTabla from "@context/Tabla/useTabla";
import { useEffect, useState } from "react";
import FormCheck from "../../../utils/FormCheck";
import { Stack } from "@mui/material";
import { useSistema } from "../../../../context/SistemaContext";
import { useSnackbar } from "@context/SnackbarContext";
import { CAMPOS_ORIGEN_VALOR } from "../../../../settings/formConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { origenValorValidacion } from "../../../../settings/validacionConfig";

const CatalogoOrigenValorForm = () => {
  const {
    dialogo,
    handleEnviar,
    handleGetRegistroCatalogo,
    handleCerrarDialogo,
    getTituloDialogo,
    esDialogoModificacion,
    esDialogoVisualizacion,
  } = useCatalogo();
  const { filaSeleccionada } = useTabla();
  const { showSnackbar } = useSnackbar();
  const { handleError } = useSistema();
  const { control, formState, handleSubmit, setValue } = useForm({
    resolver: yupResolver(origenValorValidacion),
  });
  const { errors } = formState;

  const [cargando, setCargando] = useState(true);
  const [origenValor, setOrigenValor] = useState();

  const esVisualizacion = esDialogoVisualizacion();
  const esModificacion = esDialogoModificacion();
  const tituloDialogo = getTituloDialogo("Origen de Valor");

  useEffect(() => {
    handleGetRegistroCatalogo(filaSeleccionada[0])
      .then((claveVehicular) => {
        setOrigenValor(claveVehicular);
      })
      .catch((error) => {
        handleCerrarDialogo();
        handleError(error);
      })
      .finally(() => {
        setCargando(false);
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (origenValor) {
      const {
        idOrigenValor,
        origen,
        descripcion,
        activo,
        fechaCreacion,
        fechaModificacion,
      } = origenValor;

      setValue(CAMPOS_ORIGEN_VALOR.ID_ORIGEN_VALOR, idOrigenValor);
      setValue(CAMPOS_ORIGEN_VALOR.ORIGEN, origen);
      setValue(CAMPOS_ORIGEN_VALOR.DESCRIPCION, descripcion);
      setValue(CAMPOS_ORIGEN_VALOR.ACTIVO, activo);
      setValue(CAMPOS_ORIGEN_VALOR.FECHA_CREACION, fechaCreacion);
      setValue(CAMPOS_ORIGEN_VALOR.FECHA_MODIFICACION, fechaModificacion);
    }
    // eslint-disable-next-line
  }, [origenValor]);

  const onSubmit = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviar(filaSeleccionada, data)
      .then(() => {
        const mensaje = esModificacion
          ? "Origen valor modificado correctamente"
          : "Origen valor guardado correctamente";
        handleCerrarDialogo();
        showSnackbar(mensaje, "success");
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        setCargando(false);
      });
  });

  return (
    <DialogoEmergente
      titulo={tituloDialogo}
      cargando={cargando.activo}
      abierto={dialogo.abierto}
      disabledConfirmar={esVisualizacion}
      onClickConfirmar={onSubmit}
      onClickCancelar={handleCerrarDialogo}
      textoCancelar={esVisualizacion ? "Cerrar" : "Cancelar"}
    >
      <FormCampoEntrada
        id={CAMPOS_ORIGEN_VALOR.ID_ORIGEN_VALOR}
        name={CAMPOS_ORIGEN_VALOR.ID_ORIGEN_VALOR}
        label="Id Origen Valor"
        control={control}
        defaultValue="Automatico"
        required
        disabled
      />
      <FormCampoEntrada
        id={CAMPOS_ORIGEN_VALOR.ORIGEN}
        name={CAMPOS_ORIGEN_VALOR.ORIGEN}
        label="Origen"
        control={control}
        error={errors[CAMPOS_ORIGEN_VALOR.ORIGEN]}
        helperText={errors[CAMPOS_ORIGEN_VALOR.ORIGEN]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoEntrada
        id={CAMPOS_ORIGEN_VALOR.DESCRIPCION}
        name={CAMPOS_ORIGEN_VALOR.DESCRIPCION}
        label="Descripción"
        control={control}
        error={errors[CAMPOS_ORIGEN_VALOR.DESCRIPCION]}
        helperText={errors[CAMPOS_ORIGEN_VALOR.DESCRIPCION]?.message}
        disabled={esVisualizacion}
        required
      />
      {esVisualizacion && (
        <>
          <Stack direction="row" gap={1}>
            <FormCampoEntrada
              id={CAMPOS_ORIGEN_VALOR.FECHA_CREACION}
              name={CAMPOS_ORIGEN_VALOR.FECHA_CREACION}
              label="Fecha Creación"
              control={control}
              disabled
            />
            <FormCampoEntrada
              id={CAMPOS_ORIGEN_VALOR.FECHA_MODIFICACION}
              name={CAMPOS_ORIGEN_VALOR.FECHA_MODIFICACION}
              label="Fecha Modificación"
              control={control}
              disabled
            />
          </Stack>
          <FormCheck
            control={control}
            name={CAMPOS_ORIGEN_VALOR.ACTIVO}
            label="Registro Activo"
            disabled
          />
        </>
      )}
    </DialogoEmergente>
  );
};

export default CatalogoOrigenValorForm;
