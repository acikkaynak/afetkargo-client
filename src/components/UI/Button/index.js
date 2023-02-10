import { Button, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 28,
        },
      },
    },
  },
});

function SubmitButton({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        sx={{ mt: 2, mb: 4, backgroundColor: "#5138ee" }}
      >
        {children}
      </Button>
    </ThemeProvider>
  );
}

export default SubmitButton;
