import { useState } from "react";
import FormCampoEntrada from "../../../../../utils/FormCampoEntrada";
import FormCampoCalendario from "../../../../../utils/FormCampoCalendario";
import FormCampoAutocompletar from "../../../../../utils/FormCampoAutocompletar";
import { CAMPOS_MODIFICACION_MUEBLE } from "../../../../../../settings/formConfig";
import ItemInfoExtraAutocompletar from "../../../../../utils/ItemInfoExtraAutocompletar";
import { stringToIDs, stringToRow } from "../../../../../../settings/utils";
import dayjs from "dayjs";

const AdministradorMuebleModificacionDatoGeneralForm = ({
  formManager = null,
  esVisualizacion = false,
  solicitudSeleccionada = 0,
  complementos = {},
  setCargando = null,
  esModificacionFactura = false,
}) => {
  const {
    SOLICITUD,
    BIEN,
    FOLIO_BIEN,
    CENTRO_COSTO,
    PARTIDA,
    PARTIDA_ESPECIFICA,
    CUENTA_ACTIVO,
    CUENTA_ACTUALIZACION,
    TIPO_BIEN,
    FAMILIA,
    SUBFAMILIA,
    BMS,
    DESCRIPCION,
    UNIDAD_ADMINISTRATIVA,
    REQUISICION,
    ORDEN_COMPRA,
    TIPO_ADQUISICION,
    NO_SERIES,
    FOLIO_ANTERIOR,
    NO_LICITACION,
    FECHA_LICITACION,
    OBSERVACION_LICITACION,
  } = CAMPOS_MODIFICACION_MUEBLE;
  const { control, formState, setValue, reset, getValues } = formManager;
  const { errors } = formState;
  const {
    familias,
    subfamilias,
    bms,
    bienes,
    unidadesAdministrativas,
    tiposAdquisicion,
    responsables,
    caracteristicas,
    estadosFisicos,
    marcas,
    colores,
    ubicaciones,
    municipios,
  } = complementos;
  const [bienesXUnidadAdministrativa, setBienesXUnidadAdministrativa] =
    useState([]);

  const restaurarEstadoAntesUnidadAdministrativa = () => {
    const valoresActuales = getValues();
    reset({
      [SOLICITUD]: valoresActuales[SOLICITUD],
      [TIPO_BIEN]: valoresActuales[TIPO_BIEN],
    });
  };

  const restaurarEstadoAntesBien = () => {
    const valoresActuales = getValues();
    reset({
      [SOLICITUD]: valoresActuales[SOLICITUD],
      [TIPO_BIEN]: valoresActuales[TIPO_BIEN],
      [UNIDAD_ADMINISTRATIVA]: valoresActuales[UNIDAD_ADMINISTRATIVA],
    });
  };

  const changeUnidadAdministrativa = (unidadAdministrativa) => {
    if (!unidadAdministrativa) {
      setBienesXUnidadAdministrativa([]);
      restaurarEstadoAntesUnidadAdministrativa();
      return;
    }
    const bienesFiltrados = bienes.filter(
      (bien) => bien.nivelUnidadAdministrativa === unidadAdministrativa.id
    );
    setBienesXUnidadAdministrativa(bienesFiltrados);
    restaurarEstadoAntesBien();
  };

  const changeBien = (bien) => {
    setCargando(true);
    if (!bien) {
      setCargando(false);
      restaurarEstadoAntesBien();
      return;
    }
    const idsCaracteristicas = stringToIDs(bien.caracteristicas, "folio");
    const caracteristicasSelect = caracteristicas.filter((e) =>
      idsCaracteristicas.includes(e.id)
    );
    const filasTabla = stringToRow(bien.caracteristicas);
    const idsResponsables = bien.responsables.split(",").map((e) => Number(e));
    const responsablesSelect = responsables.filter((e) =>
      idsResponsables.includes(e.id)
    );

    setValue(
      CAMPOS_MODIFICACION_MUEBLE.CENTRO_COSTO,
      unidadesAdministrativas.find(
        (e) => e.id === bien.nivelUnidadAdministrativa
      )
    );
    setValue(CAMPOS_MODIFICACION_MUEBLE.PARTIDA, bien.partida ?? "");
    setValue(
      CAMPOS_MODIFICACION_MUEBLE.PARTIDA_ESPECIFICA,
      bien.partidaEspecifica ?? ""
    );
    setValue(
      CAMPOS_MODIFICACION_MUEBLE.CUENTA_ACTIVO,
      bien.referenciaActivo ?? ""
    );
    setValue(
      CAMPOS_MODIFICACION_MUEBLE.CUENTA_ACTUALIZACION,
      bien.referenciaActualizacion ?? ""
    );
    setValue(CAMPOS_MODIFICACION_MUEBLE.FOLIO_BIEN, bien.folioBien);
    setValue(
      CAMPOS_MODIFICACION_MUEBLE.FAMILIA,
      familias.find((e) => e.id === bien.idFamilia)
    );
    setValue(
      CAMPOS_MODIFICACION_MUEBLE.SUBFAMILIA,
      subfamilias.find((e) => e.id === bien.idSubfamilia)
    );
    setValue(
      CAMPOS_MODIFICACION_MUEBLE.BMS,
      bms.find((e) => e.id === bien.idBms)
    );
    setValue(CAMPOS_MODIFICACION_MUEBLE.DESCRIPCION, bien.descripcion ?? "");
    setValue(
      CAMPOS_MODIFICACION_MUEBLE.UNIDAD_ADMINISTRATIVA,
      unidadesAdministrativas.find(
        (e) => e.id === bien.nivelUnidadAdministrativa
      )
    );
    setValue(CAMPOS_MODIFICACION_MUEBLE.REQUISICION, bien.requisicion ?? "");
    setValue(CAMPOS_MODIFICACION_MUEBLE.ORDEN_COMPRA, bien.ordenCompra ?? "");
    setValue(
      CAMPOS_MODIFICACION_MUEBLE.TIPO_ADQUISICION,
      tiposAdquisicion.find((e) => e.id === bien.idTipoAdquisicion)
    );
    setValue(CAMPOS_MODIFICACION_MUEBLE.NO_SERIES, bien.noSeries ?? "");
    setValue(
      CAMPOS_MODIFICACION_MUEBLE.FOLIO_ANTERIOR,
      bien.folioAnterior ?? ""
    );
    setValue(CAMPOS_MODIFICACION_MUEBLE.NO_LICITACION, bien.noLicitacion ?? "");
    setValue(
      CAMPOS_MODIFICACION_MUEBLE.FECHA_LICITACION,
      bien.fechaLicitacion ? dayjs(bien.fechaLicitacion) : null
    );
    setValue(
      CAMPOS_MODIFICACION_MUEBLE.OBSERVACION_LICITACION,
      bien.observacionLicitacion
    );
    setValue(
      CAMPOS_MODIFICACION_MUEBLE.ESTADO_FISICO,
      estadosFisicos.find((e) => e.id === bien.idEstadoFisico)
    );
    setValue(
      CAMPOS_MODIFICACION_MUEBLE.MARCA,
      marcas.find((e) => e.id === bien.idMarca)
    );
    setValue(
      CAMPOS_MODIFICACION_MUEBLE.COLOR,
      colores.find((e) => e.id === bien.idColor)
    );
    setValue(CAMPOS_MODIFICACION_MUEBLE.FOLIO_FACTURA, bien.folioFactura ?? "");
    setValue(
      CAMPOS_MODIFICACION_MUEBLE.FECHA_FACTURA,
      dayjs(bien.fechaFactura)
    );
    setValue(
      CAMPOS_MODIFICACION_MUEBLE.PRECIO_UNITARIO,
      bien.precioUnitario ?? ""
    );
    setValue(CAMPOS_MODIFICACION_MUEBLE.FECHA_COMPRA, dayjs(bien.fechaCompra));
    setValue(CAMPOS_MODIFICACION_MUEBLE.DIAS_GARANTIA, bien.diasGarantia ?? "");
    setValue(CAMPOS_MODIFICACION_MUEBLE.VIDA_UTIL, bien.vidaUtil ?? "");
    setValue(
      CAMPOS_MODIFICACION_MUEBLE.FECHA_INICIO_USO,
      dayjs(bien.fechaInicioUso)
    );
    setValue(
      CAMPOS_MODIFICACION_MUEBLE.PRECIO_DESECHABLE,
      bien.precioDesechable ?? ""
    );
    setValue(
      CAMPOS_MODIFICACION_MUEBLE.OBSERVACION_BIEN,
      bien.observacionBien ?? ""
    );
    setValue(
      CAMPOS_MODIFICACION_MUEBLE.UBICACION,
      ubicaciones.find((e) => e.id === bien.idUbicacion)
    );
    setValue(
      CAMPOS_MODIFICACION_MUEBLE.MUNICIPIO,
      municipios.find((e) => e.id === bien.idMunicipio)
    );
    setValue(CAMPOS_MODIFICACION_MUEBLE.CARACTERISTICAS, caracteristicasSelect);
    setValue(CAMPOS_MODIFICACION_MUEBLE.AUX_CARACTERISTICA, filasTabla);
    setValue(CAMPOS_MODIFICACION_MUEBLE.RESPONSABLES, responsablesSelect);
    setValue(
      CAMPOS_MODIFICACION_MUEBLE.OBSERVACION_RESPONSABLE,
      bien.observacionResponsable ?? ""
    );
    setCargando(false);
  };

  return (
    <>
      <FormCampoEntrada
        id={SOLICITUD}
        name={SOLICITUD}
        label="Folio Solicitud"
        control={control}
        type="number"
        defaultValue={solicitudSeleccionada}
        required
        disabled
      />
      <FormCampoAutocompletar
        id={UNIDAD_ADMINISTRATIVA}
        name={UNIDAD_ADMINISTRATIVA}
        label="Unidad Administrativa"
        control={control}
        options={unidadesAdministrativas}
        handleOnChange={changeUnidadAdministrativa}
        error={errors[UNIDAD_ADMINISTRATIVA]}
        helperText={errors[UNIDAD_ADMINISTRATIVA]?.message}
        disabled={esVisualizacion}
      />
      <FormCampoAutocompletar
        id={BIEN}
        name={BIEN}
        label="Bien Mueble"
        control={control}
        options={bienesXUnidadAdministrativa}
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
      <FormCampoEntrada
        id={FOLIO_BIEN}
        name={FOLIO_BIEN}
        label="Folio Bien"
        control={control}
        required
        disabled
      />
      <FormCampoEntrada
        id={TIPO_BIEN}
        name={TIPO_BIEN}
        label="Tipo de Bien"
        control={control}
        defaultValue="BIENES MUEBLES"
        required
        disabled
      />
      <FormCampoAutocompletar
        id={FAMILIA}
        name={FAMILIA}
        label="Familia"
        control={control}
        options={familias}
        error={errors[FAMILIA]}
        helperText={errors[FAMILIA]?.message}
        disabled
        required
      />
      <FormCampoAutocompletar
        id={SUBFAMILIA}
        name={SUBFAMILIA}
        label="Sub Familia"
        control={control}
        options={subfamilias}
        error={errors[SUBFAMILIA]}
        helperText={errors[SUBFAMILIA]?.message}
        disabled
        required
      />
      <FormCampoAutocompletar
        id={BMS}
        name={BMS}
        label="Folio BMS"
        control={control}
        renderOption={ItemInfoExtraAutocompletar}
        getOptionLabel={(option) => `${option.id} - ${option.name}`}
        isOptionEqualToValue={(option, value) =>
          option.id === value.id ||
          option.name === value.name ||
          option.infoExtra === value.infoExtra
        }
        options={bms}
        error={errors[BMS]}
        helperText={errors[BMS]?.message}
        disabled
        required
      />
      {esVisualizacion && (
        <>
          <FormCampoEntrada
            id={PARTIDA}
            name={PARTIDA}
            label="Partida"
            control={control}
            required
            disabled
          />
          <FormCampoEntrada
            id={PARTIDA_ESPECIFICA}
            name={PARTIDA_ESPECIFICA}
            label="Partida Especifica"
            control={control}
            required
            disabled
          />
          <FormCampoEntrada
            id={CUENTA_ACTIVO}
            name={CUENTA_ACTIVO}
            label="Cuenta Activo"
            control={control}
            required
            disabled
          />
          <FormCampoEntrada
            id={CUENTA_ACTUALIZACION}
            name={CUENTA_ACTUALIZACION}
            label="Cuenta Actualización"
            control={control}
            required
            disabled
          />
        </>
      )}
      <FormCampoEntrada
        id={DESCRIPCION}
        name={DESCRIPCION}
        label="Descripción"
        control={control}
        error={errors[DESCRIPCION]}
        helperText={errors[DESCRIPCION]?.message}
        disabled={esVisualizacion || esModificacionFactura}
        required
      />
      <FormCampoAutocompletar
        id={CENTRO_COSTO}
        name={CENTRO_COSTO}
        label="Centro de Costo"
        control={control}
        options={unidadesAdministrativas}
        error={errors[CENTRO_COSTO]}
        helperText={errors[CENTRO_COSTO]?.message}
        disabled
        required
      />
      <FormCampoEntrada
        id={REQUISICION}
        name={REQUISICION}
        label="Requisición"
        control={control}
        error={errors[REQUISICION]}
        helperText={errors[REQUISICION]?.message}
        disabled={esVisualizacion || esModificacionFactura}
      />
      <FormCampoEntrada
        id={ORDEN_COMPRA}
        name={ORDEN_COMPRA}
        label="Orden de Compra"
        control={control}
        error={errors[ORDEN_COMPRA]}
        helperText={errors[ORDEN_COMPRA]?.message}
        disabled={esVisualizacion || esModificacionFactura}
      />
      <FormCampoAutocompletar
        id={TIPO_ADQUISICION}
        name={TIPO_ADQUISICION}
        label="Tipo de Adquisición"
        control={control}
        options={tiposAdquisicion}
        error={errors[TIPO_ADQUISICION]}
        helperText={errors[TIPO_ADQUISICION]?.message}
        disabled={esVisualizacion || esModificacionFactura}
        required
      />
      <FormCampoEntrada
        id={NO_SERIES}
        name={NO_SERIES}
        label="No. Serie"
        control={control}
        error={errors[NO_SERIES]}
        helperText={errors[NO_SERIES]?.message}
        disabled={esVisualizacion || esModificacionFactura}
        required
      />
      <FormCampoEntrada
        id={FOLIO_ANTERIOR}
        name={FOLIO_ANTERIOR}
        label="Folio Anterior"
        control={control}
        error={errors[FOLIO_ANTERIOR]}
        helperText={errors[FOLIO_ANTERIOR]?.message}
        disabled={esVisualizacion || esModificacionFactura}
      />
      <FormCampoEntrada
        id={NO_LICITACION}
        name={NO_LICITACION}
        label="No.Licitacion"
        type="number"
        control={control}
        error={errors[NO_LICITACION]}
        helperText={errors[NO_LICITACION]?.message}
        disabled={esVisualizacion || esModificacionFactura}
      />
      <FormCampoCalendario
        id={FECHA_LICITACION}
        name={FECHA_LICITACION}
        label="Fecha de Licitación"
        control={control}
        defaultValue={null}
        error={errors[FECHA_LICITACION]}
        helperText={errors[FECHA_LICITACION]?.message}
        disabled={esVisualizacion || esModificacionFactura}
      />
      <FormCampoEntrada
        id={OBSERVACION_LICITACION}
        name={OBSERVACION_LICITACION}
        label="Observación de la Licitación"
        control={control}
        error={errors[OBSERVACION_LICITACION]}
        helperText={errors[OBSERVACION_LICITACION]?.message}
        disabled={esVisualizacion || esModificacionFactura}
      />
    </>
  );
};

export default AdministradorMuebleModificacionDatoGeneralForm;
