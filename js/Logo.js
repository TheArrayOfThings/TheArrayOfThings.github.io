function drawLogo() {
	var c = document.getElementById("topLogo");
	c.height = c.clientHeight;
	c.width = c.clientWidth;
	var ctx = c.getContext("2d");
	var grad = ctx.createLinearGradient(0,0,140,0);
	grad.addColorStop(0,"orange");
	grad.addColorStop(1,"#f44e42");

	ctx.fillStyle = grad;
	ctx.fillRect(0,0,c.width,c.height);

	ctx.fillStyle = "black";
	ctx.font = "bold " + (c.width + c.height)/20 + "px calibri";
	ctx.fillText("Ryan Flanagan",c.width/10,c.height*0.65);
	console.log("Redrawn!");
}

window.onload = function () {
	drawLogo();
}
window.onresize = function () {
	drawLogo();
}