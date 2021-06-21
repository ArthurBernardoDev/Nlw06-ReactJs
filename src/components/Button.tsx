import { useState } from "react";

export function Button() {

    const [contador, setContador] = useState(0)

    function increment() {
        setContador(contador + 1)
    }

    return (
        <button onClick={increment}>
            {contador}
            </button>
    )
}

