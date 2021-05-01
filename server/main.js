export function fixContentToViewPort(xpath){
    //takes string full xpath as argument
    return `document.evaluate(${xpath}, document,null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.xpathresult.onpointerup = function(event){event.target.style.position = 'fixed'; event.target.style.left = window.visualViewport.offsetLeft.toString() + 'px';event.target.style.top = window.visualViewport.offsetTop.toString() + 'px';event.target.style.width = window.visualViewport.width.toString() + 'px';} `
    
}

