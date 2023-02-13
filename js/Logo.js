function resizeLogoText() {
	if (typeof isInternetExplorer == "undefined") {
		setTimeout(resizeLogoText, 10);
		return;
	}
	let logoText = document.getElementsByClassName("topLogoTextContainer")[0];
	let fontScale = 1;
	let fontScaleMaxTries = 1000;
	let currentFontSize = 1;
	let fontStep = 0.2;
	let container = document.getElementsByClassName("logoContainer")[0];
	if(window.innerHeight > window.innerWidth){ 	//Portrait mode
		logoText.innerHTML = "ARRAY<br>OF<br>THINGS";
	} else {	//Landscape mode
		logoText.innerHTML = "ARRAY OF THINGS";
	}
	//Scale it as big as I can without overflow
	for (let i = 0; i < fontScaleMaxTries; ++i) {
		logoText.style.fontSize = (currentFontSize * fontScale) + "px";
			//console.log("Text width: " + logoText.clientWidth + ", canvas width: " + container.clientWidth + ", text height: " + logoText.clientHeight + ", canvas height: " + container.clientHeight + ", final font size: " + logoText.style.fontSize);
		if (logoText.clientWidth >= container.clientWidth - (container.clientWidth*0.05) || logoText.clientHeight >= container.clientHeight - (container.clientHeight*0.05)) {
			logoText.style.fontSize = (currentFontSize * (fontScale - fontStep)) + "px";
			//console.log("Dying...");
			break;
		}
		fontScale = fontScale + fontStep;
	}
	//Now centre the text div
	logoText.style.left = (container.clientWidth/2 - logoText.clientWidth/2)  + "px";
	logoText.style.top = (container.clientHeight/2 - logoText.clientHeight/2)  + "px";
}


function getFontHeight() {
	let returnHeight;
	pa = document.body;
	let who= document.createElement('div');

	who.style.cssText='display:inline-block; padding:0; line-height:1; position:absolute; visibility:hidden; font-size:' + currentFontSize + 'vw; font-family:calibri';

	who.appendChild(document.createTextNode('ARRAY OF THINGS'));
	pa.appendChild(who);
	returnHeight = who.offsetHeight;
	pa.removeChild(who);
	return returnHeight;
}

//Draw the logo after finished resizing

let logoResizeRtime;
let logoResizeTimeout = false;
let logoResizeDelta = 100;

addEvent("resize", window, function() {
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
        resizeLogoText();
    }               
}