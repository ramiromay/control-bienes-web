import { API_URL } from "@settings/apiConfig";
import { entResponseMappingRules } from "@settings/mappingRulesConfig";
import { mapObject } from "../settings/utils";

const request = async (endpoint, options = {}) => {
  const { method = "GET", headers = {}, body } = options;
   const authHeader = localStorage.getItem('auth_token');
   if (authHeader) {
     headers['Authorization'] = `Bearer ${authHeader}`;
   }
 
   const config = {
     method,
     headers: {
       "Content-Type": "application/json",
       ...headers,
     },
   };
 

  if (body) {
    config.body = JSON.stringify(body);
  }

  return await fetch(`${API_URL}${endpoint}`, config)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return mapObject(json, entResponseMappingRules, {
        generico: false,
        hasError: json.hasError,
      });
    })
    .catch((error) => {
      console.error(`[API Error] ${method} ${endpoint}: ${error.message}`);
      return mapObject(error, entResponseMappingRules, {
        generico: true,
        hasError: true,
      });
    });
};

export const get = (endpoint, headers = {}) =>
  request(endpoint, { method: "GET", headers });

export const post = (endpoint, body, headers = {}) =>
  request(endpoint, { method: "POST", body, headers });

export const put = (endpoint, body, headers = {}) =>
  request(endpoint, { method: "PUT", body, headers });

export const patch = (endpoint, body = null, headers = {}) =>
  request(endpoint, { method: "PATCH", ...(body && { body }), headers });
