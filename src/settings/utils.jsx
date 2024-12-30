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

          const propValue = cleanedProp
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

export const mapArray = (sourceArray, rules, extraParams = {}) => {
  return sourceArray.map((item) => mapObject(item, rules, extraParams));
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
