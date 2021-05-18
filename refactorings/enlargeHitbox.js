//modelo estilo que deberia ser pasado por parametro.
let style = {
    padding: '1em'
}

// toma 2 parametros, el elemento del dom y el objeto de estilos a aplicar.
const enlargeHitbox = (pathDom, elemStyle) => {
    // obtengo todos elementos del path.
    var pathLinks = document.evaluate(pathDom, document, null, XPathResult.ANY_TYPE, null);

    var node = null;
    var links = [];
    //por cada elemento lo guardo en un arreglo.
    while (node = pathLinks.iterateNext()) {
        links.push(node);
    }
    //Recorro el arreglo aplicando el cambio de estilo a cada elemento.
    links.forEach(link => {
        //El método Object.assign() copia todas las propiedades enumerables de uno o más objetos fuente a un objeto destino. 
        //Devuelve el objeto destino. 
        Object.assign(link.style, elemStyle);
        // en este caso la propiedad style de los links son el objeto destino y los estilos el objeto fuente.
    });
}