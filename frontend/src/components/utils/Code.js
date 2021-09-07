import React, { useEffect } from 'react';
import Prism from "prismjs";
import { Card } from 'bootstrap-4-react';

function Code() {

    useEffect(() => {
        setTimeout(() => Prism.highlightAll(), 0)

    })

    return (
        <Card>
            <Card.Body>
                <Card.Title>Snippet</Card.Title>
                <Card.Subtitle mb="2" text="muted">Código que deberá poner en la página que desea testear</Card.Subtitle>
                <Card.Text>El snippet que se muestra abajo, debera ser agregado al &lt;head&gt;, contenido entre
                    las etiquetas &lt;script type="text/javascript"&gt; y &lt;/script&gt;  </Card.Text>
                <Card.Text>Este Snippet es el encargado de aplicarle los refactorings que fueron agregados a su version de control y 
                    mostrarlos en la pagina web, para que pueda apreciar y comparar los cambios.
                </Card.Text>
                <pre><code className="language-javascript">{
                    'const urlParams = new URLSearchParams(window.location.search);\n'
                    + 'const versionTag = urlParams.get("version")\n'
                    + 'let userToken = "' + localStorage.getItem('usertoken') + '";\n'
                    + 'function load() {\n'
                    + '  var xhr = new XMLHttpRequest();\n'
                    + '  xhr.open("GET", "http://localhost:3001/refactor/" + userToken + "/" + versionTag, false);\n'
                    + '  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");\n'
                    + '  xhr.send();\n'
                    + '  if (xhr.status == 200){\n'
                    + '      let respuesta= xhr.responseText;\n'
                    + '      eval(respuesta);\n'
                    + '  }\n'
                    + '}\n'
                    + 'window.onload = load;'
                }
                </code></pre>
            </Card.Body>
        </Card>
    )
}
export default Code;