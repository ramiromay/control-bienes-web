export const mapObject = (source, mappingRules, extraParams = {}) => {
  return Object.keys(mappingRules).reduce((mappedObj, key) => {
    const rule = mappingRules[key];

    let value;
    if (rule.includes(" - ")) {
      // Manejo de reglas complejas con múltiples propiedades concatenadas
      const properties = rule.split(" - ").map((prop) => prop.trim());
      value = properties
        .map((prop) => {
          // Identificar si se debe aplicar formato de fecha
          const isDateFormat = prop.startsWith("/");
          const cleanedProp = isDateFormat ? prop.slice(1) : prop;

          const propValue =
            cleanedProp
              .split(".")
              .reduce((acc, part) => acc && acc[part], source) || "";

          return isDateFormat ? convertDatetimeToDate(propValue) : propValue;
        })
        .filter((val) => val) // Remover valores vacíos
        .join(" - "); // Concatenar los valores con " - "
    } else {
      // Manejo de reglas normales (propiedades simples o anidadas)
      const isDateFormat = rule.startsWith("/");
      const cleanedRule = isDateFormat ? rule.slice(1) : rule;

      const rawValue = cleanedRule
        .split(".")
        .reduce((acc, part) => acc && acc[part], source);

      value = isDateFormat ? convertDatetimeToDate(rawValue) : rawValue;
    }

    // Convertir "" a null
    if (value === "") {
      value = null;
    }

    // Usar el valor en extraParams si está disponible, de lo contrario usar el valor calculado
    mappedObj[key] =
      extraParams[key] !== undefined
        ? extraParams[key]
        : value !== undefined
          ? value
          : null; // Si el valor no existe, asignar null

    return mappedObj;
  }, {});
};

export function stringToRow(inputString) {
  // Paso 1: Dividir la cadena por '||' para obtener bloques
  if (!inputString) return [];
  const objectStrings = inputString.split("||");

  // Paso 2: Convertir cada bloque en un objeto
  const objects = objectStrings.map((block) => {
    // Dividir cada bloque por '|'
    const keyValuePairs = block.split("|");

    // Crear el objeto a partir de las parejas clave:valor
    const obj = {};
    keyValuePairs.forEach((pair) => {
      const [key, value] = pair
        .split(":")
        .map((str) => str.replace(/'/g, "").trim());

      // Asignar 'id' y 'name' a las claves correspondientes
      if (key === "folio" || key === "idArticulo") {
        if (Number.isFinite(Number(value))) {
          obj.id = Number(value);
        } else {
          obj.id = value; // Cambiar 'folio' por 'id'
        }
      } else if (key === "etiqueta") {
        obj.name = value; // Cambiar 'etiqueta' por 'name'
      } else {
        obj[key] = value; // Mantener otras claves como están
      }
    });

    return obj;
  });

  return objects;
}

export function stringToIDs(inputString, key) {
  // Limpiar la cadena eliminando corchetes y comillas simples, además de normalizar los separadores
  if (!inputString) return [];
  const cleanString = inputString
    .replace(/\[|\]|'/g, "")
    .replace(/\|\|/g, "|")
    .split("|");

  // Filtrar y mapear los valores correspondientes al 'key' especificado
  const result = cleanString
    .filter((item) => item.includes(key)) // Filtrar por clave (como 'folio', 'etiqueta', etc.)
    .map((item) => {
      const [keyValue, value] = item.split(":");
      return keyValue.trim() === "folio" ? Number(value.trim()) : value.trim(); // Si es 'folio', convertir a número
    });

  // Si el key es 'folio', devolver un arreglo de números
  return key === "folio" ? result : result.map((item) => ({ [key]: item }));
}

// Función para convertir datetime a date en formato DD/MM/YYYY
const convertDatetimeToDate = (value) => {
  if (typeof value === "string" && !isNaN(Date.parse(value))) {
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; // Formato DD/MM/YYYY
  }
  return value; // Si no es un datetime válido, devolver el valor original
};

export const mapArray = (sourceArray, mappingRules, extraParams = {}) => {
  return sourceArray.map((item) => mapObject(item, mappingRules, extraParams));
};

export const mapToTree = (data, labelRaiz = "Raiz") => {
  // Crear un mapa de todos los datos por nivelCompleto para facilitar el acceso rápido
  const dataMap = data.reduce((acc, item) => {
    acc[item.nivelCompleto] = { ...item, children: [] };
    return acc;
  }, {});

  // Crear el árbol con el nodo raíz
  const treeData = [];

  // Iterar sobre los datos para organizar la jerarquía
  data.forEach((item) => {
    const { nivelCompleto, nombre } = item;
    const itemData = dataMap[nivelCompleto];

    // Si es un primer nivel, agregarlo al nodo raíz
    if (nivelCompleto.split(".").length === 1) {
      treeData.push({
        id: nivelCompleto,
        label: `${nivelCompleto} ${nombre}`,
        nivelCompleto,
        children: itemData.children,
      });
    } else {
      // Encontrar el nodo padre y añadir este como hijo
      const parentNivel = nivelCompleto.substring(
        0,
        nivelCompleto.lastIndexOf(".")
      );
      const parent = dataMap[parentNivel];

      if (parent) {
        parent.children.push({
          id: nivelCompleto,
          label: `${nivelCompleto} ${nombre}`,
          nivelCompleto,
          children: itemData.children,
        });
      }
    }
  });

  return treeData;
};

export const mapToTreeArticulo = (data, labelRaiz = "Raiz") => {
  // Crear un mapa de todos los datos por nivelCompleto para facilitar el acceso rápido
  const dataMap = data.reduce((acc, item) => {
    acc[item.nivelCompleto] = { ...item, children: [] };
    return acc;
  }, {});

  // Crear el árbol con el nodo raíz
  const treeData = [];

  // Iterar sobre los datos para organizar la jerarquía
  data.forEach((item) => {
    const { id, nivelCompleto, name } = item;
    const itemData = dataMap[nivelCompleto];

    // Si es un primer nivel, agregarlo al nodo raíz
    if (nivelCompleto.split(".").length === 1) {
      treeData.push({
        id: nivelCompleto,
        label: `${id} ${name}`,
        nivelCompleto,
        children: itemData.children,
      });
    } else {
      // Encontrar el nodo padre y añadir este como hijo
      const parentNivel = nivelCompleto.substring(
        0,
        nivelCompleto.lastIndexOf(".")
      );
      const parent = dataMap[parentNivel];

      if (parent) {
        parent.children.push({
          id: nivelCompleto,
          label: `${id} ${name}`,
          nivelCompleto,
          children: itemData.children,
        });
      }
    }
  });

  return treeData;
};

export const exportarFilasTablaExcel = (tablaRef, fileName) => {
  const csv = tablaRef.current.getDataAsCsv();
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", `${fileName}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
