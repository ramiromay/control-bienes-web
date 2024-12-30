import { useContext } from "react"
import CatalogoContext  from "./CatalogoContext"

export default function useCatalogo () {
    return useContext(CatalogoContext);
}   