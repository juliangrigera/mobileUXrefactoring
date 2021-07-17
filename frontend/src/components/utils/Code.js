import React, { useEffect } from 'react';
import Prism from "prismjs";

function Code() {
    
    useEffect(()=>{
        setTimeout(() => Prism.highlightAll(), 0)

    })

    return(
        <pre><code className="language-javascript">{
            'let userToken = "juan2021";'
            +'function load() {'
                +'var xhr = new XMLHttpRequest();'
                +'xhr.open("GET", "http://localhost:3000/refactor/" + userToken, false);'
                +'xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");'
                +'xhr.send();'
                +'if (xhr.status == 200){'
                    +'let respuesta= xhr.responseText;'
                    +'eval(respuesta);'
                +'}'		 
        +'}'
        +'window.onload = load;'
        }
        </code></pre>
    )
}
export default Code;