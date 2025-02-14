import DialogoEmergente from "../../../../utils/DialogoEmergente";
import FormCampoAutocompletar from "../../../../utils/Autocompletar";
import { useForm } from "react-hook-form";
import { useCatalogo } from "../../../../../context/CatalogoContext";
import FormCampoEntrada from "../../../../utils/FormCampoEntrada";
import useTabla from "@context/Tabla/useTabla";
import { useEffect, useState } from "react";
import FormCheck from "../../../../utils/FormCheck";
import {
  getFamilias,
  getSubfamilias,
  getRegistroCatalogo,
} from "../../../../../services/catalogo";
import { ENDPOINTS_CATALOGOS } from "../../../../../settings/apiConfig";
import { CAMPOS_FORMULARIO } from "../../../../../settings/formConfig";


const CatalogoCaracteristicaForm = () => {
  const { dialogo, handleCerrarDialogo } = useCatalogo();
  const { filaSeleccionada } = useTabla();
  const { control, setValue } = useForm();

  const [cargando, setCargando] = useState(true);
  const [caracteristica, setCaracteristica] = useState({});
  const [familias, setFamilias] = useState();
  const [subFamilias, setSubFamilias] = useState([]);

  useEffect(() => {
    const endpoint = `${ENDPOINTS_CATALOGOS.CARACTERISTICA_BIEN}/${filaSeleccionada[0]}`;
    const [familias, subFamilia, caracteristica] = Promise.all([
      getFamilias(),
      getSubfamilias(),
      getRegistroCatalogo(endpoint),
    ])
      .then(() => {
        setFamilias(familias);
        setSubFamilias(subFamilia);
        setCaracteristica(caracteristica);
      })
      .finally(() => {
        setCargando(false);
      });
  }, [filaSeleccionada]);

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
      const familiaSeleccionada = familias.find(
        (entidad) => entidad.id === idFamilia
      );
      const subfamiliaSeleccionada = subFamilias.find(
        (entidad) => entidad.id === idSubfamilia
      );

      setValue(CAMPOS_FORMULARIO.ID_CARACTERISTICA, idCaracteristicaBien);
      setValue(CAMPOS_FORMULARIO.FAMILIA, familiaSeleccionada);
      setValue(CAMPOS_FORMULARIO.SUBFAMILIA, subfamiliaSeleccionada);
      setValue(CAMPOS_FORMULARIO.ETIQUETA, etiqueta);
      setValue(CAMPOS_FORMULARIO.DESCRIPCION, descripcion);
      setValue(CAMPOS_FORMULARIO.ACTIVO, activo);
      setValue(CAMPOS_FORMULARIO.FECHA_CREACION, fechaCreacion);
      setValue(CAMPOS_FORMULARIO.FECHA_MODIFICACION, fechaModificacion);
    }
  }, [caracteristica]);

  return (
    <DialogoEmergente
      titulo="Crear Característica de Bien"
      cargando={cargando}
      abierto={dialogo.abierto}
      onClickCancelar={handleCerrarDialogo}
      textoCancelar="Cerrar"
      disabledConfirmar
    >
      <FormCampoEntrada
        id={CAMPOS_FORMULARIO.ID_CARACTERISTICA}
        name={CAMPOS_FORMULARIO.ID_CARACTERISTICA}
        label="Id Característica"
        control={control}
        required
        disabled
      />
      <FormCampoAutocompletar
        id={CAMPOS_FORMULARIO.FAMILIA}
        name={CAMPOS_FORMULARIO.FAMILIA}
        label="Familia"
        control={control}
        options={familias}
        required
        disabled
      />
      <FormCampoAutocompletar
        id={CAMPOS_FORMULARIO.SUBFAMILIA}
        name={CAMPOS_FORMULARIO.SUBFAMILIA}
        label="Sub Familia"
        control={control}
        required
        disabled
      />
      <FormCampoEntrada
        id={CAMPOS_FORMULARIO.ETIQUETA}
        name={CAMPOS_FORMULARIO.ETIQUETA}
        label="Etiqueta"
        control={control}
        required
        disabled
      />
      <FormCampoEntrada
        id={CAMPOS_FORMULARIO.DESCRIPCION}
        name={CAMPOS_FORMULARIO.DESCRIPCION}
        label="Descripción"
        control={control}
        disabled
      />
      
    </DialogoEmergente>
  );
};

export default CatalogoCaracteristicaForm;
