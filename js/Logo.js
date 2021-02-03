function drawLogo() {
	try {
		var canvas = document.getElementById("topLogo");
		var container = document.getElementsByClassName("logoContainer")[0];
		canvas.height = container.clientHeight;
		var ctx = canvas.getContext("2d");
		ctx.font = "bold  1vw calibri";
		//canvas.width = ctx.measureText("ArrayThings").width;
		container.width = ctx.measureText("ArrayThings").width;
		var grad = ctx.createLinearGradient(0,0,140,0);
		grad.addColorStop(0,"orange");
		grad.addColorStop(1,"#f44e42");

		ctx.fillStyle = grad;
		ctx.fillRect(0,0,canvas.width,canvas.height);

		ctx.fillStyle = "black";
		ctx.textAlign = "center";
		ctx.font = "bold  1vw calibri";
		ctx.fillText("Array", (canvas.width/2) - (ctx.measureText("Array").width/1.2), canvas.height*0.3);
		ctx.fillText("of", (canvas.width/2) - (ctx.measureText("of").width/2), (canvas.height*0.6));
		ctx.fillText("Things", (canvas.width/2) + (ctx.measureText("Things").width/2), (canvas.height*0.9));
		console.log("Success!");
	} catch (err) {
		console.log("Failed...");
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