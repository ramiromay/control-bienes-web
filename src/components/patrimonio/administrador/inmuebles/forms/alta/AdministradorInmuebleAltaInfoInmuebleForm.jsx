import React, { useState } from "react";
import FormCampoEntrada from "../../../../../utils/FormCampoEntrada";
import { CAMPOS_ALTA_INMUEBLE } from "../../../../../../settings/formConfig";
import FormCampoAutocompletar from "../../../../../utils/FormCampoAutocompletar";
import { MOTIVO_TRAMITE } from "../../../../../../settings/sistemaConfig";
import FormCampoCalendario from "../../../../../utils/FormCampoCalendario";

const AdministradorInmuebleAltaInfoInmuebleForm = ({
  formManager = null,
  esVisualizacion = false,
  complementos = {},
  informacionTablaSuperior = {},
}) => {
  const idMotivoTramite = informacionTablaSuperior.idMotivoTramite;
  const altaDonacion = idMotivoTramite === MOTIVO_TRAMITE.ALTA_POR_DONACION;
  const altaCompraventa =
    idMotivoTramite === MOTIVO_TRAMITE.ALTA_POR_COMPRAVENTA;
  const altaDivicion = idMotivoTramite === MOTIVO_TRAMITE.ALTA_POR_DIVISION;
  const altaPermuta = idMotivoTramite === MOTIVO_TRAMITE.ALTA_POR_PERMUTA;
  const altaAdjudicacionTitulo =
    idMotivoTramite === MOTIVO_TRAMITE.ALTA_POR_ADJUDICACION_A_TITULO_GRATUITO;
  const altaCompraventaJudicial =
    idMotivoTramite === MOTIVO_TRAMITE.ALTA_POR_COMPRAVENTA_JUDICIAL;
  const altaExpropiacion =
    idMotivoTramite === MOTIVO_TRAMITE.ALTA_POR_EXPROPIACION;
  const altaInscripcionPrimitiva =
    idMotivoTramite === MOTIVO_TRAMITE.ALTA_POR_INSCRIPCION_PRIMITIVA;
  const {
    ID_SOLICITUD,
    REFERENCIA_CONAC,
    ID_FAMILIA,
    ID_SUBFAMILIA,
    NOMENCLATURA,
    DESCRIPCION,
    ID_TIPO_INMUEBLE,
    ID_USO_INMUEBLE,
    ID_TIPO_DOMINIO,
    ID_ESTADO_FISICO,
    ID_TIPO_AFECTACION,
    AFECTANTE,
    ID_TIPO_ADQUISICION,
    DECRETO_PUBLICACION,
    ESCRITURA_TITULO,
    FECHA_ADQUISICION,
    EXPEDIENTE,
    VALOR_HISTORICO,
    ANIOS_VIDA_UTIL,
    FECHA_ALTA_SISTEMA,
  } = CAMPOS_ALTA_INMUEBLE;
  const { control, formState, setValue } = formManager;
  const { errors } = formState;
  const [subfamiliasXFamilia, setSubfamiliasXFamilia] = useState([]);

  const {
    familias,
    subfamilias,
    tiposInmuebles,
    usosInmuebles,
    tiposDominios,
    estadosFisicos,
    tiposAfectacion,
    tiposAdquisicion,
    clasificacionConac,
  } = complementos;

  const changeFamilia = (familia) => {
    if (!familia) {
      setSubfamiliasXFamilia([]);
      setValue(ID_SUBFAMILIA, null);
      return;
    }
    const subfamiliasFiltradas = subfamilias.filter(
      (subfamilia) => subfamilia.idFamilia === familia.id
    );
    setSubfamiliasXFamilia(subfamiliasFiltradas);
    setValue(ID_SUBFAMILIA, null);
  };
  return (
    <>
      <FormCampoEntrada
        id={ID_SOLICITUD}
        name={ID_SOLICITUD}
        label="Folio Solicitud"
        type="number"
        defaultValue={informacionTablaSuperior.idSolicitud}
        control={control}
        error={errors[ID_SOLICITUD]}
        helperText={errors[ID_SOLICITUD]?.message}
        disabled
      />
      <FormCampoAutocompletar
        id={REFERENCIA_CONAC}
        name={REFERENCIA_CONAC}
        label="Clasificación CONAC"
        control={control}
        options={clasificacionConac}
        error={errors[REFERENCIA_CONAC]}
        helperText={errors[REFERENCIA_CONAC]?.message}
        required
        disabled={esVisualizacion}
      />
      <FormCampoAutocompletar
        id={ID_FAMILIA}
        name={ID_FAMILIA}
        label="Familia"
        control={control}
        options={familias}
        handleOnChange={changeFamilia}
        error={errors[ID_FAMILIA]}
        helperText={errors[ID_FAMILIA]?.message}
        required
        disabled={esVisualizacion}
      />
      <FormCampoAutocompletar
        id={ID_SUBFAMILIA}
        name={ID_SUBFAMILIA}
        label="Sub Familia"
        control={control}
        options={subfamiliasXFamilia}
        error={errors[ID_SUBFAMILIA]}
        helperText={errors[ID_SUBFAMILIA]?.message}
        required
        disabled={esVisualizacion}
      />
      <FormCampoEntrada
        id={NOMENCLATURA}
        name={NOMENCLATURA}
        label="Nomeclatura"
        control={control}
        error={errors[NOMENCLATURA]}
        multiline
        rows={4}
        helperText={errors[NOMENCLATURA]?.message}
        disabled={esVisualizacion}
      />
      <FormCampoEntrada
        id={DESCRIPCION}
        name={DESCRIPCION}
        label="Descripción"
        control={control}
        required
        error={errors[DESCRIPCION]}
        helperText={errors[DESCRIPCION]?.message}
        disabled={esVisualizacion}
      />
      <FormCampoAutocompletar
        id={ID_TIPO_INMUEBLE}
        name={ID_TIPO_INMUEBLE}
        label="Tipo de Inmueble"
        control={control}
        options={tiposInmuebles}
        error={errors[ID_TIPO_INMUEBLE]}
        helperText={errors[ID_TIPO_INMUEBLE]?.message}
        required
        disabled={esVisualizacion}
      />
      <FormCampoAutocompletar
        id={ID_USO_INMUEBLE}
        name={ID_USO_INMUEBLE}
        label="Uso Inmueble"
        control={control}
        options={usosInmuebles}
        error={errors[ID_USO_INMUEBLE]}
        helperText={errors[ID_USO_INMUEBLE]?.message}
        required
        disabled={esVisualizacion}
      />
      <FormCampoAutocompletar
        id={ID_TIPO_DOMINIO}
        name={ID_TIPO_DOMINIO}
        label="Tipo de Dominio"
        control={control}
        options={tiposDominios}
        error={errors[ID_TIPO_DOMINIO]}
        helperText={errors[ID_TIPO_DOMINIO]?.message}
        required
        disabled={esVisualizacion}
      />
      <FormCampoAutocompletar
        id={ID_ESTADO_FISICO}
        name={ID_ESTADO_FISICO}
        label="Estado del Inmueble"
        control={control}
        options={estadosFisicos}
        error={errors[ID_ESTADO_FISICO]}
        helperText={errors[ID_ESTADO_FISICO]?.message}
        required
        disabled={esVisualizacion}
      />
      <FormCampoAutocompletar
        id={ID_TIPO_AFECTACION}
        name={ID_TIPO_AFECTACION}
        label="Tipo de Afectación"
        control={control}
        options={tiposAfectacion}
        error={errors[ID_TIPO_AFECTACION]}
        helperText={errors[ID_TIPO_AFECTACION]?.message}
        required
        disabled={esVisualizacion}
      />
      <FormCampoEntrada
        id={AFECTANTE}
        name={AFECTANTE}
        label="Afectante"
        control={control}
        error={errors[AFECTANTE]}
        helperText={errors[AFECTANTE]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoAutocompletar
        id={ID_TIPO_ADQUISICION}
        name={ID_TIPO_ADQUISICION}
        label="Tipo de Adquisición"
        control={control}
        options={tiposAdquisicion}
        error={errors[ID_TIPO_ADQUISICION]}
        helperText={errors[ID_TIPO_ADQUISICION]?.message}
        required
        disabled={esVisualizacion}
      />
      {altaDonacion && (
        <>
          <FormCampoEntrada
            id={DECRETO_PUBLICACION}
            name={DECRETO_PUBLICACION}
            label="Decreto o Publicación"
            control={control}
            error={errors[DECRETO_PUBLICACION]}
            helperText={errors[DECRETO_PUBLICACION]?.message}
            disabled={esVisualizacion}
            required
          />
          <FormCampoCalendario
            id={FECHA_ADQUISICION}
            name={FECHA_ADQUISICION}
            label="Fecha de Donación"
            control={control}
            defaultValue={null}
            error={errors[FECHA_ADQUISICION]}
            helperText={errors[FECHA_ADQUISICION]?.message}
            required
            disabled={esVisualizacion}
          />
          <FormCampoCalendario
            id={FECHA_ALTA_SISTEMA}
            name={FECHA_ALTA_SISTEMA}
            label="Fecha Alta en Sistema"
            control={control}
            defaultValue={null}
            error={errors[FECHA_ALTA_SISTEMA]}
            helperText={errors[FECHA_ALTA_SISTEMA]?.message}
            required
            disabled={esVisualizacion}
          />
        </>
      )}
      {altaCompraventa && (
        <>
          <FormCampoEntrada
            id={ESCRITURA_TITULO}
            name={ESCRITURA_TITULO}
            label="Escrítura o Título"
            control={control}
            error={errors[ESCRITURA_TITULO]}
            helperText={errors[ESCRITURA_TITULO]?.message}
            disabled={esVisualizacion}
            required
          />
          <FormCampoCalendario
            id={FECHA_ADQUISICION}
            name={FECHA_ADQUISICION}
            label="Fecha Adquisición"
            control={control}
            defaultValue={null}
            error={errors[FECHA_ADQUISICION]}
            helperText={errors[FECHA_ADQUISICION]?.message}
            required
            disabled={esVisualizacion}
          />
          <FormCampoCalendario
            id={FECHA_ALTA_SISTEMA}
            name={FECHA_ALTA_SISTEMA}
            label="Fecha Alta en Sistema"
            control={control}
            defaultValue={null}
            error={errors[FECHA_ALTA_SISTEMA]}
            helperText={errors[FECHA_ALTA_SISTEMA]?.message}
            required
            disabled={esVisualizacion}
          />
        </>
      )}
      {altaDivicion && (
        <>
          <FormCampoEntrada
            id={ESCRITURA_TITULO}
            name={ESCRITURA_TITULO}
            label="Escritura o Título"
            control={control}
            error={errors[ESCRITURA_TITULO]}
            helperText={errors[ESCRITURA_TITULO]?.message}
            disabled={esVisualizacion}
            required
          />
          <FormCampoEntrada
            id={EXPEDIENTE}
            name={EXPEDIENTE}
            label="Expediente de Origen"
            control={control}
            error={errors[EXPEDIENTE]}
            helperText={errors[EXPEDIENTE]?.message}
            disabled={esVisualizacion}
            required
          />
          <FormCampoCalendario
            id={FECHA_ADQUISICION}
            name={FECHA_ADQUISICION}
            label="Fecha de División"
            control={control}
            defaultValue={null}
            error={errors[FECHA_ADQUISICION]}
            helperText={errors[FECHA_ADQUISICION]?.message}
            required
            disabled={esVisualizacion}
          />
        </>
      )}
      {altaPermuta && (
        <>
          <FormCampoEntrada
            id={ESCRITURA_TITULO}
            name={ESCRITURA_TITULO}
            label="Escritura o Título"
            control={control}
            error={errors[ESCRITURA_TITULO]}
            helperText={errors[ESCRITURA_TITULO]?.message}
            disabled={esVisualizacion}
            required
          />
          <FormCampoEntrada
            id={EXPEDIENTE}
            name={EXPEDIENTE}
            label="Expediente Permutado"
            control={control}
            error={errors[EXPEDIENTE]}
            helperText={errors[EXPEDIENTE]?.message}
            disabled={esVisualizacion}
            required
          />
          <FormCampoCalendario
            id={FECHA_ADQUISICION}
            name={FECHA_ADQUISICION}
            label="Fecha de Permuta"
            control={control}
            defaultValue={null}
            error={errors[FECHA_ADQUISICION]}
            helperText={errors[FECHA_ADQUISICION]?.message}
            required
            disabled={esVisualizacion}
          />
        </>
      )}
      {altaAdjudicacionTitulo && (
        <>
          <FormCampoEntrada
            id={DECRETO_PUBLICACION}
            name={DECRETO_PUBLICACION}
            label="Decreto o Publicación"
            control={control}
            error={errors[DECRETO_PUBLICACION]}
            helperText={errors[DECRETO_PUBLICACION]?.message}
            disabled={esVisualizacion}
            required
          />
          <FormCampoCalendario
            id={FECHA_ADQUISICION}
            name={FECHA_ADQUISICION}
            label="Fecha de Adquisición"
            control={control}
            defaultValue={null}
            error={errors[FECHA_ADQUISICION]}
            helperText={errors[FECHA_ADQUISICION]?.message}
            required
            disabled={esVisualizacion}
          />
          <FormCampoCalendario
            id={FECHA_ALTA_SISTEMA}
            name={FECHA_ALTA_SISTEMA}
            label="Fecha Alta en Sistema"
            control={control}
            defaultValue={null}
            error={errors[FECHA_ALTA_SISTEMA]}
            helperText={errors[FECHA_ALTA_SISTEMA]?.message}
            required
            disabled={esVisualizacion}
          />
        </>
      )}
      {altaCompraventaJudicial && (
        <>
          <FormCampoEntrada
            id={ESCRITURA_TITULO}
            name={ESCRITURA_TITULO}
            label="Escritura o Título"
            control={control}
            error={errors[ESCRITURA_TITULO]}
            helperText={errors[ESCRITURA_TITULO]?.message}
            disabled={esVisualizacion}
            required
          />
          <FormCampoCalendario
            id={FECHA_ADQUISICION}
            name={FECHA_ADQUISICION}
            label="Fecha de Adquisición"
            control={control}
            defaultValue={null}
            error={errors[FECHA_ADQUISICION]}
            helperText={errors[FECHA_ADQUISICION]?.message}
            required
            disabled={esVisualizacion}
          />
          <FormCampoCalendario
            id={FECHA_ALTA_SISTEMA}
            name={FECHA_ALTA_SISTEMA}
            label="Fecha Alta en Sistema"
            control={control}
            defaultValue={null}
            error={errors[FECHA_ALTA_SISTEMA]}
            helperText={errors[FECHA_ALTA_SISTEMA]?.message}
            required
            disabled={esVisualizacion}
          />
        </>
      )}
      {altaExpropiacion && (
        <>
          <FormCampoEntrada
            id={DECRETO_PUBLICACION}
            name={DECRETO_PUBLICACION}
            label="Decreto o Publicación"
            control={control}
            error={errors[DECRETO_PUBLICACION]}
            helperText={errors[DECRETO_PUBLICACION]?.message}
            disabled={esVisualizacion}
            required
          />
          <FormCampoCalendario
            id={FECHA_ADQUISICION}
            name={FECHA_ADQUISICION}
            label="Fecha de Adquisición"
            control={control}
            defaultValue={null}
            error={errors[FECHA_ADQUISICION]}
            helperText={errors[FECHA_ADQUISICION]?.message}
            required
            disabled={esVisualizacion}
          />
          <FormCampoCalendario
            id={FECHA_ALTA_SISTEMA}
            name={FECHA_ALTA_SISTEMA}
            label="Fecha Alta en Sistema"
            control={control}
            defaultValue={null}
            error={errors[FECHA_ALTA_SISTEMA]}
            helperText={errors[FECHA_ALTA_SISTEMA]?.message}
            required
            disabled={esVisualizacion}
          />
        </>
      )}
      {altaInscripcionPrimitiva && (
        <>
          <FormCampoEntrada
            id={ESCRITURA_TITULO}
            name={ESCRITURA_TITULO}
            label="Escritura o Título"
            control={control}
            error={errors[ESCRITURA_TITULO]}
            helperText={errors[ESCRITURA_TITULO]?.message}
            disabled={esVisualizacion}
            required
          />
          <FormCampoCalendario
            id={FECHA_ADQUISICION}
            name={FECHA_ADQUISICION}
            label="Fecha de Adquisición"
            control={control}
            defaultValue={null}
            error={errors[FECHA_ADQUISICION]}
            helperText={errors[FECHA_ADQUISICION]?.message}
            required
            disabled={esVisualizacion}
          />
          <FormCampoCalendario
            id={FECHA_ALTA_SISTEMA}
            name={FECHA_ALTA_SISTEMA}
            label="Fecha Alta en Sistema"
            control={control}
            defaultValue={null}
            error={errors[FECHA_ALTA_SISTEMA]}
            helperText={errors[FECHA_ALTA_SISTEMA]?.message}
            required
            disabled={esVisualizacion}
          />
        </>
      )}
      <FormCampoEntrada
        id={VALOR_HISTORICO}
        name={VALOR_HISTORICO}
        label="Valor Histórico"
        type="number"
        defaultValue=".00"
        control={control}
        error={errors[VALOR_HISTORICO]}
        helperText={errors[VALOR_HISTORICO]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoEntrada
        id={CAMPOS_ALTA_INMUEBLE.VALOR_LIBROS}
        name={CAMPOS_ALTA_INMUEBLE.VALOR_LIBROS}
        label="Valor Libros"
        type="number"
        defaultValue=".00"
        control={control}
        error={errors[CAMPOS_ALTA_INMUEBLE.VALOR_LIBROS]}
        helperText={errors[CAMPOS_ALTA_INMUEBLE.VALOR_LIBROS]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoEntrada
        id={CAMPOS_ALTA_INMUEBLE.DEPRECIACION}
        name={CAMPOS_ALTA_INMUEBLE.DEPRECIACION}
        label="Depreciación"
        type="number"
        defaultValue=".00"
        control={control}
        error={errors[CAMPOS_ALTA_INMUEBLE.DEPRECIACION]}
        helperText={errors[CAMPOS_ALTA_INMUEBLE.DEPRECIACION]?.message}
        disabled={esVisualizacion}
        required
      />
      <FormCampoEntrada
        id={ANIOS_VIDA_UTIL}
        name={ANIOS_VIDA_UTIL}
        label="Vida Útil (Años)"
        type="number"
        control={control}
        error={errors[ANIOS_VIDA_UTIL]}
        helperText={errors[ANIOS_VIDA_UTIL]?.message}
        disabled={esVisualizacion}
        required
      />
    </>
  );
};

export default AdministradorInmuebleAltaInfoInmuebleForm;
