"use strict";

//Fundamental variable declaration
var topSection;
var bottomSection;
var leftSection;
var rightSection;
var background;
var playable;
var pixelWidth;
var pixelHeight;
var playableWidth;
var playableHeight;
var lostHorizontalPixels;
var lostVerticalPixels;
var entitySize = 10;
var currentPowerUp;
var persHighScore = 0;
var persHighScoreBox;
var servHighScore = 0;
var servHighScoreBox;
var scoreLabels;
var scores;
var resizeSnakeyRtime;
var resizeSnakeyTimeout = false;
var resizeSnakeyDelta = 200;
var infoLog;
var pauseButton;

//Game settings
var scale = 4;
var twoPlayers = false;
var aiNumber = 0;
var aliveAI = 0;
var colorArray =  [];
var aiNameArray = [];
var initialPieces = 10;
var tickRate = 50;
var frameInterval;
var resetting = true;
var powerUp;
var powerUpColour = 'orange';
var effects;
var snakeResults = "";
var showAllSettings = true;
var paused = false;
var classicSnake = false;

//Snakes
var playerOne;
var playerTwo;
var playerOneName = "Player 1";
var playerTwoName = "Player 2";

//Enemies
var enemyCount = 1;
var aliveEnemies = 0;
var moveDirections = ['left', 'right', 'up', 'down', 'none'];
var enemyMovementDelay = 16;

//Entities
var allEntities = [];
var toKill = [];

addEvent("load", window, pageLoaded);

function pageLoaded() {
	if (topBarLoaded != true || typeof isInternetExplorer == "undefined") {
		setTimeout(pageLoaded, 100);
	}
	effects = new Effects();
	//Grab required elements from page
	background = document.getElementById('background');
	playable = document.getElementById('playable');
	persHighScoreBox = document.getElementsByClassName('pershighscore')[0];
	pauseButton = document.getElementById("pause");
	//servHighScoreBox = document.getElementsByClassName('servhighscore')[0];
	scoreLabels = document.getElementsByClassName('scoreLabels')[0];
	scores = document.getElementsByClassName('scores')[0];
	topSection = document.getElementById('topSection');
	bottomSection = document.getElementById('bottomSection');
	leftSection = document.getElementById('leftSection');
	rightSection = document.getElementById('rightSection');
	infoLog = document.getElementById('info');
	
	//Run compatibility checks/fixes
	if (!isInternetExplorer) {
		//If PersonalHighScore present, set to this!
		if (localStorage.getItem("PersonalHighScore") != null) {
			persHighScore = parseInt(localStorage.getItem("PersonalHighScore"));
			persHighScoreBox.innerHTML = persHighScore + " (" + localStorage.getItem("PersonalHighScoreName") + ")";
			//Post the high score in case the server has been restarted
			//postHighScore(localStorage.getItem("PersonalHighScoreName"), parseInt(localStorage.getItem("PersonalHighScore")));
		}
	}

	//The following was used on a server verstion that cached high scores
	/*getHighScore();
	//Call getHighScore every 5 minutes to keep the server highscore up to date
	setInterval(getHighScore, 300000);*/
	showAllSettings = false;
	setupStart();
	//Add settings event to settings button
	addEvent("click", document.getElementById("settings"), function() {showAllSettings = true;setupStart();});
	//Add pause functionality to Pause
	addEvent("click", pauseButton, pauseGame);
	//Add my keyparse event
	addEvent("keydown", document, keyParse);
	//Handle resize of window
	addEvent("resize", window, function() {
		if (resetting) {
			return;
		}
		resizeSnakeyRtime = new Date();
		if (resizeSnakeyTimeout === false) {
			resizeSnakeyTimeout = true;
			setTimeout(snakeyResizeend, resizeSnakeyDelta);
		}
	});
}
function setupStart() {
	if (!isInternetExplorer) {
		//Sort out player names
		if (localStorage.getItem("PlayerOneName") != null && showAllSettings == false) {
			//Grab playerOneName from cookie
			playerOneName = localStorage.getItem("PlayerOneName");
			mobileSetup();
		} else {
			//Get player 1 name from user
			if (localStorage.getItem("PlayerOneName") != null) {
				startPromptModal("Player 1", "Choose a name for player 1!", "Player 1 Name: ", localStorage.getItem("PlayerOneName"), playerOneNameReceived);
			} else {
				startPromptModal("Player 1", "Choose a name for player 1!", "Player 1 Name: ", "Player 1", playerOneNameReceived);
			}
		}
	} else {
		startPromptModal("Player 1", "Choose a name for player 1!", "Player 1 Name: ", "Player 1", playerOneNameReceived);
	}
}

