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
    },
    'reduceText': function reduceText(pathDom, porcentage) {
        // Obtengo los <p> del path 
        var pList = pathsElements(pathDom + '//p');
        //Necesito obtener el total de caracteres de los parrafos.
        var fullLength = 0;
        pList.forEach(elem => {
            fullLength += elem.innerText.length;
        });
        var sizeTextPermitted = Math.round((porcentage["porcentage"] * fullLength) / 100); // cantidad de caracteres permitidos mostrar.

        // debo calcular en que <p> cortar el documento.
        var pNum = 0;
        var sumLength = pList[pNum].innerText.length;
        while (sumLength < sizeTextPermitted) {
            pNum++;
            sumLength += pList[pNum].innerText.length;
        }

        var tagPBeforeCut =  pList[pNum].innerHTML;// guardo el <p> original antes de cortarlo
        //Corto el texto.
        if (pNum > 0) {
            pList[pNum].innerText = pList[pNum].innerText.slice(0, sumLength - sizeTextPermitted);
        } else {
            pList[pNum].innerText = pList[pNum].innerText.slice(0, sizeTextPermitted);
        }

        //obtengo los <p> del arreglo que le siguen al que se corto y los oculto.
        var subPList = pList.slice(pNum + 1);
        applyStyleChanges(subPList, { 'display': 'none' })

        //Creo el link del final y lo añado
        var link=document.createElement('a');
        //Le agrego un Listener para que cuando se haga click muestre el texto completo
        link.addEventListener("click", function() {
            applyStyleChanges(subPList, {'display':'block'});
            pList[pNum].innerHTML = tagPBeforeCut;
            this.style.display = 'none';
        });
        link.innerHTML = " Leer más..."
        pList[pNum].appendChild(link);

    },
    'replaceLabelforPlaceholder': function replaceLabelforPlaceholder(pathDom){
        //Obtener los labels del formulario
        var labels = pathsElements(pathDom+'//label');

        //Genero un map donde el valor de for es la clave y el texto de este es el valor 
        var mapLabels = new Map();
        labels.forEach( label => {
            mapLabels.set(label.attributes["for"].value, label.textContent)
        });
        //Escondo los labes.
        applyStyleChanges(labels, { 'display': 'none' })

        //Obtengo los inputs del formulario
        var inputs = pathsElements(pathDom+'//input');

        // Como el atributo "for" del label hace match con el id del input,
        // busco los inputs con ese id y modifico su placeholder.
        inputs.forEach( input => {
            if(mapLabels.get(input.getAttribute('id'))!= undefined){
                input.setAttribute("placeholder", mapLabels.get(input.attributes["id"].value))
            }
        });
        //Limitaciones: tiene que haber un "for" en el label. Queda pendiente por ahora, el caso de 
        // q no exista un for para el input. 
    }
}

module.exports = {
    FUNCTIONS_REFACTORING,
    INITIAL_FUNCTIONS
} //cambiar esto por export en la constante si no funciona. A mi me anda asi :)