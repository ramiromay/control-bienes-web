import PropTypes from "prop-types";
import {
  ForwardSharp,
  AddBox,
  IndeterminateCheckBox,
  FolderRounded,
  FolderOpenRounded,
} from "@mui/icons-material";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import { useCallback, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";

const Arbol = ({
  textoRaiz = "Raiz",
  treeData = [],
  handleItemSeleccionado,
  itemSeleccionado,
}) => {
  const [expandedItems] = useState(["0"]);

  let clickTimeout = null;

  const handleSelectedItemsChange = (event, id) => {
    if (clickTimeout) {
      event.stopPropagation();
      handleItemSeleccionado(id);
    } else {
      clickTimeout = setTimeout(() => {
        clickTimeout = null;
      }, 500);
    }
  };

  const renderTree = (nodes) => (
    <TreeItem
      itemId={nodes.id.toString()}
      key={nodes.id}
      label={
        <Typography className="texto-items-arbol" variant="inherit">
          {nodes.name}
        </Typography>
      }
    />
  );

  const treeIcons = useMemo(
    () => ({
      expandIcon: (props) => (
        <Box className="contenedor-flex-ex">
          <AddBox {...props} className="icono-item-expanded" />
          <FolderRounded className="icono-item-folder" />
        </Box>
      ),
      collapseIcon: (props) => (
        <Box className="contenedor-flex-ex">
          <IndeterminateCheckBox {...props} className="icono-item-expanded" />
          <FolderOpenRounded className="icono-item-folder" />
        </Box>
      ),
      endIcon: (props) => (
        <ForwardSharp {...props} className="icono-item-end" />
      ),
    }),
    []
  );

  return (
    <Box className="contenedor-arbol">
      <SimpleTreeView
        selectedItems={itemSeleccionado}
        defaultExpandedItems={expandedItems}
        onSelectedItemsChange={handleSelectedItemsChange}
        expansionTrigger="iconContainer"
        slots={treeIcons}
      >
        <TreeItem
          itemId="0"
          label={
            <Typography className="texto-items-arbol" variant="inherit">
              {textoRaiz}
            </Typography>
          }
        >
          {treeData.map((data) => renderTree(data))}
        </TreeItem>
      </SimpleTreeView>
    </Box>
  );
};

Arbol.propTypes = {
  textoRaiz: PropTypes.string,
  treeData: PropTypes.array.isRequired,
  handleActionDoubleClic: PropTypes.func,
};

export default Arbol;
