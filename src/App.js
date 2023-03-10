import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';
import Register from "./components/Register.jsx";
import { indigo} from "@mui/material/colors";
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary:{
      main: "#0A1929",
      light: "#001E3C"
    },
    secondary: indigo
  },
});


function MainApp() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Register/>
    </ThemeProvider>
  );
}


export default MainApp;
