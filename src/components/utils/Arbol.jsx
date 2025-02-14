import PropTypes from "prop-types";
import {
  ForwardSharp,
  AddBox,
  IndeterminateCheckBox,
  FolderRounded,
  FolderOpenRounded,
} from "@mui/icons-material";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import { useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";

const Arbol = ({
  textoRaiz = "Raiz",
  treeData = [],
  handleItemSeleccionado,
  itemSeleccionado,
  defaultExpandedItems = ["0"],
  checkboxSelection = false,
}) => {
  const [expandedItems] = useState(defaultExpandedItems);

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
      itemId={nodes.id?.toString()}
      key={nodes.id}
      label={
        <Typography className="texto-items-arbol" variant="inherit">
          {nodes.label}
        </Typography>
      }
    >
      {nodes.children &&
        nodes.children.length > 0 &&
        nodes.children.map((childNode) => renderTree(childNode))}
    </TreeItem>
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
        checkboxSelection={checkboxSelection}
      >
        <TreeItem
          itemId="0"
          label={
            <Typography className="texto-items-arbol" variant="inherit">
              {textoRaiz}
            </Typography>
          }
        >
          {treeData.length > 0
            ? treeData.map((data) => renderTree(data))
            : null}
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
