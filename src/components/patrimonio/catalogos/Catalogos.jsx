import { Box } from "@mui/material";
import CatalogosLista from "./CatalogosLista";
import "@styles/AdministradorBienes.css";
import TablaProvider from "@context/Tabla/TablaProvider";
import { useSistema } from "@context/SistemaContext";
import CatalogosSkeleton from "./CatalogosSkeleton";
import CatalogosTabla from "./CatalogosTabla";
import CatalogoCaracteristicaForm from "./forms/CatalogoCaracteristicaForm";
import { useCatalogo } from "../../../context/CatalogoContext";
import { IDS_CATALOGOS } from "../../../settings/catalogosConfig";
import { useEffect } from "react";
import { MODO_CARGA } from "../../../settings/appConstants";
import CatalogoClaseVehicularForm from "./forms/CatalogoClaseVehicularForm";
import CatalogoClaveVehicularForm from "./forms/CatalogoClaveVehicularForm";
import CatalogoColorForm from "./forms/CatalogoColorForm";
import CatalogoCombustibleVehicularForm from "./forms/CatalogoCombustibleVehicularForm";
import CatalogoEstadoFisicoForm from "./forms/CatalogoEstadoFisicoForm";
import CatalogoEstadoGeneralForm from "./forms/CatalogoEstadoGeneralForm";
import CatalogoFamiliaForm from "./forms/CatalogoFamiliaForm";
import CatalogoLineaVehicularForm from "./forms/CatalogoLineaVehicularForm";
import CatalogoMarcaForm from "./forms/CatalogoMarcaForm";
import CatalogoOrigenValorForm from "./forms/CatalogoOrigenValorForm";
import CatalogoSubFamiliaForm from "./forms/CatalogoSubFamiliaForm";
import CatalogoTipoAdquisicionForm from "./forms/CatalogoTipoAdquisicionForm";
import CatalogoTipoAfectacionForm from "./forms/CatalogoTipoAfectacionForm";
import CatalogoTipoBienForm from "./forms/CatalogoTipoBienForm";
import CatalogoTipoInmuebleForm from "./forms/CatalogoTipoInmuebleForm";
import CatalogoTipoVehicularForm from "./forms/CatalogoTipoVehicularForm";
import CatalogoTurnoForm from "./forms/CatalogoTurnoForm";
import CatalogoUbicacionForm from "./forms/CatalogoUbicacionForm";
import CatalogoUsoInmuebleForm from "./forms/CatalogoUsoInmuebleForm";
import CatalogoVersionVehicularForm from "./forms/CatalogoVersionVehicularForm";
import CatalogoCentroTrabajoForm from "./forms/CatalogoCentroTrabajoForm";
import CatalogoCentroTrabajoTurnoForm from "./forms/CatalogoCentroTrabajoTurnoForm";
import CatalogoTitularForm from "./forms/CatalogoTitularForm";
import CatalogoResguardanteForm from "./forms/CatalogoResguardanteForm";
import CatalogoDocumentoForm from "./forms/CatalogoDocumentoForm";
import { IDS_SUBMODULOS } from "../../../settings/sistemaConfig";

