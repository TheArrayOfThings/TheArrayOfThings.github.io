function drawLogo() {
	try {
		var fontString = "bold 2vmin calibri";
		var canvas = document.getElementById("topLogo");
		var container = document.getElementsByClassName("logoContainer")[0];
		canvas.height = container.clientHeight;
		var ctx = canvas.getContext("2d");
		if(window.innerHeight > window.innerWidth){ //Portrait mode
			ctx.font = fontString;
			canvas.width = ctx.measureText("    THINGS    ").width;
			container.width = canvas.width;
			var grad = ctx.createLinearGradient(0,0,140,0);
			grad.addColorStop(0,"#A239CA");
			grad.addColorStop(1,"#4717F6");

			ctx.fillStyle = grad;
			ctx.fillRect(0,0,canvas.width,canvas.height);

			ctx.fillStyle = "white";
			ctx.textAlign = "center";
			ctx.font = fontString;
			ctx.fillText("ARRAY", (canvas.width/2), canvas.height/3.5);
			ctx.fillText("OF", (canvas.width/2), canvas.height/1.7);
			ctx.fillText("THINGS", (canvas.width/2), canvas.height/1.1);
		} else { //Landscape mode
			ctx.font = fontString;
			canvas.width = ctx.measureText(" ARRAY OF THINGS ").width;
			container.width = canvas.width;
			var grad = ctx.createLinearGradient(0,0,140,0);
			grad.addColorStop(0,"#A239CA");
			grad.addColorStop(1,"#4717F6");

			ctx.fillStyle = grad;
			ctx.fillRect(0,0,canvas.width,canvas.height);

			ctx.fillStyle = "white";
			ctx.textAlign = "center";
			ctx.font = fontString;
			ctx.fillText("ARRAY OF THINGS", (canvas.width/2), canvas.height/1.5);
		}
	} catch (err) {
		setTimeout(drawLogo, 10);
	}
}

//Draw the logo after finished resizing

var rtime;
var timeout = false;
var delta = 200;
window.onresize = function() {
    rtime = new Date();
    if (timeout === false) {
        timeout = true;
        setTimeout(resizeend, delta);
    }
}

function resizeend() {
    if (new Date() - rtime < delta) {
        setTimeout(resizeend, delta);
    } else {
        timeout = false;
        drawLogo();
    }               
}

//I think jQuery is overwriting the onload function. So I'm just going to keep trying to redraw the logo until it works.

drawLogo();