function drawLogo() {
	var c = document.getElementById("topLogo");
	var ctx = c.getContext("2d");
	var grad = ctx.createLinearGradient(0,0,140,0);
	grad.addColorStop(0,"orange");
	grad.addColorStop(1,"#f44e42");

	ctx.fillStyle = grad;
	ctx.fillRect(0,0,c.clientWidth,c.clientHeight);

	ctx.fillStyle = "black";
	ctx.font = "italic bold 22px calibri";
	ctx.fillText("Ryan Flanagan",c.clientWidth/4,c.clientHeight*0.7);
}
drawLogo();