import { createTheme, SxProps } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => {
          if (ownerState.variant == "contained") {
            return {
              backgroundColor: "#4A00E0",
              "&:hover": { backgroundColor: "#8E2DE2" },
            };
          }
          if (ownerState.variant == "outlined") {
            return {
              borderColor: "#4A00E0",
              color: "#4A00E0",
              "&:hover": {
                borderColor: "#8E2DE2",
                color: "#8E2DE2",
              },
            };
          }
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ ownerState }) => {
          if (ownerState.variant == "standard") {
            return {
              "& .MuiInput-underline:after": { borderColor: "#8E2DE2" },
            };
          }
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "25px",
          border: "none",
        },
      },
    },
  },
});

export const responsiveTypography: SxProps = {
  fontSize: {
    xs: "20px",
    sm: "22px",
    md: "24px",
  },
};
