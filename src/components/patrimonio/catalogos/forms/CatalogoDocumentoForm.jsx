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
import { CAMPOS_DOCUMENTO } from "../../../../settings/formConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  documentoValidacion,
  resguardanteValidacion,
} from "../../../../settings/validacionConfig";
import FormCampoAutocompletar from "../../../utils/FormCampoAutocompletar";
import {
  getTipoTramite,
  getMotivoTramite,
} from "../../../../services/patrimonio";
import { getSubModulos } from "../../../../services/sistema";
import { mapArray } from "../../../../settings/utils";
import {
  compMotivoTramiteMappingRules,
  compSubModuloMapppingRules,
  compTipoTramiteMappingRules,
} from "../../../../settings/mappingRulesConfig";

const CatalogoDocumentoForm = () => {
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
    resolver: yupResolver(documentoValidacion),
  });
  const { errors } = formState;

  const [cargando, setCargando] = useState(true);
  const [documento, setDocumento] = useState();
  const [tiposTramites, setTiposTramites] = useState([]);
  const [motivosTramites, setMotivosTramites] = useState([]);
  const [subModulos, setSubModulos] = useState([]);

  const [tiposTramitesXSubModulo, setTiposTramitesXSubModulo] = useState([]);
  const [motivosTramitesXTipoTramite, setMotivosTramitesXTipoTramite] =
    useState([]);

  const esVisualizacion = esDialogoVisualizacion();
  const esModificacion = esDialogoModificacion();
  const tituloDialogo = getTituloDialogo("Documento");

  useEffect(() => {
    Promise.all([
      getTipoTramite(),
      getMotivoTramite(),
      getSubModulos(),
      handleGetRegistroCatalogo(filaSeleccionada[0]),
    ])
      .then(
        ([
          tiposTramitesData,
          motivosTramitesData,
          subModulosData,
          documentoData,
        ]) => {
          const tiposTramites = mapArray(
            tiposTramitesData,
            compTipoTramiteMappingRules
          );
          const motivosTramites = mapArray(
            motivosTramitesData,
            compMotivoTramiteMappingRules
          );
          const subModulos = mapArray(
            subModulosData,
            compSubModuloMapppingRules
          );
          setTiposTramites(tiposTramites);
          setMotivosTramites(motivosTramites);
          setSubModulos(subModulos);
          setDocumento(documentoData);
        }
      )
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
    if (documento) {
      const {
        idDocumento,
        abreviacion,
        nombre,
        idSubModulo,
        idTipoTramite,
        idMotivoTramite,
        activo,
        fechaCreacion,
        fechaModificacion,
      } = documento;

      const subModuloSeleccionado = subModulos.find(
        (e) => e.id === idSubModulo
      );

      const tipoTramiteSeleccionado = tiposTramites.find(
        (e) => e.id === idTipoTramite
      );

      const motivoTramiteSeleccionado = motivosTramites.find(
        (e) => e.id === idMotivoTramite
      );

      setValue(CAMPOS_DOCUMENTO.ID_DOCUMENTO, idDocumento);
      setValue(CAMPOS_DOCUMENTO.ABREVIACION, abreviacion);
      setValue(CAMPOS_DOCUMENTO.NOMBRE, nombre);
      setValue(CAMPOS_DOCUMENTO.SUB_MODULO, subModuloSeleccionado);
      setValue(CAMPOS_DOCUMENTO.TIPO_TRAMITE, tipoTramiteSeleccionado);
      setValue(CAMPOS_DOCUMENTO.MOTIVO_TRAMITE, motivoTramiteSeleccionado);
      setValue(CAMPOS_DOCUMENTO.ACTIVO, activo);
      setValue(CAMPOS_DOCUMENTO.FECHA_CREACION, fechaCreacion);
      setValue(CAMPOS_DOCUMENTO.FECHA_MODIFICACION, fechaModificacion);
    }
    // eslint-disable-next-line
  }, [documento]);

  const onSubmit = handleSubmit(async (data) => {
    setCargando(true);
    await handleEnviar(filaSeleccionada, data)
      .then(() => {
        const mensaje = esModificacion
          ? "Documento modificado correctamente"
          : "Documento guardado correctamente";
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

  const changeSubModulo = (subModulo) => {
    changeTipoTramite(null);
    setValue(CAMPOS_DOCUMENTO.TIPO_TRAMITE, null);
    if (!subModulo) {
      setTiposTramitesXSubModulo([]);
      return;
    }
    const tiposTramitesXSubModulo = tiposTramites.filter(
      (e) => e.idSubModulo === subModulo.id
    );
    setTiposTramitesXSubModulo(tiposTramitesXSubModulo);
  };

  const changeTipoTramite = (tipoTramite) => {
    setValue(CAMPOS_DOCUMENTO.MOTIVO_TRAMITE, null);
    if (!tipoTramite) {
      setMotivosTramitesXTipoTramite([]);
      return;
    }

    const motivosTramitesXTipoTramite = motivosTramites.filter(
      (e) => e.idTipoTramite === tipoTramite.id
    );
    setMotivosTramitesXTipoTramite(motivosTramitesXTipoTramite);
  };

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
        id={CAMPOS_DOCUMENTO.ID_DOCUMENTO}
        name={CAMPOS_DOCUMENTO.ID_DOCUMENTO}
        label="Id Documento"
        control={control}
        defaultValue="Automatico"
        required
        disabled
      />
      <FormCampoEntrada
        id={CAMPOS_DOCUMENTO.ABREVIACION}
        name={CAMPOS_DOCUMENTO.ABREVIACION}
        label="Abreviación"
        required
        control={control}
        disabled={esVisualizacion}
        error={errors[CAMPOS_DOCUMENTO.ABREVIACION]}
        helperText={errors[CAMPOS_DOCUMENTO.ABREVIACION]?.message}
      />
      <FormCampoEntrada
        id={CAMPOS_DOCUMENTO.NOMBRE}
        name={CAMPOS_DOCUMENTO.NOMBRE}
        label="Nombre"
        required
        control={control}
        disabled={esVisualizacion}
        error={errors[CAMPOS_DOCUMENTO.NOMBRE]}
        helperText={errors[CAMPOS_DOCUMENTO.NOMBRE]?.message}
      />
      <FormCampoAutocompletar
        id={CAMPOS_DOCUMENTO.SUB_MODULO}
        name={CAMPOS_DOCUMENTO.SUB_MODULO}
        label="Sub Modulo"
        control={control}
        required
        disabled={esVisualizacion}
        handleOnChange={changeSubModulo}
        options={subModulos}
        error={errors[CAMPOS_DOCUMENTO.SUB_MODULO]}
        helperText={errors[CAMPOS_DOCUMENTO.SUB_MODULO]?.message}
      />
      <FormCampoAutocompletar
        id={CAMPOS_DOCUMENTO.TIPO_TRAMITE}
        name={CAMPOS_DOCUMENTO.TIPO_TRAMITE}
        label="Tipo Tramite"
        control={control}
        required
        disabled={esVisualizacion}
        handleOnChange={changeTipoTramite}
        options={tiposTramitesXSubModulo}
        error={errors[CAMPOS_DOCUMENTO.TIPO_TRAMITE]}
        helperText={errors[CAMPOS_DOCUMENTO.TIPO_TRAMITE]?.message}
      />
      <FormCampoAutocompletar
        id={CAMPOS_DOCUMENTO.MOTIVO_TRAMITE}
        name={CAMPOS_DOCUMENTO.MOTIVO_TRAMITE}
        label="Motivo Tramite"
        control={control}
        required
        disabled={esVisualizacion}
        options={motivosTramitesXTipoTramite}
        error={errors[CAMPOS_DOCUMENTO.MOTIVO_TRAMITE]}
        helperText={errors[CAMPOS_DOCUMENTO.MOTIVO_TRAMITE]?.message}
      />
      {esVisualizacion && (
        <>
          <Stack direction="row" gap={1}>
            <FormCampoEntrada
              id={CAMPOS_DOCUMENTO.FECHA_CREACION}
              name={CAMPOS_DOCUMENTO.FECHA_CREACION}
              label="Fecha Creación"
              control={control}
              disabled
            />
            <FormCampoEntrada
              id={CAMPOS_DOCUMENTO.FECHA_MODIFICACION}
              name={CAMPOS_DOCUMENTO.FECHA_MODIFICACION}
              label="Fecha Modificación"
              control={control}
              disabled
            />
          </Stack>
          <FormCheck
            id={CAMPOS_DOCUMENTO.ACTIVO}
            name={CAMPOS_DOCUMENTO.ACTIVO}
            label="Registro Activo"
            control={control}
            disabled
          />
        </>
      )}
    </DialogoEmergente>
  );
};

export default CatalogoDocumentoForm;
