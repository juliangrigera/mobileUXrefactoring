// Esta funcion agrega las comillas a las variables si son string.
function addQuotesIfString(val) {
    let str;
    if (typeof (val) == 'string')
        str = "'" + val + "'"
    return str;
}

//de acuerdo al tipo de argumento es como se arma su string, retorna el valor en string.
function getString(elem){
    let str;
    switch (typeof (elem)) {
        case 'string':
            str = addQuotesIfString(elem);
            break;
        case 'object':
            str = JSON.stringify(elem);
            break
        default:
            str = elem.toString()
            break;
    }
    return str;
}

//crea la lista de argumentos
function makeListArguments(args) {
    let arguments = new String('');
    for (let i = 0; i < args.length - 1; i++) {
            arguments += getString(args[i]);
        arguments += ', '
    }
    arguments += getString(args[args.length-1]);
    return arguments;
}


//Esta funcion convierte las funciones en string para ser evaluados por eval()
export function convertFunctionToString(funcion, ...args) {
    let arguments = new String('');
    if (args.length > 0) {
        arguments = makeListArguments(args);
    }
    // retorna la funcion mas su llamada con los parametros. 
    //Ej: "function A(...){...}; A(p1, 'texto', true...)" 
    return funcion.toString() + ";" + funcion.name + "(" + arguments + ")";
}