const Catalogos = () => {
  const {
    tabla,
    itemSeleccionado,
    dialogo,
    handleCargarListaCatalogos,
    handleDobleClicCatalogo,
    handleResetearTabla,
  } = useCatalogo();
  const {
    handleError,
    handleEsCargaModulo,
    handleIniciarCarga,
    handleFinalizarCarga,
    handleChangeModulo,
  } = useSistema();

  useEffect(() => {
    handleChangeModulo({
      idSubModulo: IDS_SUBMODULOS.ADMINISTRADOR_CATALOGOS_SIP,
    });
    handleIniciarCarga(MODO_CARGA.MODULO);
    handleCargarListaCatalogos(1)
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        handleFinalizarCarga();
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (itemSeleccionado) {
      handleIniciarCarga(MODO_CARGA.DATOS);
      handleDobleClicCatalogo()
        .catch((error) => {
          handleResetearTabla();
          handleError(error);
        })
        .finally(() => {
          handleFinalizarCarga();
        });
    }
    // eslint-disable-next-line
  }, [itemSeleccionado]);

  console.log(dialogo.idCatalogo);
  console.log(IDS_CATALOGOS.UBICACION);
  return (
    <section className="contenedor-modulo">
      {handleEsCargaModulo() ? (
        <CatalogosSkeleton />
      ) : (
        <section className="contenedor-maestro">
          <CatalogosLista />
          <TablaProvider
            datos={tabla.datos}
            campoId={tabla.campoId}
            itemSeleccionado={itemSeleccionado}
          >
            <CatalogosTabla />
            {dialogo.idCatalogo === IDS_CATALOGOS.CARACTERISTICA_BIEN && (
              <CatalogoCaracteristicaForm />
            )}
            {dialogo.idCatalogo === IDS_CATALOGOS.CENTRO_TRABAJO && (
              <CatalogoCentroTrabajoForm />
            )}
            {dialogo.idCatalogo === IDS_CATALOGOS.CENTRO_TRABAJO_TURNO && (
              <CatalogoCentroTrabajoTurnoForm />
            )}
            {dialogo.idCatalogo === IDS_CATALOGOS.CLASE_VEHICULAR && (
              <CatalogoClaseVehicularForm />
            )}
            {dialogo.idCatalogo === IDS_CATALOGOS.CLAVE_VEHICULAR && (
              <CatalogoClaveVehicularForm />
            )}
            {dialogo.idCatalogo === IDS_CATALOGOS.COLOR && (
              <CatalogoColorForm />
            )}
            {dialogo.idCatalogo === IDS_CATALOGOS.COMBUSTIBLE_VEHICULAR && (
              <CatalogoCombustibleVehicularForm />
            )}
            {dialogo.idCatalogo === IDS_CATALOGOS.DOCUMENTO && (
              <CatalogoDocumentoForm />
            )}
            {dialogo.idCatalogo === IDS_CATALOGOS.ESTADO_FISICO && (
              <CatalogoEstadoFisicoForm />
            )}
            {dialogo.idCatalogo === IDS_CATALOGOS.ESTADO_GENERAL && (
              <CatalogoEstadoGeneralForm />
            )}
            {dialogo.idCatalogo === IDS_CATALOGOS.FAMILIA && (
              <CatalogoFamiliaForm />
            )}
            {dialogo.idCatalogo === IDS_CATALOGOS.LINEA_VEHICULAR && (
              <CatalogoLineaVehicularForm />
            )}
            {dialogo.idCatalogo === IDS_CATALOGOS.MARCA && (
              <CatalogoMarcaForm />
            )}
            {dialogo.idCatalogo === IDS_CATALOGOS.ORIGEN_VALOR && (
              <CatalogoOrigenValorForm />
            )}
            {dialogo.idCatalogo === IDS_CATALOGOS.RESGUARDANTE && (
              <CatalogoResguardanteForm />
            )}
            {dialogo.idCatalogo === IDS_CATALOGOS.SUB_FAMILIA && (
              <CatalogoSubFamiliaForm />
            )}
            {dialogo.idCatalogo === IDS_CATALOGOS.TIPO_ADQUISICION && (
              <CatalogoTipoAdquisicionForm />
            )}
            {dialogo.idCatalogo === IDS_CATALOGOS.TIPO_AFECTACION && (
              <CatalogoTipoAfectacionForm />
            )}
            {dialogo.idCatalogo === IDS_CATALOGOS.TIPO_BIEN && (
              <CatalogoTipoBienForm />
            )}
            {dialogo.idCatalogo === IDS_CATALOGOS.TIPO_INMUEBLE && (
              <CatalogoTipoInmuebleForm />
            )}
            {dialogo.idCatalogo === IDS_CATALOGOS.TIPO_VEHICULAR && (
              <CatalogoTipoVehicularForm />
            )}
            {dialogo.idCatalogo === IDS_CATALOGOS.TITULAR && (
              <CatalogoTitularForm />
            )}
            {dialogo.idCatalogo === IDS_CATALOGOS.TURNO && (
              <CatalogoTurnoForm />
            )}
            {dialogo.idCatalogo === IDS_CATALOGOS.UBICACION && (
              <CatalogoUbicacionForm />
            )}
            {dialogo.idCatalogo === IDS_CATALOGOS.USO_INMUEBLE && (
              <CatalogoUsoInmuebleForm />
            )}
            {dialogo.idCatalogo === IDS_CATALOGOS.VERSION_VEHICULAR && (
              <CatalogoVersionVehicularForm />
            )}
          </TablaProvider>
        </section>
      )}
    </section>
  );
};

export default Catalogos;
