var c = document.getElementById("topLogo");
var ctx = c.getContext("2d");
var grad = ctx.createLinearGradient(0,0,140,0);
grad.addColorStop(0,"orange");
grad.addColorStop(1,"#f44e42");

ctx.fillStyle = grad;
ctx.fillRect(0,0,140,38);

ctx.fillStyle = "black";
ctx.font = "italic bold 22px calibri";
ctx.fillText("Computering",12,25);