function playerOneNameReceived() {
	playerOneName = modalInput.value;
	//Trim playerOneName
	playerOneName = playerOneName.trim();
	if (playerOneName == '' || playerOneName == null) {
		playerOneName = "Player 1";
	} else {
		if (!isInternetExplorer) {
			localStorage.setItem("PlayerOneName", playerOneName);
		}
	}
	mobileSetup(true);
}

function mobileSetup() {
	//On mobile device?
	if(/Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent)) {
		//Yes - so add touch control
		document.getElementById("topSectionVisible").style.display = "unset";
		document.getElementById("bottomSectionVisible").style.display = "unset";
		document.getElementById("leftSectionVisible").style.display = "unset";
		document.getElementById("rightSectionVisible").style.display = "unset";
		addEvent("touchstart", topSection, function() {startMove('up', playerOne);});
		addEvent("touchstart", bottomSection, function() {startMove('down', playerOne);});
		addEvent("touchstart", leftSection, function() {startMove('left', playerOne);});
		addEvent("touchstart", rightSection, function() {startMove('right', playerOne);});
		selectAI();
		} else {
			if (showAllSettings || !!isInternetExplorer || localStorage.getItem("TwoPlayers") == null) {
				startConfirmModal("Two players?", "Do you want to enable two players?", twoPlayerTurnedOn, twoPlayerTurnedOff);
				return;
			} else {
				twoPlayers = localStorage.getItem("TwoPlayers") == "true" ? true:false;
			}
			if (twoPlayers) {
				twoPlayerTurnedOn();
				return;
			} else {
				selectAI();
				return;
			}
		}
}
function twoPlayerTurnedOn() {
	twoPlayers = true;
	localStorage.setItem("TwoPlayers", twoPlayers);
	if (localStorage.getItem("PlayerTwoName") == null || showAllSettings == true) {
		if (localStorage.getItem("PlayerTwoName") != null) {
			startPromptModal("Player 2", "Choose a name for player 2!", "Player 2 Name: ", localStorage.getItem("PlayerTwoName"), playerTwoNameReceivedFromModal);
			return;
		} else {
			startPromptModal("Player 2", "Choose a name for player 2!", "Player 2 Name: ", "Player 2", playerTwoNameReceivedFromModal);
			return;
		}
	} else if (localStorage.getItem("PlayerTwoName") != null) {
		playerTwoName = localStorage.getItem("PlayerTwoName");
		selectAI();
		return;
	}
}
function twoPlayerTurnedOff() {
	twoPlayers = false;
	localStorage.setItem("TwoPlayers", false);
	selectAI();
}
function playerTwoNameReceivedFromModal() {
	playerTwoName = modalInput.value;
	//Trim playerTwoName
	playerTwoName = playerTwoName.trim();
	if (playerTwoName == '' || playerTwoName == null) {
		playerTwoName = "Player 2";
	}
	if (playerOneName == playerTwoName) {
		playerOneName += " 1";
		playerTwoName += " 2";
	}
	localStorage.setItem("PlayerTwoName", playerTwoName);
	selectAI();
}
function selectAI() {
	if (!isInternetExplorer && localStorage.getItem("AINumber") != null) {
		if (showAllSettings == true) {
			startPromptModal("Play with AI?", "How many AI snakes do you want to play with (max 5!)?", "How many : ", localStorage.getItem("AINumber"), aiNumberReceivedFromModal);
			return;
		} else {
			aiNumber = localStorage.getItem("AINumber");
			resetColours();
			return;
		}
	} else {
		startPromptModal("Play with AI?", "How many AI snakes do you want to play with (max 5!)?", "How many : ", "5", aiNumberReceivedFromModal);
		return;
	}
}

