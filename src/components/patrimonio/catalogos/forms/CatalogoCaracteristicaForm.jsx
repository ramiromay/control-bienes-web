import DialogoEmergente from "../../../../components/utils/DialogoEmergente";
import FormCampoAutocompletar from "../../../utils/FormCampoAutocompletar";
import { useForm } from "react-hook-form";
import { useCatalogo } from "../../../../context/CatalogoContext";
import FormCampoEntrada from "../../../utils/FormCampoEntrada";
import useTabla from "@context/Tabla/useTabla";
import { useEffect, useState } from "react";
import { useSnackbar } from "@context/SnackbarContext";
import { getFamilias, getSubfamilias } from "../../../../services/catalogo";
import { Checkbox, MenuItem, Stack, Typography } from "@mui/material";
import FormCheck from "../../../utils/FormCheck";
import { useSistema } from "../../../../context/SistemaContext";
import { CAMPOS_CARACTERISTICA } from "../../../../settings/formConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { caracteristicaValidacion } from "../../../../settings/validacionConfig";
import ItemInfoExtraAutocompletar from "../../../utils/ItemInfoExtraAutocompletar";

const CatalogoCaracteristicaForm = () => {
  const { handleError } = useSistema();
  const {
    dialogo,
    handleEnviar,
    handleCerrarDialogo,
    getTituloDialogo,
    esDialogoModificacion,
    esDialogoVisualizacion,
    handleGetRegistroCatalogo,
  } = useCatalogo();
  const { filaSeleccionada } = useTabla();
  const { showSnackbar } = useSnackbar();
  const { control, formState, handleSubmit, setValue } = useForm({
    resolver: yupResolver(caracteristicaValidacion),
  });
  const { errors } = formState;

  const [cargando, setCargando] = useState(true);
  const [caracteristica, setCaracteristica] = useState();
  const [familias, setFamilias] = useState();
  const [subfamilias, setSubfamilias] = useState([]);
  const [subfamiliasXFamilia, setSubfamiliasXFamilia] = useState([]);

  const esVisualizacion = esDialogoVisualizacion();
  const esModificacion = esDialogoModificacion();
  const tituloDialogo = getTituloDialogo("Caracteristica Bien");

  useEffect(() => {
    setCargando(true);
    Promise.all([
      getFamilias(),
      getSubfamilias(),
      handleGetRegistroCatalogo(filaSeleccionada[0]),
    ])
      .then(([familias, subFamilia, caracteristica]) => {
        setFamilias(familias);
        setSubfamilias(subFamilia);
        setCaracteristica(caracteristica);
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
    if (caracteristica) {
      const {
        idFamilia,
        idSubfamilia,
        idCaracteristicaBien,
        etiqueta,
        descripcion,
        activo,
        fechaCreacion,
        fechaModificacion,
      } = caracteristica;
      const subfamiliaSeleccionada = subfamilias.find(
        (entidad) => entidad.id === idSubfamilia
      );
      const familiaSeleccionada = familias.find(
        (entidad) => entidad.id === idFamilia
      );
      const subfamiliasFiltradas = subfamilias.filter(
        (entidad) => entidad.idFamilia === idFamilia
      );

      setSubfamiliasXFamilia(subfamiliasFiltradas);
      setValue(CAMPOS_CARACTERISTICA.ID_CARACTERISTICA, idCaracteristicaBien);
      setValue(CAMPOS_CARACTERISTICA.FAMILIA, familiaSeleccionada);
      setValue(CAMPOS_CARACTERISTICA.SUBFAMILIA, subfamiliaSeleccionada);
      setValue(CAMPOS_CARACTERISTICA.ETIQUETA, etiqueta);
      setValue(CAMPOS_CARACTERISTICA.DESCRIPCION, descripcion);
      setValue(CAMPOS_CARACTERISTICA.ACTIVO, activo);
      setValue(CAMPOS_CARACTERISTICA.FECHA_CREACION, fechaCreacion);
      setValue(CAMPOS_CARACTERISTICA.FECHA_MODIFICACION, fechaModificacion);
    }
    // eslint-disable-next-line
  }, [caracteristica]);

  const changeFamilia = (familia) => {
    if (!familia) {
      setSubfamiliasXFamilia([]);
      setValue(CAMPOS_CARACTERISTICA.SUBFAMILIA, null);

      return;
    }
    const subfamiliasFiltradas = subfamilias.filter(
      (subfamilia) => subfamilia.idFamilia === familia.id
    );
    setSubfamiliasXFamilia(subfamiliasFiltradas);
    setValue(CAMPOS_CARACTERISTICA.SUBFAMILIA, null);
  };

  const onSubmit = handleSubmit(async (data) => {
    setCargando(true);
    console.log("inicia proceso");
    await handleEnviar(filaSeleccionada[0], data)
      .then(() => {
        const mensaje = esModificacion
          ? "Caracteristica modificada correctamente"
          : "Caracteristica guardada correctamente";
        handleCerrarDialogo();
        showSnackbar(mensaje, "success");
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        console.log("inicia petiicion");

        setCargando(false);
      });
    console.log("finaliza proceso");
  });

  return (
    <DialogoEmergente
      titulo={tituloDialogo}
      cargando={cargando}
      abierto={dialogo.abierto}
      onClickConfirmar={onSubmit}
      onClickCancelar={handleCerrarDialogo}
      textoCancelar={esVisualizacion ? "Cerrar" : "Cancelar"}
      disabledConfirmar={esVisualizacion}
    >
      <FormCampoEntrada
        id={CAMPOS_CARACTERISTICA.ID_CARACTERISTICA}
        name={CAMPOS_CARACTERISTICA.ID_CARACTERISTICA}
        label="Id Característica"
        control={control}
        defaultValue="Automatico"
        required
        disabled
      />
      <FormCampoAutocompletar
        id={CAMPOS_CARACTERISTICA.FAMILIA}
        name={CAMPOS_CARACTERISTICA.FAMILIA}
        label="Familia"
        control={control}
        options={familias}
        handleOnChange={changeFamilia}
        error={errors[CAMPOS_CARACTERISTICA.FAMILIA]}
        helperText={errors[CAMPOS_CARACTERISTICA.FAMILIA]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoAutocompletar
        id={CAMPOS_CARACTERISTICA.SUBFAMILIA}
        name={CAMPOS_CARACTERISTICA.SUBFAMILIA}
        label="Sub Familia"
        control={control}
        options={subfamiliasXFamilia}
        error={errors[CAMPOS_CARACTERISTICA.SUBFAMILIA]}
        helperText={errors[CAMPOS_CARACTERISTICA.SUBFAMILIA]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoEntrada
        id={CAMPOS_CARACTERISTICA.ETIQUETA}
        name={CAMPOS_CARACTERISTICA.ETIQUETA}
        label="Etiqueta"
        control={control}
        error={errors[CAMPOS_CARACTERISTICA.ETIQUETA]}
        helperText={errors[CAMPOS_CARACTERISTICA.ETIQUETA]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoEntrada
        id={CAMPOS_CARACTERISTICA.DESCRIPCION}
        name={CAMPOS_CARACTERISTICA.DESCRIPCION}
        label="Descripción"
        control={control}
        disabled={esVisualizacion}
      />
      {esVisualizacion && (
        <>
          <Stack direction="row" gap={1}>
            <FormCampoEntrada
              id={CAMPOS_CARACTERISTICA.FECHA_CREACION}
              name={CAMPOS_CARACTERISTICA.FECHA_CREACION}
              label="Fecha Creación"
              control={control}
              disabled
            />
            <FormCampoEntrada
              id={CAMPOS_CARACTERISTICA.FECHA_MODIFICACION}
              name={CAMPOS_CARACTERISTICA.FECHA_MODIFICACION}
              label="Fecha Modificación"
              control={control}
              disabled
            />
          </Stack>
          <FormCheck
            id={CAMPOS_CARACTERISTICA.ACTIVO}
            name={CAMPOS_CARACTERISTICA.ACTIVO}
            control={control}
            label="Registro Activo"
            disabled
          />
        </>
      )}
    </DialogoEmergente>
  );
};

export default CatalogoCaracteristicaForm;
