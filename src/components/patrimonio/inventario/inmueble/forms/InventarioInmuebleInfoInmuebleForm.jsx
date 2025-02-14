import FormCampoEntrada from "../../../../utils/FormCampoEntrada";
import FormCampoAutocompletar from "../../../../utils/FormCampoAutocompletar";
import { MOTIVO_TRAMITE } from "../../../../../settings/sistemaConfig";
import FormCampoCalendario from "../../../../utils/FormCampoCalendario";
import { CAMPOS_INVENTARIO_INMUEBLE } from "../../../../../settings/formConfig";
import { Stack } from "@mui/material";

const InventarioInmuebleInfoInmuebleForm = ({
  formManager = null,
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
    BIEN,
    FOLIO_BIEN,
    FECHA_ALTA,
    FECHA_BAJA,
    MOTIVO_BAJA,
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
  } = CAMPOS_INVENTARIO_INMUEBLE;
  const { control } = formManager;

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

  return (
    <>
      <FormCampoEntrada
        id={BIEN}
        name={BIEN}
        label="Id Bien Mueble"
        control={control}
        type="number"
        required
        disabled
      />
      <FormCampoEntrada
        id={FOLIO_BIEN}
        name={FOLIO_BIEN}
        label="Folio Bien Inmueble"
        control={control}
        disabled
        required
      />
      <Stack direction="row" gap={2}>
        <FormCampoCalendario
          id={FECHA_ALTA}
          name={FECHA_ALTA}
          label="Fecha Alta"
          control={control}
          defaultValue={null}
          disabled
        />
        <FormCampoCalendario
          id={FECHA_BAJA}
          name={FECHA_BAJA}
          label="Fecha Baja"
          control={control}
          defaultValue={null}
          disabled
        />
      </Stack>
      <FormCampoEntrada
        id={MOTIVO_BAJA}
        name={MOTIVO_BAJA}
        label="Motivo Baja"
        control={control}
        required
        disabled
      />
      <FormCampoAutocompletar
        id={REFERENCIA_CONAC}
        name={REFERENCIA_CONAC}
        label="Clasificación CONAC"
        control={control}
        options={clasificacionConac}
        required
        disabled
      />
      <FormCampoAutocompletar
        id={ID_FAMILIA}
        name={ID_FAMILIA}
        label="Familia"
        control={control}
        options={familias}
        required
        disabled
      />
      <FormCampoAutocompletar
        id={ID_SUBFAMILIA}
        name={ID_SUBFAMILIA}
        label="Sub Familia"
        control={control}
        options={subfamilias}
        required
        disabled
      />
      <FormCampoEntrada
        id={NOMENCLATURA}
        name={NOMENCLATURA}
        label="Nomeclatura"
        control={control}
        multiline
        rows={4}
        disabled
      />
      <FormCampoEntrada
        id={DESCRIPCION}
        name={DESCRIPCION}
        label="Descripción"
        control={control}
        required
        disabled
      />
      <FormCampoAutocompletar
        id={ID_TIPO_INMUEBLE}
        name={ID_TIPO_INMUEBLE}
        label="Tipo de Inmueble"
        control={control}
        options={tiposInmuebles}
        required
        disabled
      />
      <FormCampoAutocompletar
        id={ID_USO_INMUEBLE}
        name={ID_USO_INMUEBLE}
        label="Uso Inmueble"
        control={control}
        options={usosInmuebles}
        required
        disabled
      />
      <FormCampoAutocompletar
        id={ID_TIPO_DOMINIO}
        name={ID_TIPO_DOMINIO}
        label="Tipo de Dominio"
        control={control}
        options={tiposDominios}
        required
        disabled
      />
      <FormCampoAutocompletar
        id={ID_ESTADO_FISICO}
        name={ID_ESTADO_FISICO}
        label="Estado del Inmueble"
        control={control}
        options={estadosFisicos}
        required
        disabled
      />
      <FormCampoAutocompletar
        id={ID_TIPO_AFECTACION}
        name={ID_TIPO_AFECTACION}
        label="Tipo de Afectación"
        control={control}
        options={tiposAfectacion}
        required
        disabled
      />
      <FormCampoEntrada
        id={AFECTANTE}
        name={AFECTANTE}
        label="Afectante"
        control={control}
        disabled
        required
      />
      <FormCampoAutocompletar
        id={ID_TIPO_ADQUISICION}
        name={ID_TIPO_ADQUISICION}
        label="Tipo de Adquisición"
        control={control}
        options={tiposAdquisicion}
        required
        disabled
      />
      {altaDonacion && (
        <>
          <FormCampoEntrada
            id={DECRETO_PUBLICACION}
            name={DECRETO_PUBLICACION}
            label="Decreto o Publicación"
            control={control}
            disabled
            required
          />
          <FormCampoCalendario
            id={FECHA_ADQUISICION}
            name={FECHA_ADQUISICION}
            label="Fecha de Donación"
            control={control}
            defaultValue={null}
            required
            disabled
          />
          <FormCampoCalendario
            id={FECHA_ALTA_SISTEMA}
            name={FECHA_ALTA_SISTEMA}
            label="Fecha Alta en Sistema"
            control={control}
            defaultValue={null}
            required
            disabled
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
            disabled
            required
          />
          <FormCampoCalendario
            id={FECHA_ADQUISICION}
            name={FECHA_ADQUISICION}
            label="Fecha Adquisición"
            control={control}
            defaultValue={null}
            required
            disabled
          />
          <FormCampoCalendario
            id={FECHA_ALTA_SISTEMA}
            name={FECHA_ALTA_SISTEMA}
            label="Fecha Alta en Sistema"
            control={control}
            defaultValue={null}
            required
            disabled
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
            disabled
            required
          />
          <FormCampoEntrada
            id={EXPEDIENTE}
            name={EXPEDIENTE}
            label="Expediente de Origen"
            control={control}
            disabled
            required
          />
          <FormCampoCalendario
            id={FECHA_ADQUISICION}
            name={FECHA_ADQUISICION}
            label="Fecha de División"
            control={control}
            defaultValue={null}
            required
            disabled
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
            disabled
            required
          />
          <FormCampoEntrada
            id={EXPEDIENTE}
            name={EXPEDIENTE}
            label="Expediente Permutado"
            control={control}
            disabled
            required
          />
          <FormCampoCalendario
            id={FECHA_ADQUISICION}
            name={FECHA_ADQUISICION}
            label="Fecha de Permuta"
            control={control}
            defaultValue={null}
            required
            disabled
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
            disabled
            required
          />
          <FormCampoCalendario
            id={FECHA_ADQUISICION}
            name={FECHA_ADQUISICION}
            label="Fecha de Adquisición"
            control={control}
            defaultValue={null}
            required
            disabled
          />
          <FormCampoCalendario
            id={FECHA_ALTA_SISTEMA}
            name={FECHA_ALTA_SISTEMA}
            label="Fecha Alta en Sistema"
            control={control}
            defaultValue={null}
            required
            disabled
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
            disabled
            required
          />
          <FormCampoCalendario
            id={FECHA_ADQUISICION}
            name={FECHA_ADQUISICION}
            label="Fecha de Adquisición"
            control={control}
            defaultValue={null}
            required
            disabled
          />
          <FormCampoCalendario
            id={FECHA_ALTA_SISTEMA}
            name={FECHA_ALTA_SISTEMA}
            label="Fecha Alta en Sistema"
            control={control}
            defaultValue={null}
            required
            disabled
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
            disabled
            required
          />
          <FormCampoCalendario
            id={FECHA_ADQUISICION}
            name={FECHA_ADQUISICION}
            label="Fecha de Adquisición"
            control={control}
            defaultValue={null}
            required
            disabled
          />
          <FormCampoCalendario
            id={FECHA_ALTA_SISTEMA}
            name={FECHA_ALTA_SISTEMA}
            label="Fecha Alta en Sistema"
            control={control}
            defaultValue={null}
            required
            disabled
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
            disabled
            required
          />
          <FormCampoCalendario
            id={FECHA_ADQUISICION}
            name={FECHA_ADQUISICION}
            label="Fecha de Adquisición"
            control={control}
            defaultValue={null}
            required
            disabled
          />
          <FormCampoCalendario
            id={FECHA_ALTA_SISTEMA}
            name={FECHA_ALTA_SISTEMA}
            label="Fecha Alta en Sistema"
            control={control}
            defaultValue={null}
            required
            disabled
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
        disabled
        required
      />
      <FormCampoEntrada
        id={CAMPOS_INVENTARIO_INMUEBLE.VALOR_LIBROS}
        name={CAMPOS_INVENTARIO_INMUEBLE.VALOR_LIBROS}
        label="Valor Libros"
        type="number"
        defaultValue=".00"
        control={control}
        disabled
        required
      />
      <FormCampoEntrada
        id={CAMPOS_INVENTARIO_INMUEBLE.DEPRECIACION}
        name={CAMPOS_INVENTARIO_INMUEBLE.DEPRECIACION}
        label="Depreciación"
        type="number"
        defaultValue=".00"
        control={control}
        disabled
        required
      />
      <FormCampoEntrada
        id={ANIOS_VIDA_UTIL}
        name={ANIOS_VIDA_UTIL}
        label="Vida Útil (Años)"
        type="number"
        control={control}
        disabled
        required
      />
    </>
  );
};

export default InventarioInmuebleInfoInmuebleForm;
