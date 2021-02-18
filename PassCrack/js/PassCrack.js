var passString = "abcdefghijklmnopqrstuvwxzy";
passString += passString.toUpperCase();
passString += "1234567890-=!£$%^&*()_+|\\\",<.>/?;:'@#~[{]}`¬ ";
function getRandom	(min, max)	{
	return Math.floor(Math.random() * (max - min)) + min;
}
function returnRandChar ()	{
	return  passString.charAt(getRandom(0, passString.length));
}
function plain(outputString)	{
	outputString = outputString.replace(/&/g, "&amp;");
	outputString = outputString.replace(/</g, "&#60;");
	outputString = outputString.replace(/>/g, "&#62;");
	outputString = outputString.replace(/\"/g, "&quot;");
	outputString = outputString.replace(/'/g, "&apos;")
	return outputString;
}	
function passCrack ()	{
	var startTime = (new Date().getTime());
	var pass = document.getElementById("passInput").value;
	var passElement = document.getElementById('passCrack');
	var guessString = "";
	var guesses = 0;
	var time;
	while (pass != guessString)	{
		++guesses;
		guessString = "";
		while (guessString.length < pass.length)	{
			guessString += returnRandChar();
		}
	}
	time = ((new Date().getTime()) - startTime);
	if (pass != "")	{
		passElement.innerHTML = "Final guess is: " + guessString + "<br / > This took " + guesses + " tries." + "<br />This took " + (time / 1000) + " seconds" + "<br/> Here are the guesses: <br />" + plain(guesses);
	}
	else	{
		passElement.innerHTML = "You did not enter a password :(";
	}
}