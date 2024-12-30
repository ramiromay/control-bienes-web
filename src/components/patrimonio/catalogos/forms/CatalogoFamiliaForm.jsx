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
import FormCampoAutocompletar from "../../../utils/FormCampoAutocompletar";
import { yupResolver } from "@hookform/resolvers/yup";
import { familiaValidacion } from "../../../../settings/validacionConfig";
import { CAMPOS_FAMILIA } from "../../../../settings/formConfig";
import { getTipoBien } from "../../../../services/catalogo";

const CatalogoFamiliaForm = () => {
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
    resolver: yupResolver(familiaValidacion),
  });
  const { errors } = formState;

  const [cargando, setCargando] = useState(true);
  const [familia, setFamilia] = useState();
  const [tipoBien, setTipoBien] = useState([]);

  const esVisualizacion = esDialogoVisualizacion();
  const esModificacion = esDialogoModificacion();
  const tituloDialogo = getTituloDialogo("Familia");

  useEffect(() => {
    Promise.all([getTipoBien(), handleGetRegistroCatalogo(filaSeleccionada[0])])
      .then(([tipoBien, familia]) => {
        setTipoBien(tipoBien);
        setFamilia(familia);
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
    if (familia) {
      const {
        idFamilia,
        nombre,
        descripcion,
        activo,
        fechaCreacion,
        fechaModificacion,
      } = familia;
      const tipoBienSeleccionado = tipoBien.find(
        (t) => t.id === familia.idTipoBien
      );

      setValue(CAMPOS_FAMILIA.ID_FAMILIA, idFamilia);
      setValue(CAMPOS_FAMILIA.TIPO_BIEN, tipoBienSeleccionado);
      setValue(CAMPOS_FAMILIA.NOMBRE, nombre);
      setValue(CAMPOS_FAMILIA.DESCRIPCION, descripcion);
      setValue(CAMPOS_FAMILIA.ACTIVO, activo);
      setValue(CAMPOS_FAMILIA.FECHA_CREACION, fechaCreacion);
      setValue(CAMPOS_FAMILIA.FECHA_MODIFICACION, fechaModificacion);
    }
    // eslint-disable-next-line
  }, [familia]);

  const onSubmit = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviar(filaSeleccionada, data)
      .then(() => {
        const mensaje = esModificacion
          ? "Familia modificada correctamente"
          : "Familia guardada correctamente";
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
        id={CAMPOS_FAMILIA.ID_FAMILIA}
        name={CAMPOS_FAMILIA.ID_FAMILIA}
        label="IdFamilia"
        type="number"
        control={control}
        defaultValue={0.0}
        disabled={esVisualizacion || esModificacion}
        required={true}
        error={errors[CAMPOS_FAMILIA.ID_FAMILIA]}
        helperText={errors[CAMPOS_FAMILIA.ID_FAMILIA]?.message}
      />
      <FormCampoAutocompletar
        id={CAMPOS_FAMILIA.TIPO_BIEN}
        name={CAMPOS_FAMILIA.TIPO_BIEN}
        label="Tipo Bien"
        control={control}
        options={tipoBien}
        disabled={esVisualizacion}
        required
        error={errors[CAMPOS_FAMILIA.TIPO_BIEN]}
        helperText={errors[CAMPOS_FAMILIA.TIPO_BIEN]?.message}
      />
      <FormCampoEntrada
        id={CAMPOS_FAMILIA.NOMBRE}
        name={CAMPOS_FAMILIA.NOMBRE}
        label="Nombre"
        control={control}
        disabled={esVisualizacion}
        required
        error={errors[CAMPOS_FAMILIA.NOMBRE]}
        helperText={errors[CAMPOS_FAMILIA.NOMBRE]?.message}
      />
      <FormCampoEntrada
        id={CAMPOS_FAMILIA.DESCRIPCION}
        name={CAMPOS_FAMILIA.DESCRIPCION}
        label="Descripción"
        control={control}
        disabled={esVisualizacion}
        required
        error={errors[CAMPOS_FAMILIA.DESCRIPCION]}
        helperText={errors[CAMPOS_FAMILIA.DESCRIPCION]?.message}
      />
      {esVisualizacion && (
        <>
          <Stack direction="row" gap={1}>
            <FormCampoEntrada
              id={CAMPOS_FAMILIA.FECHA_CREACION}
              name={CAMPOS_FAMILIA.FECHA_CREACION}
              label="Fecha Creacion"
              control={control}
              disabled
            />
            <FormCampoEntrada
              id={CAMPOS_FAMILIA.FECHA_MODIFICACION}
              name={CAMPOS_FAMILIA.FECHA_MODIFICACION}
              label="Fecha Modificación"
              control={control}
              disabled
            />
          </Stack>
          <FormCheck
            id={CAMPOS_FAMILIA.ACTIVO}
            name={CAMPOS_FAMILIA.ACTIVO}
            label="Registro Activo"
            control={control}
            disabled
          />
        </>
      )}
    </DialogoEmergente>
  );
};

export default CatalogoFamiliaForm;
