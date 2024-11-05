import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Appbar from "./Component/Appbar";
import Notice from "./Routers/Notice";
import QnA from "./Routers/QnA";
import Send from "./Routers/Send";

const Theme = createTheme({
  palette: {
    primary: {
      main: "#008850",
      gray: "#a1a09c",
      orange: "#f09478",
      black: "#000000ff",
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <BrowserRouter>
          <Appbar>
            <Routes>
              <Route path="/Notice" element={<Notice />} />
              <Route path="/QnA" element={<QnA />} />
              <Route path="/Send" element={<Send />} />
            </Routes>
          </Appbar>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}
