import { createTheme } from "@mui/material";

const primaryColor = "#3367d6";

const googleTheme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: "#202124",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "13px",
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          display: "flex",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: "4px",
          transform: "scale(0.80)",
        },
      },
    },
    MuiStepLabel : {
      styleOverrides: {
        label: {
          fontSize: "13px",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            fontSize: "13px",
          },
          "& .MuiInputBase-root.MuiOutlinedInput-root": {
            fontSize: "16px",
          },
          "& .MuiInputLabel-root": {
            fontSize: "13px",
          },
          "& .MuiInputLabel-shrink": {
            fontSize: "16px",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "13px",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: "13px",
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          marginLeft: "-2px",
          "& .MuiTypography-root": {
            fontSize: "13px",
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        heading: {
          borderRadius: "6px",
        },
        root: {
          boxShadow: "none",
          border: "1px solid #ddd",
          borderRadius: "6px",
          margin: "4px 0px",
          "&:before": {
            display: "none",
          },
          "&.Mui-expanded": {
            margin: "4px 0px",
          },
          "& .MuiPaper-root:first-of-type": {
            borderRadius: "6px !important",
          },
          "& .MuiPaper-root:last-of-type": {
            borderRadius: "6px !important",
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        content: {
          margin: "8px 0px",
          "&.Mui-expanded": {
            margin: "8px 0px",
          },
        },
        root: {
          backgroundColor: "#f8f9fa",
          color: "#202124",
          borderRadius: "6x",
          fontWeight: "500",
          minHeight: "30px",
          "&.Mui-expanded": {
            margin: "0px",
            minHeight: "30px",
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          borderRadius: "0px 0px 6px 6px",
          padding: "8px 16px",
          backgroundColor: "#ffffff",
          color: "#5f6368",
          borderTop: "1px solid #ddd",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          borderRadius: "6px",
        },
        container: {
          backgroundColor: "rgba(0, 0, 0, 0.35)",
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        backdrop: {
          backgroundColor: "rgba(0, 0, 0, 0.35)",
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0, 0, 0, 0.0)",
        },
      },
    },
  },
});

export default googleTheme;
