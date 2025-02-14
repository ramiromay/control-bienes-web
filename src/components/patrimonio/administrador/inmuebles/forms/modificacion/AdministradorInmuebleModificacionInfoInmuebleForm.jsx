import React, { useState } from "react";
import FormCampoEntrada from "../../../../../utils/FormCampoEntrada";
import {
  CAMPOS_ALTA_INMUEBLE,
  CAMPOS_MODIFICACION_INMUEBLE,
} from "../../../../../../settings/formConfig";
import FormCampoAutocompletar from "../../../../../utils/FormCampoAutocompletar";
import { MOTIVO_TRAMITE } from "../../../../../../settings/sistemaConfig";
import FormCampoCalendario from "../../../../../utils/FormCampoCalendario";
import dayjs from "dayjs";

const AdministradorInmuebleModificacionInfoInmuebleForm = ({
  formManager = null,
  esVisualizacion = false,
  complementos = {},
  informacionTablaSuperior = {},
  setCargando = () => {},
  setMotivoTramite = () => {},
  idMotivoTramite = 0,
  esModificacionDeDatos = false,
  esModificacionMedidas = false,
  esModificacionPorConstruccion = false,
  esModificacionPorMejoras = false,
  esModificacionPorAfectacion = false,
  esModificacion = false,
}) => {
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
    BIEN,
    ANIOS_VIDA_UTIL,
    FECHA_ALTA_SISTEMA,
  } = CAMPOS_MODIFICACION_INMUEBLE;
  const { control, formState, setValue } = formManager;
  const { errors } = formState;
  const {
    bienes,
    familias,
    subfamilias,
    tiposInmuebles,
    usosInmuebles,
    tiposDominios,
    estadosFisicos,
    tiposAfectacion,
    tiposAdquisicion,
    clasificacionConac,
    municipios,
    origenesValor,
  } = complementos;
  const [subfamiliasXFamilia, setSubfamiliasXFamilia] = useState([]);

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

  const restaurarEstadoAntesBien = () => {
    const camposNoNull = [
      "ID_SOLICITUD",
      "SECRETARIA",
      "DIRECCION",
      "DEPARTAMENTO",
    ];
    Object.keys(CAMPOS_MODIFICACION_INMUEBLE)
      .filter((campo) => !camposNoNull.includes(campo))
      .forEach((campo) => {
        setValue(CAMPOS_MODIFICACION_INMUEBLE[campo], null);
      });
  };

  const changeBien = (bien) => {
    setCargando(true);
    if (!bien) {
      restaurarEstadoAntesBien();
      setMotivoTramite(0);
      setCargando(false);
      return;
    }
    setValue(CAMPOS_MODIFICACION_INMUEBLE.VALOR_LIBROS, bien.valorLibros);
    setValue(CAMPOS_MODIFICACION_INMUEBLE.VALOR_HISTORICO, bien.valorHistorico);
    setValue(CAMPOS_MODIFICACION_INMUEBLE.DEPRECIACION, bien.depreciacion);
    setValue(CAMPOS_MODIFICACION_INMUEBLE.ANIOS_VIDA_UTIL, bien.aniosVida);
    setValue(
      CAMPOS_MODIFICACION_INMUEBLE.REFERENCIA_CONAC,
      clasificacionConac.find((e) => e.id === bien.referenciaConac) ?? null
    );
    setValue(
      CAMPOS_MODIFICACION_INMUEBLE.MUNICIPIO,
      municipios.find((e) => e.id === bien.idMunicipio) ?? null
    );
    setValue(
      CAMPOS_MODIFICACION_INMUEBLE.ID_FAMILIA,
      familias.find((familia) => familia.id === bien.idFamilia) ?? null
    );
    setValue(
      CAMPOS_MODIFICACION_INMUEBLE.ID_SUBFAMILIA,
      subfamilias.find((subfamilia) => subfamilia.id === bien.idSubfamilia) ??
        null
    );
    setValue(CAMPOS_MODIFICACION_INMUEBLE.NOMENCLATURA, bien.nomenclatura);
    setValue(CAMPOS_MODIFICACION_INMUEBLE.DESCRIPCION, bien.descripcion);
    setValue(
      CAMPOS_MODIFICACION_INMUEBLE.ID_TIPO_INMUEBLE,
      tiposInmuebles.find(
        (tipoInmueble) => tipoInmueble.id === bien.idTipoInmueble
      ) ?? null
    );
    setValue(
      CAMPOS_MODIFICACION_INMUEBLE.ID_USO_INMUEBLE,
      usosInmuebles.find(
        (usoInmueble) => usoInmueble.id === bien.idUsoInmueble
      ) ?? null
    );
    setValue(
      CAMPOS_MODIFICACION_INMUEBLE.ID_TIPO_DOMINIO,
      tiposDominios.find(
        (tipoDominio) => tipoDominio.id === bien.idTipoDominio
      ) ?? null
    );
    setValue(
      CAMPOS_MODIFICACION_INMUEBLE.ID_ESTADO_FISICO,
      estadosFisicos.find(
        (estadoFisico) => estadoFisico.id === bien.idEstadoFisico
      ) ?? null
    );
    setValue(
      CAMPOS_MODIFICACION_INMUEBLE.ID_TIPO_AFECTACION,
      tiposAfectacion.find(
        (tipoAfectacion) => tipoAfectacion.id === bien.idTipoAfectacion
      ) ?? null
    );
    setValue(CAMPOS_MODIFICACION_INMUEBLE.AFECTANTE, bien.afectante);
    setValue(
      CAMPOS_MODIFICACION_INMUEBLE.ID_TIPO_ADQUISICION,
      tiposAdquisicion.find(
        (tipoAdquisicion) => tipoAdquisicion.id === bien.idTipoAdquisicion
      ) ?? null
    );
    setValue(
      CAMPOS_MODIFICACION_INMUEBLE.DECRETO_PUBLICACION,
      bien.decretoPublicaicion
    );
    setValue(
      CAMPOS_MODIFICACION_INMUEBLE.ESCRITURA_TITULO,
      bien.escrituraTitulo
    );
    setValue(
      CAMPOS_MODIFICACION_INMUEBLE.FECHA_ADQUISICION,
      bien.fechaAdquisicion ? dayjs(bien.fechaAdquisicion) : null
    );
    setValue(
      CAMPOS_MODIFICACION_INMUEBLE.FECHA_ALTA_SISTEMA,
      bien.fechaAltaSistema ? dayjs(bien.fechaAltaSistema) : null
    );
    setValue(CAMPOS_MODIFICACION_INMUEBLE.EXPEDIENTE, bien.expediente);
    setValue(CAMPOS_MODIFICACION_INMUEBLE.FOLIO_CATASTRO, bien.folioCatastro);
    setValue(CAMPOS_MODIFICACION_INMUEBLE.CALLE, bien.calle);
    setValue(CAMPOS_MODIFICACION_INMUEBLE.SUPERFICIE, bien.superficie);
    setValue(CAMPOS_MODIFICACION_INMUEBLE.VALOR_TERRENO, bien.valorTerreno);

    setValue(CAMPOS_MODIFICACION_INMUEBLE.NUMERO_EXTERIOR, bien.numeroExterior);
    setValue(CAMPOS_MODIFICACION_INMUEBLE.NUMERO_INTERIOR, bien.numeroInterior);
    setValue(CAMPOS_MODIFICACION_INMUEBLE.CRUZAMIENTO_1, bien.cruzamiento1);
    setValue(CAMPOS_MODIFICACION_INMUEBLE.CRUZAMIENTO_2, bien.cruzamiento2);
    setValue(
      CAMPOS_MODIFICACION_INMUEBLE.SUPERFICIE_CONSTRUCCION,
      bien.superficieConstruccion
    );
    setValue(CAMPOS_MODIFICACION_INMUEBLE.TABLAJE, bien.tablaje);
    setValue(
      CAMPOS_MODIFICACION_INMUEBLE.VALOR_CONSTRUCCION,
      bien.valorConstruccion
    );
    setValue(CAMPOS_MODIFICACION_INMUEBLE.VALOR_INICIAL, bien.valorInicial);
    setValue(CAMPOS_MODIFICACION_INMUEBLE.CODIGO_POSTAL, bien.codigoPostal);
    setValue(
      CAMPOS_MODIFICACION_INMUEBLE.ID_ORIGEN_VALOR,
      origenesValor.find(
        (origenValor) => origenValor.id === bien.idOrigenValor
      ) ?? null
    );
    setValue(CAMPOS_MODIFICACION_INMUEBLE.ASENTAMIENTO, bien.asentamiento);
    setValue(CAMPOS_MODIFICACION_INMUEBLE.PROPIETARIO, bien.propietario);
    setValue(
      CAMPOS_MODIFICACION_INMUEBLE.OBSERVACION_INMUEBLE,
      bien.observacionBien
    );
    setValue(
      CAMPOS_MODIFICACION_INMUEBLE.OBSERVACION_SUPERVISION,
      bien.observacionResponsable
    );
    setMotivoTramite(bien.idMotivoTramite);
    setCargando(false);
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
        id={BIEN}
        name={BIEN}
        label="Bien Inmueble"
        control={control}
        options={bienes}
        handleOnChange={changeBien}
        getOptionLabel={(option) =>
          `${option.folioBien} - ${option.descripcion}`
        }
        isOptionEqualToValue={(option, value) =>
          option.folioBien === value.folioBien &&
          option.descripcion === value.descripcion
        }
        error={errors[BIEN]}
        helperText={errors[BIEN]?.message}
        disabled={esVisualizacion}
        required
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
        disabled={esVisualizacion || !esModificacionDeDatos}
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
        disabled={esVisualizacion || !esModificacionDeDatos}
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
        disabled={esVisualizacion || !esModificacionDeDatos}
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
        disabled={esVisualizacion || !esModificacionDeDatos}
      />
      <FormCampoEntrada
        id={DESCRIPCION}
        name={DESCRIPCION}
        label="Descripción"
        control={control}
        required
        error={errors[DESCRIPCION]}
        helperText={errors[DESCRIPCION]?.message}
        disabled={esVisualizacion || !esModificacionDeDatos}
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
        disabled={
          esVisualizacion ||
          (!esModificacionDeDatos && !esModificacionPorAfectacion)
        }
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
        disabled={
          esVisualizacion ||
          (!esModificacionDeDatos &&
            !esModificacionPorAfectacion &&
            !esModificacionPorConstruccion &&
            !esModificacionPorMejoras)
        }
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
        disabled={
          esVisualizacion ||
          (!esModificacionDeDatos && !esModificacionPorAfectacion)
        }
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
        disabled={esVisualizacion || !esModificacionDeDatos}
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
        disabled={esVisualizacion || !esModificacionPorAfectacion}
      />
      <FormCampoEntrada
        id={AFECTANTE}
        name={AFECTANTE}
        label="Afectante"
        control={control}
        error={errors[AFECTANTE]}
        helperText={errors[AFECTANTE]?.message}
        disabled={esVisualizacion || !esModificacionPorAfectacion}
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
        disabled={esVisualizacion || esModificacion}
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
            disabled={esVisualizacion || esModificacion}
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
            disabled={esVisualizacion || esModificacion}
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
            disabled={esVisualizacion || esModificacion}
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
            disabled={esVisualizacion || esModificacion}
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
            disabled={esVisualizacion || esModificacion}
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
            disabled={esVisualizacion || esModificacion}
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
            disabled={esVisualizacion || esModificacion}
            required
          />
          <FormCampoEntrada
            id={EXPEDIENTE}
            name={EXPEDIENTE}
            label="Expediente de Origen"
            control={control}
            error={errors[EXPEDIENTE]}
            helperText={errors[EXPEDIENTE]?.message}
            disabled={esVisualizacion || esModificacion}
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
            disabled={esVisualizacion || esModificacion}
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
            disabled={esVisualizacion || esModificacion}
            required
          />
          <FormCampoEntrada
            id={EXPEDIENTE}
            name={EXPEDIENTE}
            label="Expediente Permutado"
            control={control}
            error={errors[EXPEDIENTE]}
            helperText={errors[EXPEDIENTE]?.message}
            disabled={esVisualizacion || esModificacion}
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
            disabled={esVisualizacion || esModificacion}
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
            disabled={esVisualizacion || esModificacion}
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
            disabled={esVisualizacion || esModificacion}
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
            disabled={esVisualizacion || esModificacion}
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
            disabled={esVisualizacion || esModificacion}
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
            disabled={esVisualizacion || esModificacion}
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
            disabled={esVisualizacion || esModificacion}
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
            disabled={esVisualizacion || esModificacion}
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
            disabled={esVisualizacion || esModificacion}
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
            disabled={esVisualizacion || esModificacion}
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
            disabled={esVisualizacion || esModificacion}
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
            disabled={esVisualizacion || esModificacion}
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
            disabled={esVisualizacion || esModificacion}
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
        disabled={esVisualizacion || esModificacion}
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
        disabled={esVisualizacion || esModificacion}
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
        disabled={esVisualizacion || esModificacion}
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
        disabled={
          esVisualizacion ||
          (!esModificacionMedidas &&
            !esModificacionPorConstruccion &&
            !esModificacionPorMejoras)
        }
        required
      />
    </>
  );
};

export default AdministradorInmuebleModificacionInfoInmuebleForm;
