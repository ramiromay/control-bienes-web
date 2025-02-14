import { Typography } from "@mui/material";
import PropTypes from "prop-types";

const ItemInfoExtraAutocompletar = (props, option, { selected }) => {
  const { key, ...optionProps } = props;
  return (
    <li key={key} {...optionProps}  style={{ padding: "5px" }}>
      <Typography
          sx={{
            fontSize: "13px",
            margin: "0px 10px",
            minWidth: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {option.id}
        </Typography>
        <div>
          <Typography sx={{ fontSize: "13px" }}>{option.name}</Typography>
          <Typography
            sx={{ fontSize: "11px", display: "block", color: "gray" }}
          >
            {option.infoExtra}
          </Typography>
        </div>
    </li>
  );
};

ItemInfoExtraAutocompletar.propTypes = {
  option: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    infoExtra: PropTypes.string,
  }).isRequired,
  selected: PropTypes.bool.isRequired,
};

export default ItemInfoExtraAutocompletar;
