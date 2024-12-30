import DialogoEmergente from "../../../utils/DialogoEmergente";
import { useForm } from "react-hook-form";
import { useCatalogo } from "../../../../context/CatalogoContext";
import FormCampoEntrada from "../../../utils/FormCampoEntrada";
import useTabla from "@context/Tabla/useTabla";
import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { useSistema } from "../../../../context/SistemaContext";
import { useSnackbar } from "@context/SnackbarContext";
import FormCampoAutocompletar from "../../../utils/FormCampoAutocompletar";
import { CAMPOS_SUBFAMILIA } from "../../../../settings/formConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { subFamiliaValidacion } from "../../../../settings/validacionConfig";
import { getFamilias } from "../../../../services/catalogo";
import FormCheck from "../../../utils/FormCheck";

const CatalogoSubFamiliaForm = () => {
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
    resolver: yupResolver(subFamiliaValidacion),
  });
  const { errors } = formState;

  const [cargando, setCargando] = useState(true);
  const [subfamilia, setSubfamilia] = useState();
  const [familias, setFamilias] = useState([]);

  const esVisualizacion = esDialogoVisualizacion();
  const esModificacion = esDialogoModificacion();
  const tituloDialogo = getTituloDialogo("Sub Familia");

  useEffect(() => {
    Promise.all([getFamilias(), handleGetRegistroCatalogo(filaSeleccionada[0])])
      .then(([familias, claveVehicular]) => {
        setFamilias(familias);
        setSubfamilia(claveVehicular);
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
    if (subfamilia) {
      const {
        idSubfamilia,
        idFamilia,
        nombre,
        descripcion,
        valorRecuperable,
        activo,
        fechaCreacion,
        fechaModificacion,
      } = subfamilia;
    
      const familiaSeleccionada = familias.find(
        (entidad) => entidad.id === idFamilia
      );
    
      setValue(CAMPOS_SUBFAMILIA.ID_SUBFAMILIA, idSubfamilia);
      setValue(CAMPOS_SUBFAMILIA.FAMILIA, familiaSeleccionada);
      setValue(CAMPOS_SUBFAMILIA.NOMBRE, nombre);
      setValue(CAMPOS_SUBFAMILIA.DESCRIPCION, descripcion);
      setValue(CAMPOS_SUBFAMILIA.VALOR_RECUPERABLE, valorRecuperable);
      setValue(CAMPOS_SUBFAMILIA.ACTIVO, activo);
      setValue(CAMPOS_SUBFAMILIA.FECHA_CREACION, fechaCreacion);
      setValue(CAMPOS_SUBFAMILIA.FECHA_MODIFICACION, fechaModificacion);
    }
    // eslint-disable-next-line
  }, [subfamilia]);

  const onSubmit = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviar(filaSeleccionada, data)
      .then(() => {
        const mensaje = esModificacion
        ? "Sub Familia modificado correctamente"
        : "Sub Familia guardado correctamente";
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
      cargando={cargando}
      abierto={dialogo.abierto}
      disabledConfirmar={esVisualizacion}
      onClickConfirmar={onSubmit}
      onClickCancelar={handleCerrarDialogo}
      textoCancelar={esVisualizacion ? "Cerrar" : "Cancelar"}
    >
      <FormCampoEntrada
        id={CAMPOS_SUBFAMILIA.ID_SUBFAMILIA}
        name={CAMPOS_SUBFAMILIA.ID_SUBFAMILIA}
        label="Id Sub Familia"
        control={control}
        defaultValue="0"
        type="number"
        required
        disabled={esVisualizacion || esModificacion}
        error={errors[CAMPOS_SUBFAMILIA.ID_SUBFAMILIA]}
        helperText={errors[CAMPOS_SUBFAMILIA.ID_SUBFAMILIA]?.message}
      />
      <FormCampoAutocompletar
        id={CAMPOS_SUBFAMILIA.FAMILIA}
        name={CAMPOS_SUBFAMILIA.FAMILIA}
        label="Familia"
        control={control}
        options={familias}
        required
        disabled={esVisualizacion}
        error={errors[CAMPOS_SUBFAMILIA.FAMILIA]}
        helperText={errors[CAMPOS_SUBFAMILIA.FAMILIA]?.message}
      />
      <FormCampoEntrada
        id={CAMPOS_SUBFAMILIA.NOMBRE}
        name={CAMPOS_SUBFAMILIA.NOMBRE}
        label="Nombre"
        control={control}
        required
        disabled={esVisualizacion}
        error={errors[CAMPOS_SUBFAMILIA.NOMBRE]}
        helperText={errors[CAMPOS_SUBFAMILIA.NOMBRE]?.message}
      />
      <FormCampoEntrada
        id={CAMPOS_SUBFAMILIA.DESCRIPCION}
        name={CAMPOS_SUBFAMILIA.DESCRIPCION}
        label="Descripción"
        control={control}
        disabled={esVisualizacion}
        required
        error={errors[CAMPOS_SUBFAMILIA.DESCRIPCION]}
        helperText={errors[CAMPOS_SUBFAMILIA.DESCRIPCION]?.message}
      />
      <FormCampoEntrada
        id={CAMPOS_SUBFAMILIA.VALOR_RECUPERABLE}
        name={CAMPOS_SUBFAMILIA.VALOR_RECUPERABLE}
        label="Valor Recuperable"
        control={control}
        type="number"
        defaultValue="0.0"
        required
        disabled={esVisualizacion}
        error={errors[CAMPOS_SUBFAMILIA.VALOR_RECUPERABLE]}
        helperText={errors[CAMPOS_SUBFAMILIA.VALOR_RECUPERABLE]?.message}
      />
      {esVisualizacion && (
        <>
          <Stack direction="row" gap={1}>
            <FormCampoEntrada
              id={CAMPOS_SUBFAMILIA.FECHA_CREACION}
              name={CAMPOS_SUBFAMILIA.FECHA_CREACION}
              label="Fecha Creación"
              control={control}
              disabled
            />
            <FormCampoEntrada
              id={CAMPOS_SUBFAMILIA.FECHA_MODIFICACION}
              name={CAMPOS_SUBFAMILIA.FECHA_MODIFICACION}
              label="Fecha Modificación"
              control={control}
              disabled
            />
          </Stack>
          <FormCheck
            control={control}
            name={CAMPOS_SUBFAMILIA.ACTIVO}
            label="Registro Activo"
            disabled
          />
        </>
      )}
    </DialogoEmergente>
  );
};

export default CatalogoSubFamiliaForm;