function aiNumberReceivedFromModal() {
	var tempAIs = modalInput.value;
	if (!tempAIs || isNaN(parseInt(tempAIs))) {
		aiNumber = 0;
	} else {
		if (tempAIs > 5) {
			tempAIs = 5;
		}
		aiNumber = parseInt(tempAIs);
	}
	localStorage.setItem("AINumber", aiNumber);
	resetColours();
}

function resetColours() {
	if (!isInternetExplorer) {
		//Offer the ability to reset colours
		if (showAllSettings) {
			startConfirmModal("Reset Colours?", "Do you want reset your colours?", doResetColours, chooseClassic);
			return
		}
	} 
	chooseClassic();
}
function doResetColours() {
	localStorage.removeItem("SnakePrimary" + playerOneName);
	localStorage.removeItem("SnakeSecondary" + playerOneName);
	localStorage.removeItem("SnakeEye" + playerOneName);
	localStorage.removeItem("SnakePrimary" + playerTwoName);
	localStorage.removeItem("SnakeSecondary" + playerTwoName);
	localStorage.removeItem("SnakeEye" + playerTwoName);
	chooseClassic();
}
function chooseClassic() {
	if (showAllSettings || !!isInternetExplorer || localStorage.getItem("ClassicSnake") == null) {
		classicSnake = false;
		localStorage.setItem("ClassicSnake", false);
		startConfirmModal("Classic Snake?", "Do you want to enable classic-style Snake?", classicSnakeTurnedOn, classicSnakeTurnedOff);
		return;
	} else {
		classicSnake = localStorage.getItem("ClassicSnake") == "true" ? true:false;
		resetEverything();
		return;
	}
}
function classicSnakeTurnedOn() {
	classicSnake = true;
	if (!isInternetExplorer) {
		localStorage.setItem("ClassicSnake", classicSnake);
	}
	resetEverything();
}
function classicSnakeTurnedOff() {
	classicSnake = false;
	if (!isInternetExplorer) {
		localStorage.setItem("ClassicSnake", classicSnake);
	}
	resetEverything();
}
function startMove(moveDirection, whichSnake) {
	whichSnake.travelDirection = moveDirection;
	//Start all snakes/enemies moving
	if (frameInterval == undefined) {
		frameInterval = setInterval(nextFrame, tickRate);
	}
}
function setPlayable() {
	lostVerticalPixels = pixelHeight % entitySize;
	lostHorizontalPixels = pixelWidth % entitySize;	
	/*console.log("PixelHeight = " + pixelHeight);
	console.log("PixelWidth = " + pixelWidth);
	console.log("LostVertical = " + lostVerticalPixels);
	console.log("LostHorizontal = " + lostHorizontalPixels);
	console.log("EntitySize = " + entitySize);*/
	if (lostVerticalPixels % 2 != 0) {
		--lostVerticalPixels;
	}
	if (lostHorizontalPixels % 2 != 0) {
		--lostHorizontalPixels;
	}
	playableHeight = (pixelHeight - lostVerticalPixels);
	playableWidth = (pixelWidth - lostHorizontalPixels);
	playable.style.height = playableHeight + 'px';
	playable.style.width = playableWidth + 'px';
	playable.style.left = lostHorizontalPixels/2 + 'px';
	playable.style.top = lostVerticalPixels/2 + 'px';
}
function setScoreBoard() {
	var scoreBoard = document.getElementsByClassName('scoreboard');
	for (var i = 0; i <  scoreBoard.length; ++i) {
		scoreBoard[i].style.fontSize = entitySize/2 + 'px';
		scoreBoard[i].style.overflow = 'hidden';
	}
}
function scaleButtons() {
	//var buttons = document.getElementsByTagName('button');
	/*for (var i = 0; i < buttons.length; ++i) {
		buttons[i].style.fontSize = entitySize + 'px';
		buttons[i].style.overflow = 'hidden';
	}*/
	var sectionButtons = document.getElementsByClassName('section');
	var sectionHeight = parseInt(pixelHeight/10) + 'px'	;
	var sectionWidth = parseInt(sectionHeight.replace('px', '')) * 2 + 'px';
	for (var i = 0; i < sectionButtons.length; ++i) {
		sectionButtons[i].style.width = sectionWidth;
		sectionButtons[i].style.height = sectionHeight;
		if (sectionButtons[i].id.indexOf('bottomSection') != -1) {
			sectionButtons[i].style.bottom = '5px';
			sectionButtons[i].style.left = ((pixelWidth/2) - (parseInt(sectionWidth.replace('px', ''))/2)) + 'px';
		} else if (sectionButtons[i].id.indexOf('topSection') != -1) {
			sectionButtons[i].style.bottom = ((parseInt(sectionHeight.replace('px', ''))*2)) + 5 + 'px';
			sectionButtons[i].style.left = ((pixelWidth/2) - (parseInt(sectionWidth.replace('px', ''))/2)) + 'px';
		} else if (sectionButtons[i].id.indexOf('leftSection') != -1) {
			sectionButtons[i].style.bottom = (parseInt(sectionHeight.replace('px', ''))) + 5 + 'px';
			sectionButtons[i].style.left = ((pixelWidth/2) - parseInt(sectionWidth.replace('px', ''))) + 'px';
		} else if (sectionButtons[i].id.indexOf('rightSection') != -1) {
			sectionButtons[i].style.bottom = (parseInt(sectionHeight.replace('px', ''))) + 5 + 'px';
			sectionButtons[i].style.left = (pixelWidth/2) + 'px';
		}
		if (sectionButtons[i].id.indexOf('Visible') == -1) {
			sectionButtons[i].style.left = (getLeft(sectionButtons[i]) + lostHorizontalPixels/2) + "px";
		}
	}
}
function snakeyResizeend() {
	var newPixelWidth = background.clientWidth;
	if (newPixelWidth % 2 != 0) {
		--newPixelWidth;
	}
	var newPixelHeight = background.clientHeight;
	if (newPixelHeight % 2 != 0) {
		--newPixelHeight;
	}
	if (newPixelHeight == pixelHeight && newPixelWidth == pixelWidth) {
		return;
	}
	if (new Date() - resizeSnakeyRtime < resizeSnakeyDelta) {
		setTimeout(snakeyResizeend, resizeSnakeyDelta);
	} else {
		resizeSnakeyTimeout = false;
		resetEverything();
	}               
}
function keyParse(e) {
	if (modalVisible || paused) {
		return;
	}
	if (e.code) {
		if (e.code == "KeyW") {
			startMove('up', playerOne);
		} else if (e.code == "KeyS") {
			startMove('down', playerOne);
		} else if (e.code == "KeyA") {
			startMove('left', playerOne);
		} else if (e.code == "KeyD") {
			startMove('right', playerOne);
		}
		if (twoPlayers) {
			if (e.code == "ArrowUp") {
				startMove('up', playerTwo);
			} else if (e.code == "ArrowDown") {
				startMove('down', playerTwo);
			} else if (e.code == "ArrowLeft") {
				startMove('left', playerTwo);
			} else if (e.code == "ArrowRight") {
				startMove('right', playerTwo);
			}
		}
	} else {
		if (e.keyCode == 87) {
			startMove('up', playerOne);
		} else if (e.code == 83) {
			startMove('down', playerOne);
		} else if (e.code == 65) {
			startMove('left', playerOne);
		} else if (e.code == 68) {
			startMove('right', playerOne);
		}
		if (twoPlayers) {
			if (e.code == 38) {
				startMove('up', playerTwo);
			} else if (e.code == 40) {
				startMove('down', playerTwo);
			} else if (e.code == 37) {
				startMove('left', playerTwo);
			} else if (e.code == 39) {
				startMove('right', playerTwo);
			}
		}
	}

}
function powerUpHit(whichSnake) {
	if (resetting) {
		return;
	}
	whichSnake.internalScore = whichSnake.internalScore + 1;
	whichSnake.scoreBox.innerHTML = whichSnake.internalScore;
	if (whichSnake.internalScore > persHighScore && whichSnake.aiDriven == false) {
		persHighScore = whichSnake.internalScore;
		persHighScoreBox.innerHTML = persHighScore + " (" + whichSnake.snakeName + ")";
		if (!isInternetExplorer) {
			localStorage.setItem("PersonalHighScore", persHighScore);
			localStorage.setItem("PersonalHighScoreName", whichSnake.snakeName);
			//postHighScore(whichSnake.snakeName, whichSnake.internalScore);
		}
	}
	whichSnake.appendSegment().style.display = 'none';
	if (!classicSnake) {
		effects.getRandomEffect()(whichSnake);
	}
	randomiseLocation(powerUp.collisionDiv);
}
/*function enemyKilled(whichBullet) {
	if (resetting) {
		return;
	}
	whichBullet.parentSnake.internalScore = whichBullet.parentSnake.internalScore + 1;
	whichBullet.parentSnake.scoreBox.innerHTML = whichBullet.parentSnake.internalScore;
	if (whichBullet.parentSnake.internalScore > persHighScore && whichBullet.parentSnake.aiDriven == false) {
		persHighScore = whichBullet.parentSnake.internalScore;
		persHighScoreBox.innerHTML = persHighScore + " (" + whichBullet.parentSnake.snakeName + ")";
		if (!isInternetExplorer) {
			localStorage.setItem("PersonalHighScore", persHighScore);
			localStorage.setItem("PersonalHighScoreName", whichBullet.parentSnake.snakeName);
			//postHighScore(whichBullet.parentSnake.snakeName, whichBullet.parentSnake.internalScore);
		}
	}
}*/

