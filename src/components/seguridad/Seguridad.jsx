import TablaProvider from "@context/Tabla/TablaProvider";
import { useSeguridad } from "../../context/SeguridadContext";
import SeguridadTabla from "./SeguridadTabla";
import { useEffect } from "react";
import { useSistema } from "../../context/SistemaContext";
import { IDS_SUBMODULOS } from "../../settings/sistemaConfig";
import SeguridadForm from "./SeguridadForm";

const Seguridad = () => {
  const { handleChangeModulo } = useSistema();
  const { tabla, itemSeleccionado, dialogo} = useSeguridad();

  useEffect(() => {
    handleChangeModulo({
      idSubModulo: IDS_SUBMODULOS.ADMINISTRADOR_EMPLEADOS_USUARIOS,
    });
  }, []);

  return (
    <section className="contenedor-modulo">
      <section className="contenedor-sub-modulo">
        <TablaProvider
          datos={tabla.datos}
          campoId={tabla.campoId}
          itemSeleccionado={itemSeleccionado}
        >
          <SeguridadTabla />
          {dialogo.abierto && <SeguridadForm />}
        </TablaProvider>
      </section>
    </section>
  );
};

export default Seguridad;
