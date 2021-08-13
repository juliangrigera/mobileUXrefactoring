import React, { useEffect } from 'react';
import Prism from "prismjs";

function Code() {
    
    useEffect(()=>{
        setTimeout(() => Prism.highlightAll(), 0)

    })

    return(
        <pre><code className="language-javascript">{
            'const urlParams = new URLSearchParams(window.location.search);\n'
            +'const versionTag = urlParams.get("version")\n'
            +'let userToken = "'+localStorage.getItem('usertoken') +'";\n'
            +'function load() {\n'
            +'  var xhr = new XMLHttpRequest();\n'
            +'  xhr.open("GET", "http://localhost:3000/refactor/" + userToken + "/" + versionTag, false);\n'
            +'  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");\n'
            +'  xhr.send();\n'
            +'  if (xhr.status == 200){\n'
            +'      let respuesta= xhr.responseText;\n'
            +'      eval(respuesta);\n'
            +'  }\n'		 
            +'}\n'
            +'window.onload = load;'
        }
        </code></pre>
    )
}
export default Code;