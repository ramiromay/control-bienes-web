import { useState } from "react";
import FormCampoEntrada from "../../../../../utils/FormCampoEntrada";
import FormCampoCalendario from "../../../../../utils/FormCampoCalendario";
import FormCampoAutocompletar from "../../../../../utils/FormCampoAutocompletar";
import { CAMPOS_MODIFICACION_VEHICULO } from "../../../../../../settings/formConfig";
import ItemInfoExtraAutocompletar from "../../../../../utils/ItemInfoExtraAutocompletar";
import dayjs from "dayjs";
import { stringToIDs, stringToRow } from "../../../../../../settings/utils";

const AdministradorVehiculoModificacionDatoBienForm = ({
  formManager = null,
  esVisualizacion = false,
  solicitudSeleccionada = 0,
  complementos = {},
  setCargando = null,
  esModificacionFactura = false,
}) => {
  const {
    SOLICITUD,
    TIPO_BIEN,
    FAMILIA,
    SUBFAMILIA,
    BMS,
    PARTIDA,
    PARTIDA_ESPECIFICA,
    CUENTA_ACTIVO,
    CUENTA_ACTUALIZACION,
    DESCRIPCION,
    UNIDAD_ADMINISTRATIVA,
    REQUISICION,
    ORDEN_COMPRA,
    TIPO_ADQUISICION,
    FOLIO_ANTERIOR,
    CUENTA_POR_PAGAR,
    SUSTITUYE_BV,
    MUNICIPIO,
    UBICACION,
    PRECIO_DESECHABLE,
    PRECIO_UNITARIO,
    FECHA_INICIO_USO,
    VIDA_UTIL,
    BIEN,
    FOLIO_BIEN,
    CENTRO_COSTO,
    MOTIVO_TRAMITE,
  } = CAMPOS_MODIFICACION_VEHICULO;
  const { control, formState, setValue, reset, getValues } = formManager;
  const { errors } = formState;
  const {
    familias,
    subfamilias,
    bms,
    unidadesAdministrativas,
    tiposAdquisicion,
    bienes,
    responsables,
    caracteristicas,
    estadosFisicos,
    marcas,
    colores,
    ubicaciones,
    municipios,
    clases,
    claves,
    combustibles,
    lineas,
    tipos,
    versiones,
  } = complementos;
  const [bienesXUnidadAdministrativa, setBienesXUnidadAdministrativa] =
    useState([]);

  const restaurarEstadoAntesUnidadAdministrativa = () => {
    const valoresActuales = getValues();

    reset({
      [MOTIVO_TRAMITE]: valoresActuales[MOTIVO_TRAMITE],
      [SOLICITUD]: valoresActuales[SOLICITUD],
      [TIPO_BIEN]: valoresActuales[TIPO_BIEN],
    });
  };

  const restaurarEstadoAntesBien = () => {
    const valoresActuales = getValues();
    reset({
      [MOTIVO_TRAMITE]: valoresActuales[MOTIVO_TRAMITE],
      [SOLICITUD]: valoresActuales[SOLICITUD],
      [TIPO_BIEN]: valoresActuales[TIPO_BIEN],
      [UNIDAD_ADMINISTRATIVA]: valoresActuales[UNIDAD_ADMINISTRATIVA],
    });
  };

  const changeUnidadAdministrativa = (unidadAdministrativa) => {
    console.log(unidadAdministrativa);
    console.log(getValues());
    if (!unidadAdministrativa) {
      restaurarEstadoAntesUnidadAdministrativa();
      setBienesXUnidadAdministrativa([]);
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
    console.log(bien);
    setValue(CAMPOS_MODIFICACION_VEHICULO.FOLIO_BIEN, bien.folioBien ?? "");
    setValue(
      CAMPOS_MODIFICACION_VEHICULO.CUENTA_POR_PAGAR,
      bien.cuentaPorPagar ?? ""
    );
    console.log(bien.sustituyeBv);
    setValue(CAMPOS_MODIFICACION_VEHICULO.SUSTITUYE_BV, bien.sustituyeBv);
    setValue(CAMPOS_MODIFICACION_VEHICULO.ANIO_EMICION, bien.anioEmicion);
    setValue(CAMPOS_MODIFICACION_VEHICULO.NUMERO_PLACA, bien.numeroPlaca);
    setValue(CAMPOS_MODIFICACION_VEHICULO.NUMERO_MOTOR, bien.numeroMotor);
    setValue(CAMPOS_MODIFICACION_VEHICULO.ANIO_MODELO, bien.anioModelo);
    setValue(
      CAMPOS_MODIFICACION_VEHICULO.NUMERO_ECONOMICO,
      bien.numeroEconomico ?? ""
    );
    setValue(
      CAMPOS_MODIFICACION_VEHICULO.ID_CLAVE,
      claves.find((e) => e.id === bien.idClave)
    );
    setValue(
      CAMPOS_MODIFICACION_VEHICULO.ID_LINEA,
      lineas.find((e) => e.id === bien.idLinea)
    );
    setValue(
      CAMPOS_MODIFICACION_VEHICULO.ID_VERSION,
      versiones.find((e) => e.id === bien.idVersion)
    );
    setValue(
      CAMPOS_MODIFICACION_VEHICULO.ID_CLASE,
      clases.find((e) => e.id === bien.idClase)
    );
    setValue(
      CAMPOS_MODIFICACION_VEHICULO.ID_TIPO,
      tipos.find((e) => e.id === bien.idTipo)
    );
    setValue(
      CAMPOS_MODIFICACION_VEHICULO.ID_COMBUSTIBLE,
      combustibles.find((e) => e.id === bien.idCombustible)
    );

    setValue(
      CAMPOS_MODIFICACION_VEHICULO.NUMERO_BIENES,
      bien.numeroBienes ?? ""
    );
    setValue(CAMPOS_MODIFICACION_VEHICULO.PARTIDA, bien.partida ?? "");
    setValue(
      CAMPOS_MODIFICACION_VEHICULO.PARTIDA_ESPECIFICA,
      bien.partidaEspecifica ?? ""
    );
    setValue(
      CAMPOS_MODIFICACION_VEHICULO.CUENTA_ACTIVO,
      bien.referenciaActivo ?? ""
    );
    setValue(
      CAMPOS_MODIFICACION_VEHICULO.CUENTA_ACTUALIZACION,
      bien.referenciaActualizacion ?? ""
    );
    setValue(
      CAMPOS_MODIFICACION_VEHICULO.FAMILIA,
      familias.find((e) => e.id === bien.idFamilia)
    );
    setValue(
      CAMPOS_MODIFICACION_VEHICULO.SUBFAMILIA,
      subfamilias.find((e) => e.id === bien.idSubfamilia)
    );
    setValue(
      CAMPOS_MODIFICACION_VEHICULO.BMS,
      bms.find((e) => e.id === bien.idBms)
    );
    setValue(CAMPOS_MODIFICACION_VEHICULO.DESCRIPCION, bien.descripcion ?? "");
    setValue(
      CAMPOS_MODIFICACION_VEHICULO.CENTRO_COSTO,
      unidadesAdministrativas.find(
        (e) => e.id === bien.nivelUnidadAdministrativa
      )
    );
    setValue(
      CAMPOS_MODIFICACION_VEHICULO.UNIDAD_ADMINISTRATIVA,
      unidadesAdministrativas.find(
        (e) => e.id === bien.nivelUnidadAdministrativa
      )
    );
    setValue(CAMPOS_MODIFICACION_VEHICULO.REQUISICION, bien.requisicion ?? "");
    setValue(CAMPOS_MODIFICACION_VEHICULO.ORDEN_COMPRA, bien.ordenCompra ?? "");
    setValue(
      CAMPOS_MODIFICACION_VEHICULO.TIPO_ADQUISICION,
      tiposAdquisicion.find((e) => e.id === bien.idTipoAdquisicion)
    );
    setValue(CAMPOS_MODIFICACION_VEHICULO.NO_SERIES, bien.noSeries ?? "");
    setValue(
      CAMPOS_MODIFICACION_VEHICULO.FOLIO_ANTERIOR,
      bien.folioAnterior ?? ""
    );
    setValue(
      CAMPOS_MODIFICACION_VEHICULO.NO_LICITACION,
      bien.noLicitacion ?? ""
    );
    setValue(
      CAMPOS_MODIFICACION_VEHICULO.FECHA_LICITACION,
      bien.fechaLicitacion ? dayjs(bien.fechaLicitacion) : null
    );
    setValue(
      CAMPOS_MODIFICACION_VEHICULO.OBSERVACION_LICITACION,
      bien.observacionLicitacion
    );
    setValue(
      CAMPOS_MODIFICACION_VEHICULO.ESTADO_FISICO,
      estadosFisicos.find((e) => e.id === bien.idEstadoFisico)
    );
    setValue(
      CAMPOS_MODIFICACION_VEHICULO.MARCA,
      marcas.find((e) => e.id === bien.idMarca)
    );
    setValue(
      CAMPOS_MODIFICACION_VEHICULO.COLOR,
      colores.find((e) => e.id === bien.idColor)
    );
    setValue(
      CAMPOS_MODIFICACION_VEHICULO.FOLIO_FACTURA,
      bien.folioFactura ?? ""
    );
    setValue(
      CAMPOS_MODIFICACION_VEHICULO.FECHA_FACTURA,
      dayjs(bien.fechaFactura)
    );
    setValue(
      CAMPOS_MODIFICACION_VEHICULO.PRECIO_UNITARIO,
      bien.precioUnitario ?? ""
    );
    setValue(
      CAMPOS_MODIFICACION_VEHICULO.FECHA_COMPRA,
      dayjs(bien.fechaCompra)
    );
    setValue(
      CAMPOS_MODIFICACION_VEHICULO.DIAS_GARANTIA,
      bien.diasGarantia ?? ""
    );
    setValue(CAMPOS_MODIFICACION_VEHICULO.VIDA_UTIL, bien.vidaUtil ?? "");
    setValue(
      CAMPOS_MODIFICACION_VEHICULO.FECHA_INICIO_USO,
      dayjs(bien.fechaInicioUso)
    );
    setValue(
      CAMPOS_MODIFICACION_VEHICULO.PRECIO_DESECHABLE,
      bien.precioDesechable ?? ""
    );
    setValue(
      CAMPOS_MODIFICACION_VEHICULO.OBSERVACION_BIEN,
      bien.observacionBien ?? ""
    );
    setValue(
      CAMPOS_MODIFICACION_VEHICULO.UBICACION,
      ubicaciones.find((e) => e.id === bien.idUbicacion)
    );
    setValue(
      CAMPOS_MODIFICACION_VEHICULO.MUNICIPIO,
      municipios.find((e) => e.id === bien.idMunicipio)
    );
    setValue(
      CAMPOS_MODIFICACION_VEHICULO.CARACTERISTICAS,
      caracteristicasSelect
    );
    setValue(CAMPOS_MODIFICACION_VEHICULO.AUX_CARACTERISTICA, filasTabla);
    setValue(CAMPOS_MODIFICACION_VEHICULO.RESPONSABLES, responsablesSelect);
    setValue(
      CAMPOS_MODIFICACION_VEHICULO.OBSERVACION_RESPONSABLE,
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
      <FormCampoEntrada
        id={TIPO_BIEN}
        name={TIPO_BIEN}
        label="Tipo de Bien"
        control={control}
        defaultValue="MAQUINARIA Y VEHICULOS"
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
        label="Bien Vehículo"
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
      <FormCampoEntrada
        id={CUENTA_POR_PAGAR}
        name={CUENTA_POR_PAGAR}
        label="Cuentas Por Pagar"
        control={control}
        error={errors[CUENTA_POR_PAGAR]}
        helperText={errors[CUENTA_POR_PAGAR]?.message}
        disabled={esVisualizacion || esModificacionFactura}
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
        id={SUSTITUYE_BV}
        name={SUSTITUYE_BV}
        label="Sustituye a BV"
        control={control}
        error={errors[SUSTITUYE_BV]}
        helperText={errors[SUSTITUYE_BV]?.message}
        disabled={esVisualizacion || esModificacionFactura}
        required
      />
      <FormCampoAutocompletar
        id={MUNICIPIO}
        name={MUNICIPIO}
        label="Municipio"
        control={control}
        options={municipios}
        error={errors[MUNICIPIO]}
        helperText={errors[MUNICIPIO]?.message}
        disabled={esVisualizacion || esModificacionFactura}
        required
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
      <FormCampoAutocompletar
        id={UBICACION}
        name={UBICACION}
        label="Ubicación"
        control={control}
        options={ubicaciones}
        error={errors[UBICACION]}
        helperText={errors[UBICACION]?.message}
        disabled={esVisualizacion || esModificacionFactura}
        required
      />
      <FormCampoEntrada
        id={PRECIO_UNITARIO}
        name={PRECIO_UNITARIO}
        label="Precio Unitario"
        type="number"
        defaultValue=".00"
        control={control}
        error={errors[PRECIO_UNITARIO]}
        helperText={errors[PRECIO_UNITARIO]?.message}
        required
        disabled={esVisualizacion || !esModificacionFactura}
      />
      <FormCampoEntrada
        id={VIDA_UTIL}
        name={VIDA_UTIL}
        label="Vida Util (Años)"
        type="number"
        defaultValue="0"
        control={control}
        error={errors[VIDA_UTIL]}
        helperText={errors[VIDA_UTIL]?.message}
        required
        disabled={esVisualizacion || !esModificacionFactura}
      />
      <FormCampoCalendario
        id={FECHA_INICIO_USO}
        name={FECHA_INICIO_USO}
        label="Inicio de Uso"
        control={control}
        defaultValue={null}
        error={errors[FECHA_INICIO_USO]}
        helperText={errors[FECHA_INICIO_USO]?.message}
        required
        disabled={esVisualizacion || !esModificacionFactura}
      />
      <FormCampoEntrada
        id={PRECIO_DESECHABLE}
        name={PRECIO_DESECHABLE}
        label="Precio Desechable"
        type="number"
        defaultValue=".00"
        control={control}
        error={errors[PRECIO_DESECHABLE]}
        helperText={errors[PRECIO_DESECHABLE]?.message}
        required
        disabled={esVisualizacion || !esModificacionFactura}
      />
    </>
  );
};

export default AdministradorVehiculoModificacionDatoBienForm;