function gameLost(whichSnake) {
	if (resetting) {
		return;
	}
	var resultString = "Round over - " + whichSnake.snakeName + " died!<br>";
	for (var i = 0; i < allEntities.length; ++i) {
		if (allEntities[i].entityClass == 'snake') {
			if (snakeResults.indexOf(allEntities[i].snakeName + " scored " + allEntities[i].internalScore + "<br>") == -1) {
				resultString += allEntities[i].snakeName + " scored " + allEntities[i].internalScore + "<br>";
			}
		}
	}
	resultString += snakeResults;
	snakeResults = "";
	startAlertModal("Game over!", resultString, function () {
		resetEverything();
	});
}
function nextFrame() {
	if (getLeft(playerOne.collisionDiv) % entitySize > 0) {
		console.log("Snake is out of sync! Left coordinate = " + getLeft(playerOne.collisionDiv) + " out of sync by = " + getLeft(playerOne.collisionDiv) % entitySize);
	}
	if (getTop(playerOne.collisionDiv) % entitySize > 0) {
		console.log("Snake is out of sync! Top coordinate = " + getTop(playerOne.collisionDiv) + " out of sync by = " + getTop(playerOne.collisionDiv) % entitySize);
	}
	//console.log(getLeft(playerOne.collisionDiv));
	if (resetting) {
		return;
	}
	if (modalVisible || paused) {
		return;
	}
	var tempArray = [];
	//Cleanup killed objects
	for (var i = 0; i < allEntities.length; ++i) {
		if (allEntities[i].isDead == false) {
			tempArray.push(allEntities[i]);
		} else {
		  allEntities[i] = undefined;
		}
	}
	allEntities = tempArray;
	//First, check if any entities have collided
	for (var i = 0; i < allEntities.length; ++i) {
		try {
			//Check if collided with another entity
			for (var e = 0; e < allEntities.length; ++e) {
				try {
					if (allEntities[i] == allEntities[e]) {
						continue;
					}
					if (getLeft(allEntities[i].collisionDiv) == getLeft(allEntities[e].collisionDiv)) {
						if (getTop(allEntities[i].collisionDiv) == getTop(allEntities[e].collisionDiv)) {
							//Something is colliding
							var firstCollided = allEntities[i];
							var secondCollided = allEntities[e];
							//Snake hit powerup
							if (firstCollided.entityClass == 'snake' && secondCollided.entityClass == 'powerup') {
								powerUpHit(firstCollided);
								continue;
							}
							if (firstCollided.entityClass == 'powerup' && secondCollided.entityClass == 'snake') {
								powerUpHit(secondCollided);
								continue;
							}
							//Bullet hit enemy
							if (firstCollided.entityClass == 'bullet' && secondCollided.entityClass == 'enemy') {
								//enemyKilled(firstCollided);
								secondCollided.kill();
								continue;
							}
							//Enemy hit bullet
							if (firstCollided.entityClass == 'enemy' && secondCollided.entityClass == 'bullet') {
								//enemyKilled(secondCollided);
								firstCollided.kill();
								continue;
							}
							//Save snakes from bullets
							if (firstCollided.entityClass == 'snake' && secondCollided.entityClass == 'bullet') {
								secondCollided.kill();
								continue;
							}
							//Save snakes from bullets
							if (secondCollided.entityClass == 'snake' && firstCollided.entityClass == 'bullet') {
								firstCollided.kill();
								continue;
							}
							//Teleport powerup when collide with snakesegment (it happens... somehow)
							if (firstCollided.entityClass == 'snakesegment' && secondCollided.entityClass == 'powerup' || firstCollided.entityClass == 'powerup' && secondCollided.entityClass == 'snakesegment') {
								randomiseLocation(powerUp.collisionDiv);
								continue;
							}
							//Do not kill powerups or snake segments
							if (firstCollided.entityClass != 'powerup' && firstCollided.entityClass != 'snakesegment') {
								firstCollided.kill();
							}
							//Do not kill powerups or snake segments
							if (secondCollided.entityClass != 'powerup' && secondCollided.entityClass != 'snakesegment') {
								secondCollided.kill();
							}
						}
					}
				}  catch (err) {
					continue;
				}
			}
		//Check if hit edge (if not snakesegment!
		if (allEntities[i].entityClass != 'snakesegment') {
			//if(allEntities[i].entityClass != 'snakesegment') {
				if (getLeft(allEntities[i].collisionDiv) >= playableWidth) {
					//Has hit the right wall
					allEntities[i].collisionDiv.style.left = 0 + "px";
					if (allEntities[i].visibleDiv != undefined) {
						allEntities[i].visibleDiv.style.left = (allEntities[i].visibleOffSet) + "px";
					}
					allEntities[i].hasTeleported = true;
				} else if (getLeft(allEntities[i].collisionDiv) <= -entitySize) {
					//Has hit the left wall
					allEntities[i].collisionDiv.style.left = (playableWidth - entitySize) + "px";
					if (allEntities[i].visibleDiv != undefined) {
						allEntities[i].visibleDiv.style.left = ((playableWidth - entitySize) + (allEntities[i].visibleOffSet)) + "px";
					}
					allEntities[i].hasTeleported = true;
				} else if (getTop(allEntities[i].collisionDiv) <= -entitySize)  {
					//Has hit the top wall
					allEntities[i].collisionDiv.style.top = (playableHeight - entitySize) + "px";
					if (allEntities[i].visibleDiv != undefined) {
						allEntities[i].visibleDiv.style.top = ((playableHeight - entitySize) + (allEntities[i].visibleOffSet)) + "px";
					}
					allEntities[i].hasTeleported = true;
				}else if (getTop(allEntities[i].collisionDiv) >= playableHeight) {
					//Has hit the bottom wall
					allEntities[i].collisionDiv.style.top = 0 + "px";
					if (allEntities[i].visibleDiv != undefined) {
						allEntities[i].visibleDiv.style.top = (allEntities[i].visibleOffSet) + "px";
					}
					allEntities[i].hasTeleported = true;
				}
				//Move all entities
				allEntities[i].moveStep();
			}
		} catch (err) {
			continue;
		}
	}
}
function randomiseLocation(theElement) {
	randomiseProper(theElement);
	//Check for collisions from random location
	var collisionDetected = true;
	randomCheckStart:
	while (collisionDetected) {
		var leftPos = getLeft(theElement);
		var topPos = getTop(theElement);
		for (var i = 0; i < allEntities.length; ++i) {
			if (theElement == allEntities[i].collisionDiv) {
				continue;
			}
			if (theElement.className.indexOf("snake head") != -1) {
				//It was easier to just make it so that snakes don't spawn on the same vertical axis
				if (topPos == getTop(allEntities[i].collisionDiv)) {
					randomiseProper(theElement);
					continue randomCheckStart;
				}
			}
			if (leftPos == getLeft(allEntities[i].collisionDiv) && topPos == getTop(allEntities[i].collisionDiv)) {
				randomiseProper(theElement);
				continue randomCheckStart;
			}
		}
		collisionDetected = false;
	}
}
function randomiseProper(theElement) {
	if (theElement.className.indexOf('head') != -1) {
		theElement.style.left = ((entitySize * (initialPieces + 1)) + (Math.floor(Math.random() * (playableWidth - (entitySize * (initialPieces + 1)))/entitySize)*entitySize)) + 'px';
	} else {
		theElement.style.left = Math.floor(Math.random() * (playableWidth - entitySize)/entitySize)*entitySize + 'px';
	}
	theElement.style.top = (Math.floor(Math.random() * (playableHeight - entitySize)/entitySize)*entitySize) + 'px';
}
function entityDied(theEntity) {
	if (resetting) {
		return;
	}
	if (theEntity.entityClass == 'snake') {
        postLog(theEntity.snakeName + " died!");
			if (!theEntity.aiDriven) {
				gameLost(theEntity);
				return;
			}  else if (aliveAI == 1 && playerOneName.toLowerCase() == 'aime' && twoPlayers == false) {
				gameLost(theEntity);
				return;
			} else if (theEntity.aiDriven) {
				snakeResults += theEntity.snakeName + " scored " + theEntity.internalScore + "\n";
				--aliveAI;
			}
	} else if (theEntity.entityClass == 'enemy') {
			--aliveEnemies;
			if (aliveEnemies == 0) {
				enemyCount = enemyCount + 2;
				postLog(enemyCount + " enemies spawned!");
				for (var i = 0; i < enemyCount; ++i) {
					new Enemy();
				}
			}
	}
}
function resetEverything() {
	resetting = true;
	paused = false;
	pauseButton.innerHTML = "Pause";
	//Start
	if (frameInterval != undefined) {
		clearInterval(frameInterval);
		frameInterval = undefined;
	}
	pixelWidth = background.clientWidth;
	if (pixelWidth % 2 != 0) {
		--pixelWidth;
	}
	pixelHeight = background.clientHeight;
	if (pixelHeight % 2 != 0) {
		--pixelHeight;
	}
	entitySize = Math.ceil((Math.sqrt(pixelHeight*pixelWidth)/100)*scale);
	if (entitySize % 2 != 0) {
		--entitySize;
	}
	//Setup playing field
	setPlayable();
	scaleButtons();
	infoLog.style.paddingTop = playableHeight/3 + 'px';
	infoLog.style.fontSize = entitySize*2 + 'px';
	if (classicSnake) {
		postLog('Welcome to Snake!');
	} else {
		postLog('Welcome to BrowerSnake!');
	}
	
	//Reset colour array and AI Name array
	colorArray =  ["DeepPink", "MediumVioletRed", "Crimson", "Red ", "DarkOliveGreen", "Lime", "MediumSpringGreen ", "Green", "BlueViolet", "Purple", "Indigo", "MediumSlateBlue ", "OrangeRed", "Orange", "DarkOrange", "Yellow", "Gold", "Aqua", "Teal", "LightSeaGreen", "Blue", "DeepSkyBlue", "Maroon", "MidnightBlue", "DimGray", "Honeydew"];
	aiNameArray = ['Squish', 'Squash', 'Slither', 'Slide', 'Slugo', 'Mush', 'Fluffy', 'Geoff', 'Sid', 'Splashy', 'Splat'];
	//Remove names from AI pool if selected by players
	//Remove AI name from pool if player one has selected it
	if (aiNameArray.indexOf(playerOneName) != -1) {
		aiNameArray.splice(aiNameArray.indexOf(playerOneName), 1);
	}
	//Remove AI name from pool if player two has selected it
	if (aiNameArray.indexOf(playerTwoName) != -1) {
		aiNameArray.splice(aiNameArray.indexOf(playerTwoName), 1);
	}
	//Remove all entities
	while (allEntities.length > 0) {
		allEntities.pop().kill();
	}
	allEntities = [];
	
	//Reset game settings
	if (classicSnake) {
		enemyCount = 0;
	} else {
		enemyCount = 1;
	}
	enemyMovementDelay = 16;
	aliveEnemies = 0;
	aliveAI = 0;
	
	//Setup initial powerUp
	powerUp = new PowerUp();
	
	//Initialise snakes
	//PlayerOne
	if (!twoPlayers && playerOneName.toLowerCase() == "aime") {
		playerOne = new Snake(playerOneName, true);
	} else {
		playerOne = new Snake(playerOneName, false);
	}
	//PlayerTwo
	if (twoPlayers) {
		playerTwo = new Snake(playerTwoName, false);
	}
	//AI snakes
	var tempSnake;
	for (var i = 0; i < aiNumber; ++i) {
		tempSnake = new Snake(aiNameArray.splice(Math.floor(Math.random() * aiNameArray.length), 1), true);
	}
	
	//Setup initial enemy
	if (!classicSnake) {
		new Enemy();
	}
	
	setScoreBoard();
	//Cheats and easter eggs are handled here
	if (playerOne.aiDriven) {
		startAlertModal("Cheat enabled!", "Cheat code accepted. You are now an AI!", function () {
			resetting = false;
		});
	} else if (playerOneName.toLowerCase() == "lucas") {
		startAlertModal("Hi Cousin!", "Hi Lucas, from Ryan! :)", function () {
			resetting = false;
		});
	}  else if (playerOneName.toLowerCase() == "brandon") {
		startAlertModal("Hi Brandon!", "Lots of love from Ryan! <3", function () {
			resetting = false;
		});
	} else {
		resetting = false;
	}
	
}
function pauseGame() {
	if (paused) {
		pauseButton.innerHTML = "Pause";
		paused = false;
	} else {
		pauseButton.innerHTML = "Resume";
		paused = true;
	}
}
function debug() {
	var tempSquare;
	var verticalTiles = playableHeight/entitySize;
	var horizontalTiles = playableWidth/entitySize;
	for (var h = 0; h < horizontalTiles; ++h) {
		for (var v = 0; v < verticalTiles; ++v) {
			tempSquare = document.createElement('div');
			tempSquare.style.boxSizing = "border-box";
			tempSquare.style.border = "1px solid red";
			tempSquare.style.width = entitySize + "px";
			tempSquare.style.height = entitySize + "px";
			tempSquare.style.position = "absolute";
			tempSquare.style.left = (h * entitySize) + "px";
			tempSquare.style.top = (v * entitySize) + "px";
			playable.appendChild(tempSquare);
		}
	}
}
function getTop(theElement) {
	return parseInt(theElement.style.top.replace('px', ''));
}
function getLeft(theElement) {
	return parseInt(theElement.style.left.replace('px', ''));
}
function postHighScore(snakeName, snakeScore) {
	/*var reqObject = new XMLHttpRequest();
	reqObject.open("PUT", "/hsm", true);
	reqObject.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	reqObject.send(JSON.stringify({snakeName: snakeName, snakeHighScore: snakeScore}));
	//Call getHighScore again just in case we have topped it!
	setTimeout(getHighScore, 4000);*/
}
function getHighScore() {
	try {
		//alert("Trying to get high score...");
		var reqObject = new XMLHttpRequest();
		reqObject.open("GET", "/hsm", true);
		reqObject.setRequestHeader("Content-Type", "text/plain");
		reqObject.onreadystatechange = function () {
			if (reqObject.readyState === 4 && reqObject.status === 200) {
				//Response received grab the highscore
				var receivedJSON = JSON.parse(reqObject.responseText);
				servHighScore = receivedJSON.snakeHighScore;
				servHighScoreBox.innerHTML = servHighScore + " (" + receivedJSON.snakeName + ")";
			} 
		};
		reqObject.send(null);
	} catch (error) {
		console.log("High Score error: " + error);
	}
}
function postLog(toPost) {
	infoLog.innerHTML = toPost;
	infoLog.style.animation = "none";
	setTimeout(function() {infoLog.style.animation = "";}, 100);
}
//End