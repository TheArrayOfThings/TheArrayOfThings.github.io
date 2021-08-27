'use strict';
//Enable strict mode

function TextBox(bWidthParam, bHeightParam, bXParam, bYParam) {
    let textbox = new Box(bWidthParam, bHeightParam, bXParam, bYParam);
    textbox.class = "textbox";
    textbox.tCanvas = undefined;
    textbox.context = undefined;
    textbox.currentX = 0;
	textbox.currentY = 0;
	textbox.textBuffer = [];
	textbox.linesToWrite = [];
	textbox.blinkInterval = undefined;
	textbox.arrowOn = false;
	textbox.instantText = false;
	textbox.endFunction = undefined;
	textbox.busy = false;
    textbox.load = function() {
        //Create the text canvas
        textbox.tCanvas = document.createElement('canvas');
        textbox.tCanvas.style.position = "absolute";
        textbox.tCanvas.style.width = (textbox.bWidth * tileSize - tileSize) + "px";
        textbox.tCanvas.width = (textbox.bWidth * tileSize - tileSize);
        textbox.tCanvas.style.height = (textbox.bHeight * tileSize - tileSize * 1.5) + "px";
        textbox.tCanvas.height = (textbox.bHeight * tileSize - tileSize * 1.5);
        //Create the background context
		textbox.context = textbox.tCanvas.getContext('2d');
		textbox.context.mozImageSmoothingEnabled = false;
		textbox.context.webkitImageSmoothingEnabled = false;
		textbox.context.msImageSmoothingEnabled = false;
		textbox.context.imageSmoothingEnabled = false;
        textbox.tCanvas.style.left = (textbox.bX * tileSize + tileSize / 2.25) + "px";
        textbox.tCanvas.style.top = (textbox.bY * tileSize + tileSize / 1.5) + "px";
        document.getElementById('menu').appendChild(textbox.tCanvas);
        textbox.tCanvas.style.display = "none";
        //Debug
        //textbox.tCanvas.style.border = "2px solid red";
    };
    textbox.showContents = function() {
        textbox.tCanvas.style.display = "block";
    };
    textbox.hideContents = function() {
        textbox.tCanvas.style.display = "block";
    };
    textbox.clear = function() {
        textbox.context.clearRect(0, 0, textbox.tCanvas.width, textbox.tCanvas.height);
        textbox.currentX = 0;
        textbox.currentY = 0;
    };
	textbox.startDialog = function(textToShow, instantParam, functionToRun) {
		textbox.parseText(textToShow);
		textbox.instantText = instantParam;
		textbox.endFunction = functionToRun;
		textbox.clear();
		textbox.currentY = -1;
        textbox.show();
		currentState = states.INDIALOG;
		//textbox.showNextArrow();
		textbox.blinkInterval = setInterval(function() {frameQueue.push(textbox.blink.bind(textbox));}, 528);
		textbox.nextLine();
	};
	textbox.parseText = function(toParse) {
		let lines = toParse.split("&");
		let words = "";
		let formattedLine = "";
		let currentLength = 0;
		for (let l = 0; l < lines.length; ++l) {
			currentLength = 0;
			formattedLine = "";
			words = lines[l].split(" ");
			for (let w = 0; w < words.length; ++w) {
				if (currentLength + words[w].length >= horzCharLimit) {
					currentLength = words[w].length;
					formattedLine += "&" + words[w] + " ";
				} else {
					currentLength = currentLength + words[w].length;
					formattedLine += words[w] + " ";
				}
			}
			textbox.linesToWrite.push(formattedLine);
		}
	};
	textbox.nextLine = function() {
		let toWrite = "";
		//If busy, ignore inputs
		if (textbox.busy) {
			return;
		}
		/*//Reset the current line
		if (textbox.currentY == 0) {
			textbox.currentY = 1;
			textbox.currentX = 0;
		} else {
			textbox.clear();
		}*/
		//Reset the current line
		switch (textbox.currentY) {
			case -1:
				textbox.clear();
			break;
			case 0:
				textbox.currentY = 1;
				textbox.currentX = 0;
			break;
			case 1:
				textbox.clear();
			break;
			default:
				textbox.currentY = textbox.currentY + 1;
				textbox.currentX = 0;
			break;
		}
		if (textbox.linesToWrite.length > 0) {
			toWrite = textbox.linesToWrite.shift();
			textbox.writeText(toWrite);
			if (textbox.linesToWrite.length == 0 && textbox.endFunction) {
				if (!textbox.instantText) {
					setTimeout(function() {
						textbox.endFunction();
						textbox.endFunction = undefined;
						textbox.busy = false;
					}, (textDelay+tickRate)*toWrite.length);
				} else {
					textbox.endFunction();
					textbox.endFunction = undefined;
					textbox.busy = false;
				}
			}
		} else {
			currentState = states.INOVERWORLD;
			textbox.hide();
			textbox.busy = false;
		}
	};
	textbox.writeText = function(toWrite) {
		textbox.busy = true;
		textbox.textBuffer = toWrite.split("");
		textbox.writeNextLetter();
	};
	textbox.writeLineInstant = function(toWrite) {
		let characters = toWrite.split("");
		for (let i = 0;i < characters.length; ++i) {
			textbox.writeLetter(characters[i]);
		}
		textbox.currentY = textbox.currentY + 1;
		textbox.currentX = 0;
	};
	textbox.showNextArrow = function() {
		textbox.arrowOn = true;
		if (textbox.currentY == 0) {
			textbox.context.drawImage(font, 14 * 8, 6 * 8, 8, 8, 20 * (tileSize / 3), 0, tileSize / 3, tileSize / 3);	
		} else {
			textbox.context.drawImage(font, 14 * 8, 6 * 8, 8, 8, 20 * (tileSize / 3), 1 * (tileSize), tileSize / 3, tileSize / 3);	
		}
	};
	textbox.hideNextArrow = function() {
		textbox.arrowOn = false;
		textbox.context.drawImage(font, 0, 4 * 8, 8, 8, 20 * (tileSize / 3), 0, tileSize / 3, tileSize / 3);	
		textbox.context.drawImage(font, 0, 4 * 8, 8, 8, 20 * (tileSize / 3), 1 * (tileSize), tileSize / 3, tileSize / 3);
	};
	textbox.blink = function() {
		if (textbox.busy) {
			if (textbox.arrowOn) {
				textbox.hideNextArrow();
			}
			return;
		}
		if (textbox.linesToWrite.length > 0) {
			if (textbox.arrowOn == false) {
				textbox.showNextArrow();
			} else {
				textbox.hideNextArrow();
			}
		} else {
			if (textbox.arrowOn) {
				textbox.hideNextArrow();
			}
			clearInterval(textbox.blinkInterval);
		}
	};
    textbox.drawLetter = function(x, y) {
        textbox.context.drawImage(font, x * 8, y * 8, 8, 8, textbox.currentX * (tileSize / 3), textbox.currentY * (tileSize), tileSize / 3, tileSize / 3);
        textbox.currentX = textbox.currentX + 1;
    };
    textbox.drawHalfLetter = function(x, y) {
        textbox.context.drawImage(font, x * 8, y * 8, 4, 8, textbox.currentX * (tileSize / 3), textbox.currentY * (tileSize), tileSize / 3, tileSize / 3);
        textbox.currentX = textbox.currentX + 0.5;
    };
	textbox.writeNextLetter = function() {
		if (textbox.textBuffer.length < 1) {
			return;
		}
		/*if (textbox.currentX > horzCharLimit) {
			if (textbox.currentY == 1) {
				textbox.clear();
			} else {
				textbox.currentY = 1;
				textbox.currentX = 0;
			}
		}*/
		textbox.writeLetter(textbox.textBuffer.shift());
		if (textbox.textBuffer.length > 0) {
			if (textbox.instantText) {
				textbox.writeNextLetter();
			} else {
				setTimeout(function() {frameQueue.push(textbox.writeNextLetter.bind(textbox));}, textDelay);
			}
		} else {
			textbox.busy = false;
		}
	};
	textbox.writeLetter = function(whichLetter) {
		switch (whichLetter) {
			//Row 1
			case "A":
				textbox.drawLetter(0, 0);
				break;
			case "B":
				textbox.drawLetter(1, 0);
				break;
			case "C":
				textbox.drawLetter(2, 0);
				break;
			case "D":
				textbox.drawLetter(3, 0);
				break;
			case "E":
				textbox.drawLetter(4, 0);
				break;
			case "F":
				textbox.drawLetter(5, 0);
				break;
			case "G":
				textbox.drawLetter(6, 0);
				break;
			case "H":
				textbox.drawLetter(7, 0);
				break;
			case "I":
				textbox.drawLetter(8, 0);
				break;
			case "J":
				textbox.drawLetter(9, 0);
				break;
			case "K":
				textbox.drawLetter(10, 0);
				break;
			case "L":
				textbox.drawLetter(11, 0);
				break;
			case "M":
				textbox.drawLetter(12, 0);
				break;
			case "N":
				textbox.drawLetter(13, 0);
				break;
			case "O":
				textbox.drawLetter(14, 0);
				break;
			case "P":
				textbox.drawLetter(15, 0);
				break;
			//Row 2
			case "Q":
				textbox.drawLetter(0, 1);
				break;
			case "R":
				textbox.drawLetter(1, 1);
				break;
			case "S":
				textbox.drawLetter(2, 1);
				break;
			case "T":
				textbox.drawLetter(3, 1);
				break;
			case "U":
				textbox.drawLetter(4, 1);
				break;
			case "V":
				textbox.drawLetter(5, 1);
				break;
			case "W":
				textbox.drawLetter(6, 1);
				break;
			case "X":
				textbox.drawLetter(7, 1);
				break;
			case "Y":
				textbox.drawLetter(8, 1);
				break;
			case "Z":
				textbox.drawLetter(9, 1);
				break;
			case "(":
				textbox.drawLetter(10, 1);
				break;
			case ")":
				textbox.drawLetter(11, 1);
				break;
			case ":":
				textbox.drawLetter(12, 1);
				break;
			case ";":
				textbox.drawLetter(13, 1);
				break;
			case "[":
				textbox.drawLetter(14, 1);
				break;
			case "]":
				textbox.drawLetter(15, 1);
				break;
			//Row 3
			case "a":
				textbox.drawLetter(0, 2);
				break;
			case "b":
				textbox.drawLetter(1, 2);
				break;
			case "c":
				textbox.drawLetter(2, 2);
				break;
			case "d":
				textbox.drawLetter(3, 2);
				break;
			case "e":
				textbox.drawLetter(4, 2);
				break;
			case "f":
				textbox.drawLetter(5, 2);
				break;
			case "g":
				textbox.drawLetter(6, 2);
				break;
			case "h":
				textbox.drawLetter(7, 2);
				break;
			case "i":
				textbox.drawLetter(8, 2);
				break;
			case "j":
				textbox.drawLetter(9, 2);
				break;
			case "k":
				textbox.drawLetter(10, 2);
				break;
			case "l":
				textbox.drawLetter(11, 2);
				break;
			case "m":
				textbox.drawLetter(12, 2);
				break;
			case "n":
				textbox.drawLetter(13, 2);
				break;
			case "o":
				textbox.drawLetter(14, 2);
				break;
			case "p":
				textbox.drawLetter(15, 2);
				break;
			//Row 4
			case "q":
				textbox.drawLetter(0, 3);
				break;
			case "r":
				textbox.drawLetter(1, 3);
				break;
			case "s":
				textbox.drawLetter(2, 3);
				break;
			case "t":
				textbox.drawLetter(3, 3);
				break;
			case "u":
				textbox.drawLetter(4, 3);
				break;
			case "v":
				textbox.drawLetter(5, 3);
				break;
			case "w":
				textbox.drawLetter(6, 3);
				break;
			case "x":
				textbox.drawLetter(7, 3);
				break;
			case "y":
				textbox.drawLetter(8, 3);
				break;
			case "z":
				textbox.drawLetter(9, 3);
				break;
			case "é":
				textbox.drawLetter(10, 3);
				break;
			case "d́":
				textbox.drawLetter(11, 3);
				break;
			case "í":
				textbox.drawLetter(12, 3);
				break;
			case "ś":
				textbox.drawLetter(13, 3);
				break;
			case "t́":
				textbox.drawLetter(14, 3);
				break;
			case "v́":
				textbox.drawLetter(15, 3);
				break;
			//Row 5 + 6 are blank
			//Row 7
			case "'":
				textbox.drawHalfLetter(0, 6);
				break;
			case "£": //Pokemon symbol
				textbox.drawLetter(1, 6);
				break;
			case "$": //Mn symbol?
				textbox.drawLetter(2, 6);
				break;
			//Skipped some
			case "?":
				textbox.drawLetter(6, 6);
				break;
			case "!":
				textbox.drawLetter(7, 6);
				break;
			case ".":
				textbox.drawLetter(8, 6);
				break;
			case "#": //Right arrow empty
				textbox.drawLetter(12, 6);
				break;
			case ">": //Right arrow full
				textbox.drawLetter(13, 6);
				break;
			case "^": //Down arrow
				textbox.drawLetter(14, 6);
				break;
			case "+": //Male symbol
				textbox.drawLetter(15, 6);
				break;
			//Row 8
			//END
			//Skipped some
			case "/":
				textbox.drawLetter(3, 7);
				break;
			case ",":
				textbox.drawLetter(4, 7);
				break;
			case "-": //Female symbol
				textbox.drawLetter(5, 7);
				break;
			case "0":
				textbox.drawLetter(6, 7);
				break;
			case "1":
				textbox.drawLetter(7, 7);
				break;
			case "2":
				textbox.drawLetter(8, 7);
				break;
			case "3":
				textbox.drawLetter(9, 7);
				break;
			case "4":
				textbox.drawLetter(10, 7);
				break;
			case "5":
				textbox.drawLetter(11, 7);
				break;
			case "6":
				textbox.drawLetter(12, 7);
				break;
			case "7":
				textbox.drawLetter(13, 7);
				break;
			case "8":
				textbox.drawLetter(14, 7);
				break;
			case "9":
				textbox.drawLetter(15, 7);
				break;
			//Rows end
			//New line
			case "&":
				//This character moves to the next line, irrespective of the length of the current line
				if (textbox.currentY == 0) {
					textbox.currentY = 1;
					textbox.currentX = 0;
				} else {
					textbox.clear();
				}
				break;
				//New line w/ clear
			case "~":
				//This character moves to the next line, irrespective of the length of the current line and clears it first
				textbox.clear();
				break;
			default:
				if (this.currentX != 0 || whichLetter != " ") {
					textbox.drawLetter(0, 4);
				}
				break;
		}
	};
    textbox.load();
    return textbox;
}



//End