//Funciones basicas que deben estar si o si, y se repiten varias veces.
const INITIAL_FUNCTIONS = [
    function pathsElements(pathDom) {
        // obtengo todos elementos del path.
        var pathElements = document.evaluate(pathDom, document, null, XPathResult.ANY_TYPE, null);
        var node = null;
        var elements = [];
        //por cada elemento lo guardo en un arreglo.
        while (node = pathElements.iterateNext()) {
            elements.push(node);
        }
        return elements;
    },
    function applyStyleChanges(elements, styles) {
        elements.forEach(elem => {
            //El método Object.assign() copia todas las propiedades enumerables de uno o más objetos fuente a un objeto destino. 
            //Devuelve el objeto destino.
            Object.assign(elem.style, styles)
        })
    },
    function makeButton({ style, offsetHeight } = element) {
        let m = 1;
        style.borderRadius = (offsetHeight / m) + "px";
        style.padding = (offsetHeight / (2 * m)) + "px " + (offsetHeight / m) + "px";
        style.textDecoration = "none";
    },
    function capitalize({ style, innerHTML } = element) {
        let contentString = innerHTML.toLowerCase().trim();
        style.textTransform = "none";
        return contentString[0].toUpperCase() + contentString.slice(1);
    }
]

const FUNCTIONS_REFACTORING = {
    'enlargeHitbox': function enlargeHitbox(pathDom, elemStyle) {
        // obtengo todos elementos del path.
        //var pathLinks = pathsElements(pathDom + '//a');
        var pathLinks = pathsElements(pathDom);
        if (pathLinks.length > 0) {
            applyStyleChanges(pathLinks, elemStyle);
        }
    },
    'buttonizeSimple': function buttonizeSimple(element) {
        // Changes underscored text to button with border

        let borderWidth = 1;
        element.style.border = borderWidth + "px solid " + element.style.color;
        makeButton(element);
        element.innerHTML = capitalize(element);
    },
    'buttonizeShaded': function buttonizeShaded(element) {
        // Changes underscored text to button with no border and slightly shaded background

        let shade = 0.1;
        var rgb = window.getComputedStyle(element).color;
        var newBackgroundColor = rgb.substring(4, rgb.length - 1).replace(/ /g, '').split(',');
        element.style.backgroundColor = `rgba(${newBackgroundColor[0]}, ${newBackgroundColor[1]}, ${newBackgroundColor[2]}, ${shade})`;
        makeButton(element);
        element.innerHTML = capitalize(element);
    },
    'buttonizeSolid': function buttonizeSolid(element) {
        // Changes undescored text to button with no border and solid background. Inverted colors.

        let newBackgroundColor = window.getComputedStyle(element).color;
        element.style.color =
            (window.getComputedStyle(element).backgroundColor === "rgba(0, 0, 0, 0)")
                ? "white"
                : window.getComputedStyle(element).backgroundColor;
        element.style.background = newBackgroundColor;
        makeButton(element);
        element.innerHTML = capitalize(element);
    }
}

module.exports = {
    FUNCTIONS_REFACTORING,
    INITIAL_FUNCTIONS
} //cambiar esto por export en la constante si no funciona. A mi me anda asi :)