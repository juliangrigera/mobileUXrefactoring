var touches = [];




function handleZoom(event){
    console.log(window.visualViewport);
    event.target.style.position = "fixed"
    event.target.style.left = window.visualViewport.offsetLeft.toString() + "px";
    event.target.style.top = window.visualViewport.offsetTop.toString() + "px";
    event.target.style.width = window.visualViewport.width.toString() + "px";
    if(window.visualViewport.scale == 1){
        
        /* reset Elements
        event.target.position = "unset";
        event.target.left = "unset";
        event.target.top = "unset";
        event.target.style.width = "revert";*/
    }
}


function setHandlers(element){
    element.onpointerup = handleZoom;
    
}


const toBeChanged = document.getElementById("toBeChanged");

setHandlers(toBeChanged);
//window.onresize = function(event){console.log("resized!")}