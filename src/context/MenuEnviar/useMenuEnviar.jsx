import { useContext } from "react";
import MenuEnviarContext from "./MenuEnviarContext";

const useMenuEnviar =  () => {
    return useContext(MenuEnviarContext);
} 

export default useMenuEnviar;