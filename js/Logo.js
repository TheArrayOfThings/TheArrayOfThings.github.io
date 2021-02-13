var currentFontSize = 5;
function drawLogo() {
	var fontSizeMaxAttempts = 200;
	try {
		var canvas = document.getElementById("topLogo");
		var container = document.getElementsByClassName("logoContainer")[0];
		canvas.width = container.clientWidth;
		canvas.height = container.clientHeight;
		var startFontSize = 5;
		var fontSizeStep = 0.5;
		currentFontSize = 5;
		var ctx = canvas.getContext("2d");
		if(window.innerHeight > window.innerWidth){ //Portrait mode
			var grad = ctx.createLinearGradient(0,0,140,0);
			grad.addColorStop(0,"#A239CA");
			grad.addColorStop(1,"#4717F6");

			ctx.fillStyle = grad;
			ctx.fillRect(0,0,canvas.width,canvas.height);

			ctx.fillStyle = "white";
			ctx.textAlign = "center";
			ctx.font = "bold " + startFontSize + "vw calibri";
			for (var i = 0; i < fontSizeMaxAttempts; ++i) {
				console.log("Loop");
				if (ctx.measureText("THINGS").width > canvas.clientWidth) {
					currentFontSize = currentFontSize - fontSizeStep;
					ctx.font = "bold " + currentFontSize + "vw calibri";
				} else {
					break;
				}
			}
			for (var i = 0; i < fontSizeMaxAttempts; ++i) {
				console.log("Loop");
				if (getFontHeight()*3 > canvas.clientHeight) {
					currentFontSize = currentFontSize - fontSizeStep;
					ctx.font = "bold " + currentFontSize + "vw calibri";
				} else {
					break;
				}
			}
			ctx.fillText("ARRAY", (canvas.width/2), canvas.height/3.5);
			ctx.fillText("OF", (canvas.width/2), canvas.height/1.7);
			ctx.fillText("THINGS", (canvas.width/2), canvas.height/1.1);
		} else { //Landscape mode
			var grad = ctx.createLinearGradient(0,0,140,0);
			grad.addColorStop(0,"#A239CA");
			grad.addColorStop(1,"#4717F6");

			ctx.fillStyle = grad;
			ctx.fillRect(0,0,canvas.width,canvas.height);

			ctx.fillStyle = "white";
			ctx.textAlign = "center";
			ctx.font = "bold " + startFontSize + "vw calibri";
			for (var i = 0; i < fontSizeMaxAttempts; ++i) {
				if (ctx.measureText("ARRAY OF THINGS").width > canvas.clientWidth) {
					currentFontSize = currentFontSize - fontSizeStep;
					ctx.font = "bold " + currentFontSize + "vw calibri";
				} else {
					break;
				}

			}
			ctx.fillText("ARRAY OF THINGS", (canvas.width/2), canvas.height/1.5);
		}
	} catch (err) {
		setTimeout(drawLogo, 10);
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
var logoResizeDelta = 200;

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

drawLogo();