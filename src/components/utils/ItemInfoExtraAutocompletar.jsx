import { Typography } from "@mui/material";

const ItemInfoExtraAutocompletar = (props, option, { selected }) => (
    <li {...props} style={{ padding: "5px" }}>
      {/* Ejemplo de personalización: checkbox y texto */}
      <Typography sx={{ fontSize: "13px", margin: "0px 10px", minWidth: "50px", display :"flex",alignItems: "center", justifyContent: "center"}}>{option.id}</Typography>
      <div>
        {/* Nombre principal */}
        <Typography sx={{ fontSize: "13px" }}>{option.name}</Typography>
        {/* ID con tamaño de fuente más pequeño y en una nueva línea */}
        <Typography sx={{ fontSize: "11px", display: "block", color: "gray" }}>
          {option.infoExtra}
        </Typography>
      </div>
    </li>
  );
export default ItemInfoExtraAutocompletar;
