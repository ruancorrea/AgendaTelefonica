import { useState } from "react";

export default function useAlert() {
    const [alert, setAlert] = useState("");
    const [color, setColor] = useState("");
    const [exibirMsg, setExibirMsg] = useState(false);
    const [err, setErr] = useState(false);


    return {
        alert,
        exibirMsg,
        color,
        err,
        setAlert,
        setExibirMsg,
        setColor,
        setErr
    }
}