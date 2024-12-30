import { SistemaProvider } from "@context/SistemaContext";
import SICBAPage from "@components/utils/SICBAPage";
import { SnackbarProvider } from "./context/SnackbarContext";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    //<RequestProvider>
    <SnackbarProvider>
      <BrowserRouter>
        <SistemaProvider>
          <SICBAPage />
        </SistemaProvider>
      </BrowserRouter>
    </SnackbarProvider>
    //</RequestProvider>
  );
}

export default App;
