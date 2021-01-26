function getRandom (min, max)	{
	return Math.round(Math.random() * ((max - min) + min));
}

function arrays()	{
	var firstArray = ['Ryan', 'Lee', 'Flanagan'];
	var myString = "";
	var x;
	for (x = 0; x < 3; x++)
	{
		myString += firstArray[x] + ' ';
	}
	document.getElementById('testing').innerHTML = myString;
} 
function mult(num1, num2)	{
	var answer;
	answer = num1 * num2;
	return answer; //Return enables a function to be used multiple times. 
}
function ordInd(numb)	{
	numb = Number(numb);
	numb = Math.floor(numb);
	if (numb == 11 || numb == 12 || numb == 13)	{
		return numb + "th";
	}
	else if (isNaN(numb))	{
		return "Not a number..";
	}
	else	{
		switch (numb % 10)	{
			case 1:
				return numb + "st";
				break;
			case 2:
				return numb + "nd";
				break;
			case 3:
				return numb + "rd";
				break;
			default:
				return numb + "th";
		}
	}
}
var balloonObject = { //Variables declared outside a function can be accessed by any script or function. If you assign a value to a variable without declaring it (var)then it also becomes a global value (not good practice). 
	type:'round', 	//Objects are initialised with curley brackets {}
	colour:'orange', 
	pattern:'stars', 
	returnString: function()	{
		return "Balloon is " + balloonObject.type + " and " + balloonObject.colour + " and has the " + balloonObject.pattern + " pattern.";
	}
}
function objectTest()	{	//It appears that setting an object to undefined is better than setting it to 'null'
	document.getElementById('secondTest').innerHTML= balloonObject.returnString();
}
function changeBalloon()	{
	balloonObject.type = "oblong";
	balloonObject.colour = "yellow";
	balloonObject.pattern = "plain";
}
function locateString()	{
	var searchValue = document.getElementById('searchTerm').value; //Without calling the elements value, we assign the ID to the variable (not the contents).
	var stringValue = document.getElementById('stringLocate').value;
	var result = stringValue.indexOf(searchValue);
	if (result == -1)	{
		return "Search term not found in string";
	}
	else if	(result == 0)	{
		return "Please enter a seach term";
	}
	else	{
		return "Search term first found at character " + result;
	}
}
function promptFunction()	{ //This is just to remind me that prompts are a thing (might have been useful earlier)
	var userThing;	
	userThing = prompt('Enter a thing');
	if (userThing == null)	{
		return alert("You typed nothing :(");
	}
	else if	(userThing == "a thing")	{
		return alert("Ha ha you clever bastard");
	}
	else	{
		return alert("You typed: " + userThing);
	}
}
function globalMethods()	{
	var notRounded;
	var rounded;
	notRounded = ((Math.random() * 29) + 1); //'Math' is a global object, with global methods. If you want the square root, or power of, or PI - use Math. 
	rounded = Math.round(notRounded);
	return rounded;
}