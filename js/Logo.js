function drawLogo() {
	var canvas = document.getElementById("topLogo");
	var container = document.getElementsByClassName("logoContainer")[0];
	canvas.height = container.clientHeight;
	canvas.width = container.clientWidth;
	var ctx = canvas.getContext("2d");
	var grad = ctx.createLinearGradient(0,0,140,0);
	grad.addColorStop(0,"orange");
	grad.addColorStop(1,"#f44e42");

	ctx.fillStyle = grad;
	ctx.fillRect(0,0,canvas.width,canvas.height);

	ctx.fillStyle = "black";
	ctx.font = "bold " + (canvas.height/2) + "px calibri";
	ctx.textAlign = "center";
	ctx.fillText("The Array Of Things", canvas.width/2, canvas.height/1.5);
	console.log("Success!");
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

function tryDrawLogo() {
	try {
		console.log("Trying to draw the logo...");
		drawLogo();
	} catch (error) {
		setTimeout(drawLogo, 10);
	}
}

tryDrawLogo();