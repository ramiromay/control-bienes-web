import { Box, Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

const MenuButton = () => {
    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const menuItemStyle = {
        width: '100%',
        textAlign: 'center',
        padding: '8px 16px',
        backgroundColor: 'primary.main',
        color: 'white',
        '&:hover': {
          backgroundColor: 'primary.dark',
        },
        '&:select': {
          backgroundColor: 'primary.main',
        },
        margin: '4px 0',
        borderRadius: '4px',
        fontSize: '12px',
      
      };
      const paperStyle = {
        backgroundColor: 'primary.light',
        padding: '8px',
        borderRadius: '8px',
      };
  
    return (
      <Box>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          variant="contained"
          color="primary"
          size="small"
        >
          Acciones
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          sx={{
            '& .MuiPaper-root': {
              backgroundColor: 'primary.light',
              padding: '2px',
              borderRadius: '2px',
            },
          }}
        >
          <MenuItem onClick={handleClose} sx={menuItemStyle}>Agregar</MenuItem>
          <MenuItem onClick={handleClose} sx={menuItemStyle}>Visualizar</MenuItem>
          <MenuItem onClick={handleClose} sx={menuItemStyle}>Enviar</MenuItem>
        </Menu>
      </Box>
    );
  };

  export default MenuButton;