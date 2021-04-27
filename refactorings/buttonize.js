function makeButton({ style, offsetHeight } = element){
	let m = 1;
	style.borderRadius = (offsetHeight / m) + "px";
	style.padding = (offsetHeight / (2*m)) + "px " + (offsetHeight / m) + "px" ;
	style.textDecoration = "none";
}

function capitalize( { style, innerHTML } = element ){
	let contentString = innerHTML.toLowerCase().trim();
	style.textTransform = "none";
	return contentString[0].toUpperCase() + contentString.slice(1);
}

function buttonizeSimple( element ){
	// Changes underscored text to button with border
	
	let borderWidth = 1;
	element.style.border = borderWidth + "px solid " + element.style.color;
	makeButton(element);
	element.innerHTML = capitalize(element);
}

function buttonizeShaded( element ){
	// Changes underscored text to button with no border and slightly shaded background

	let shade = 0.1;
	var rgb = window.getComputedStyle(element).color;
	var newBackgroundColor = rgb.substring(4, rgb.length-1).replace(/ /g, '').split(',');
	element.style.backgroundColor = `rgba(${newBackgroundColor[0]}, ${newBackgroundColor[1]}, ${newBackgroundColor[2]}, ${shade})`;
	makeButton(element);
	element.innerHTML = capitalize(element);
}

function buttonizeSolid( element ){
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

