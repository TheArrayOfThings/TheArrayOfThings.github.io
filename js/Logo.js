function drawLogo() {
	var fontSizeMaxAttempts = 200;
	try {
		//First, create the canvas
		var canvas = document.getElementById("topLogo");
		var container = document.getElementsByClassName("logoContainer")[0];
		canvas.width = container.clientWidth;
		canvas.height = container.clientHeight;
		var fontScale = 1;
		var fontScaleMaxTries = 50;
		var currentFontSize = 4;
		var ctx = canvas.getContext("2d");
		var grad = ctx.createLinearGradient(0,0,140,0);
		grad.addColorStop(0,"#A239CA");
		grad.addColorStop(1,"#4717F6");
		ctx.fillStyle = grad;
		ctx.fillRect(0,0,canvas.width,canvas.height);
		var logoText = document.getElementsByClassName("topLogoText")[0];
		logoText.style.font = "bold " + currentFontSize + "vw calibri";
		//Second, change the text depending on whether the screen is landscape or portrait
		//console.log("Inner height: " + window.innerHeight + ", inner width: " + window.innerWidth);
		if(window.innerHeight > window.innerWidth){ 	//Portrait mode
			logoText.innerHTML = "ARRAY<br>OF<br>THINGS";
		} else {	//Landscape mode
			logoText.innerHTML = "ARRAY OF THINGS";
		}
		//Third scale it as big as I can without overflow
		for (var i = 0; i < fontScaleMaxTries; ++i) {
			logoText.style.fontSize = (currentFontSize * fontScale) + "px";
			if (logoText.clientWidth >= container.clientWidth - (container.clientWidth*0.05) || logoText.clientHeight >= container.clientHeight - (container.clientHeight*0.05)) {
				logoText.style.fontSize = (currentFontSize * (fontScale - 0.1)) + "px";
				//console.log("Text width: " + logoText.clientWidth + ", canvas width: " + container.clientWidth + ", text height: " + logoText.clientHeight + ", canvas height: " + container.clientHeight + ", final font size: " + logoText.style.fontSize);
				break;
			}
			fontScale = fontScale + 0.1;
		}
		//Lastly, sort out the canvas text (using a separate Div, as there's more manipulation we can do!)
		logoText.style.left = (container.clientWidth/2 - logoText.clientWidth/2)  + "px";
		logoText.style.top = (container.clientHeight/2 - logoText.clientHeight/2)  + "px";
	} catch (err) {
		console.log(err);
	}
}


function getFontHeight() {
	var returnHeight;
	pa = document.body;
	var who= document.createElement('div');

	who.style.cssText='display:inline-block; padding:0; line-height:1; position:absolute; visibility:hidden; font-size:' + currentFontSize + 'vw; font-family:calibri';

	who.appendChild(document.createTextNode('ARRAY OF THINGS'));
	pa.appendChild(who);
	returnHeight = who.offsetHeight;
	pa.removeChild(who);
	return returnHeight;
}

//Draw the logo after finished resizing

var logoResizeRtime;
var logoResizeTimeout = false;
var logoResizeDelta = 10;

window.addEventListener("resize", function() {
    logoResizeRtime = new Date();
    if (logoResizeTimeout === false) {
        logoResizeTimeout = true;
        setTimeout(logoResizeend, logoResizeDelta);
    }
});

function logoResizeend() {
    if (new Date() - logoResizeRtime < logoResizeDelta) {
        setTimeout(logoResizeend, logoResizeDelta);
    } else {
        logoResizeTimeout = false;
        drawLogo();
    }               
}

//I think jQuery is overwriting the onload function. So I'm just going to keep trying to redraw the logo until it works.

//drawLogo();