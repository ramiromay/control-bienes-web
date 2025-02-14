import CatalogosLista from "./CatalogosSIALista";
import "@styles/AdministradorBienes.css";
import TablaProvider from "@context/Tabla/TablaProvider";
import { useSistema } from "@context/SistemaContext";
import CatalogosSkeleton from "./CatalogosSIASkeleton";
import CatalogosTabla from "./CatalogosSIATabla";
import { useCatalogo } from "../../../context/CatalogoContext";
import { useEffect } from "react";
import { IDS_SUBMODULOS } from "../../../settings/sistemaConfig";
import { MODO_CARGA } from "../../../settings/appConstants";
import { IDS_CATALOGOS } from "../../../settings/catalogosConfig";
import CatalogoAlmacenForm from "./forms/CatalogoAlmacenForm";
import CatalogoConceptoMovimientoForm from "./forms/CatalogoConceptoMovimientoForm";
import CatalogoTipoAdquisicionForm from "./forms/CatalogoTipoAdquisicionForm";

const CatalogosSIA = () => {
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
      idSubModulo: IDS_SUBMODULOS.ADMINISTRADOR_CATALOGOS_SIA,
    });
    handleIniciarCarga(MODO_CARGA.MODULO);
    handleCargarListaCatalogos(2)
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

  return (
    <section className="contenedor-modulo">
      {handleEsCargaModulo() ? (
        <CatalogosSkeleton />
      ) : (
        <section className="contenedor-sub-modulo">
          <CatalogosLista />
          <TablaProvider
            datos={tabla.datos}
            campoId={tabla.campoId}
            itemSeleccionado={itemSeleccionado}
          >
            <CatalogosTabla />
            {dialogo.idCatalogo === IDS_CATALOGOS.ALMACENES && (
              <CatalogoAlmacenForm />
            )}
            {dialogo.idCatalogo === IDS_CATALOGOS.METODO_ADQUISICION && (
              <CatalogoTipoAdquisicionForm />
            )}
            {dialogo.idCatalogo === IDS_CATALOGOS.CONCEPTOS_MOVIMIENTO && (
              <CatalogoConceptoMovimientoForm />
            )}
          </TablaProvider>
        </section>
      )}
    </section>
  );
};

export default CatalogosSIA;
