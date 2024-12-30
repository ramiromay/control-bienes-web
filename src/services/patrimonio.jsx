import { get } from "@context/requestConfig";
import { ENDPOINTS_PATRIMONIO } from "../settings/apiConfig";
import { mapArray } from "../settings/utils";
import {
  compMotivoTramiteMappingRules,
  compTipoTramiteMappingRules,
} from "../settings/mappingRulesConfig";

export const getTipoTramite = async () => {
  const response = await get(ENDPOINTS_PATRIMONIO.TIPO_TRAMITE);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de tipos de tramite."
        : response.message
    );
  }
  return mapArray(response.result, compTipoTramiteMappingRules);
};

export const getMotivoTramite = async () => {
  const response = await get(ENDPOINTS_PATRIMONIO.MOTIVO_TRAMITE);
  if (response.hasError) {
    throw new Error(
      response.generico
        ? "Se produjo un error al intentar contactar con el servidor y recuperar la lista de motivos de tramite."
        : response.message
    );
  }
  return mapArray(response.result, compMotivoTramiteMappingRules);
};
