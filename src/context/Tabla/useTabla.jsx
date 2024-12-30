import { useContext } from "react"
import TablaContext  from "./TablaContext"

export default function useTabla () {
    return useContext(TablaContext);
}   