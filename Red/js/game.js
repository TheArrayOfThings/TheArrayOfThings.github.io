'use strict';
//Enable strict mode

//Fundamental variable declaration
let topSection;
let bottomSection;
let leftSection;
let rightSection;
let aButton;
let bButton;
let startButton;
let background;
let playable;
let pixelWidth;
let pixelHeight;
let playableWidth;
let playableHeight;
let previousPlayableWidth = 0;
let previousPlayableHeight = 0;
let lostHorizontalPixels;
let lostVerticalPixels;
let tileSize = 16;
let resizeRedRtime;
let resizeRedTimeout = false;
let resizeRedDelta = 200;
let loadingCompleted = false;
let localStorage;

//Game settings
let scale = 2;
let tickRate = 33;
let animationDelay = 5;
let textDelay = 2;
let horzCharLimit = 17;
let frameInterval;
let frameQueue = [];
let resettingScreen = false;
let xTiles;
let yTiles;
let middleX;
let middleY;
let currentMap;
let debugEnabled = false;
let justUnloaded = false;

//Entities
let aiCharacters = [];
let collidables = [];
let specialTiles = [];
let interactableTiles = [];
let allObjects = [];

//Loaded resources
let boxImage;
let font;
let playerSprite;
let momSprite;
let redsHouse;
let imagesToLoad = [];
let imagesLoaded = 0;
let textBox;
let mainComputer;
let mainStartMenu;
let mainQuantityMenu;
let mainConfirmMenu;

//Player settings
let player;
let playerName = "Ryan";

//State settings
const states = {
	INOVERWORLD:'inoverworld',
	INDIALOG:'indialog',
	INMENU:'inmenu',
	INSUBMENU:'insubmenu',
	INBATTLE:'inbattle',
	INCUTSCENE:'incutscene'
}
let currentState = states.INOVERWORLD;
let currentMenu;
let playerItems = [];
let computerItems = [];
let pokemon = [];

//AI Settings
let moveDirections = ["up", "down", "left", "right", "none"];
let aiMoveDelay = 0;

addEvent("load", window, pageLoaded);

function pageLoaded() {
	if (typeof isInternetExplorer == "undefined") {
		setTimeout(pageLoaded, 100);
		return;
	}
	if (!isInternetExplorer) {
		localStorage = window.localStorage;
	}
	//Grab required elements from page
	background = document.getElementById('background');
	playable = document.getElementById('playable');
	topSection = document.getElementById('topSection');
	bottomSection = document.getElementById('bottomSection');
	leftSection = document.getElementById('leftSection');
	rightSection = document.getElementById('rightSection');
	aButton = document.getElementById('aButton');
	bButton = document.getElementById('bButton');
	startButton = document.getElementById('startButton');
	screenSetup();
	initialSetup();
	//Add settings event to settings button
	//addEvent("click", document.getElementById("settings"), function() {setup();});
	//Add my keyparse event
	addEvent("keydown", document, keyParse);
	addEvent("resize", window, function() {
		if (resettingScreen) {
			return;
		}
		resizeRedRtime = new Date();
		if (resizeRedTimeout === false) {
			resizeRedTimeout = true;
			setTimeout(redResizeend, resizeRedDelta);
		}
	});
}
function initialSetup() {
   	//On mobile device?
	if(/Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent)) {
		//Yes - so add touch control
		document.getElementById("topSectionVisible").style.display = "block";
		document.getElementById("bottomSectionVisible").style.display = "block";
		document.getElementById("leftSectionVisible").style.display = "block";
		document.getElementById("rightSectionVisible").style.display = "block";
		document.getElementById("aButtonVisible").style.display = "block";
		document.getElementById("bButtonVisible").style.display = "block";
		document.getElementById("startButtonVisible").style.display = "block";
		addEvent("touchstart", topSection, upPressed);
		addEvent("touchstart", bottomSection, downPressed);
		addEvent("touchstart", leftSection, leftPressed);
		addEvent("touchstart", rightSection, rightPressed);
		addEvent("touchstart", aButton, pressedA);
		addEvent("touchstart", bButton, pressedB);
		addEvent("touchstart", startButton, pressedStart);
	}
	//Load all images
	boxImage = loadImage("./Red/gfx/text_box.png");
	playerSprite = loadImage("./Red/gfx/sprites/red.png");
	momSprite = loadImage("./Red/gfx/sprites/mom.png");
	redsHouse = loadImage("./Red/gfx/tilesets/reds_house.png");
	font = loadImage("./Red/gfx/font.png");
	//Next step is imagesLoaded (which is called once all images are loaded) - eventually 'loadingComplete' called
}
function loadingComplete() {
	if (loadingCompleted) {return};
	loadingCompleted = true;
	document.getElementById('mapContainerDiv').style.transition = "all " + ((tickRate) * animationDelay) + "ms linear";
	if (!isInternetExplorer && localStorage.getItem("playerX") != null && localStorage.getItem("playerY") != null ) {
		player = new Player(playerSprite, parseInt(localStorage.getItem("playerX")),parseInt(localStorage.getItem("playerY")));
	} else {
		player = new Player(playerSprite);
	}
	computerItems = [new Item("POTION", 12)];
	currentMap = new PlayerBedroom(redsHouse, 8, 8, 3, 6);
	player.centre();
	textBox = new TextBox(8, 3, -3.5, 1);
	//document.getElementById("frontmenu").appendChild(textBox.boxContainerDiv);
	frameInterval = setInterval(nextFrame, tickRate);
	mainComputer = new Computer(-3.5, -3.5);
	mainStartMenu = new StartMenu(0, -3);
	mainQuantityMenu = new QuantityMenu();
	mainConfirmMenu = new ConfirmMenu();
	if (debugEnabled) {
		refreshDebug();
	}
}
function upPressed() {
	switch(currentState) {
		case states.INOVERWORLD:
			player.startMove('up');
		break;
		case states.INDIALOG:
		
		break;
		case states.INMENU:
			currentMenu.pressedUp();
		break;
		case states.INSUBMENU:
			currentMenu.pressedUp();
		break;
		case states.INBATTLE:
		
		break;
		case states.INCUTSCENE:
			
		break;
	}
}
function downPressed() {
	switch(currentState) {
		case states.INOVERWORLD:
			player.startMove('down');
		break;
		case states.INDIALOG:
		
		break;
		case states.INMENU:
			currentMenu.pressedDown();
		break;
		case states.INSUBMENU:
			currentMenu.pressedDown();
		break;
		case states.INBATTLE:
		
		break;
		case states.INCUTSCENE:
			
		break;
	}
}
function leftPressed() {
	switch(currentState) {
		case states.INOVERWORLD:
			player.startMove('left');
		break;
		case states.INDIALOG:
		
		break;
		case states.INMENU:
			currentMenu.pressedLeft();
		break;
		case states.INSUBMENU:
			currentMenu.pressedLeft();
		break;
		case states.INBATTLE:
		
		break;
		case states.INCUTSCENE:
			
		break;
	}
}
function rightPressed() {
	switch(currentState) {
		case states.INOVERWORLD:
			player.startMove('right');
		break;
		case states.INDIALOG:
		
		break;
		case states.INMENU:
			currentMenu.pressedRight();
		break;
		case states.INSUBMENU:
			currentMenu.pressedRight();
		break;
		case states.INBATTLE:
		
		break;
		case states.INCUTSCENE:
			
		break;
	}
}
function pressedA() {
	switch(currentState) {
		case states.INOVERWORLD:
			switch (player.direction) {
				case 'up':
					for (let i = 0; i < interactableTiles.length; ++i) {
						if ((player.currentX) == interactableTiles[i].currentX && (player.currentY - 1) == interactableTiles[i].currentY) {
							interactableTiles[i].functionToRun();
						}
					}
					break;
				case 'down':
					for (let i = 0; i < interactableTiles.length; ++i) {
						if ((player.currentX) == interactableTiles[i].currentX && (player.currentY + 1) == interactableTiles[i].currentY) {
							interactableTiles[i].functionToRun();
						}
					}
					break;
				case 'left':
					for (let i = 0; i < interactableTiles.length; ++i) {
						if ((player.currentX - 1) == interactableTiles[i].currentX && (player.currentY) == interactableTiles[i].currentY) {
							interactableTiles[i].functionToRun();
						}
					}
					break;
				case 'right':
					for (let i = 0; i < interactableTiles.length; ++i) {
						if ((player.currentX + 1) == interactableTiles[i].currentX && (player.currentY) == interactableTiles[i].currentY) {
							interactableTiles[i].functionToRun();
						}
					}
					break;
			}
		break;
		case states.INDIALOG:
			textBox.nextLine();
		break;
		case states.INMENU:
			currentMenu.pressedA();
		break;
		case states.INSUBMENU:
			currentMenu.pressedA();
		break;
		case states.INBATTLE:
		
		break;
		case states.INCUTSCENE:
			
		break;
	}
}
function pressedB() {
	switch(currentState) {
		case states.INOVERWORLD:
			
		break;
		case states.INDIALOG:
			textBox.nextLine();
		break;
		case states.INMENU:
			currentMenu.pressedB();
		break;
		case states.INSUBMENU:
			currentMenu.pressedB();
		break;
		case states.INBATTLE:
		
		break;
		case states.INCUTSCENE:
			
		break;
	}
}
function pressedStart() {
	switch(currentState) {
		case states.INOVERWORLD:
			mainStartMenu.start();
		break;
		case states.INDIALOG:
			textBox.nextLine();
		break;
		case states.INMENU:
			currentMenu.pressedB();
		break;
		case states.INSUBMENU:
			currentMenu.pressedB();
		break;
		case states.INBATTLE:
		
		break;
		case states.INCUTSCENE:
			
		break;
	}
}
function loadImage(srcParam) {
	let tempImage = document.createElement('img');
	tempImage.src = srcParam;
	document.getElementById('hidden').appendChild(tempImage);
	imagesToLoad.push(tempImage);
	tempImage.onload = imageLoaded;
	return tempImage;
}
function imageLoaded() {
	++imagesLoaded;
	if (imagesLoaded == imagesToLoad.length) {
		loadingComplete();
	}
}
function setPlayable() {
	lostVerticalPixels = pixelHeight % tileSize;
	lostHorizontalPixels = pixelWidth % tileSize;
	if (lostVerticalPixels % 2 != 0) {
		--lostVerticalPixels;
	}
	if (lostHorizontalPixels % 2 != 0) {
		--lostHorizontalPixels;
	}
	playableHeight = (pixelHeight - lostVerticalPixels);
	playableWidth = (pixelWidth - lostHorizontalPixels);
	if (previousPlayableHeight == playableHeight & previousPlayableWidth == playableWidth) {
		return;
	}
	playable.style.height = playableHeight + 'px';
	playable.style.width = playableWidth + 'px';
	playable.style.left = lostHorizontalPixels/2 + 'px';
	playable.style.top = lostVerticalPixels/2 + 'px';
	xTiles = playableWidth/tileSize;
	yTiles = playableHeight/tileSize;
	middleX = Math.floor(xTiles/2);
	middleY = Math.floor(yTiles/2);
	//Do reset stuff!
	if (typeof currentMap != "undefined") {
		currentMap.resetMap();
	}
	if (typeof player != "undefined") {
		player.scaleCanvas();
		player.centre();
	}
	if (typeof textBox != "undefined") {
		textBox.scaleTextBox();
	}
	if (typeof mainStartMenu != "undefined") {
		mainStartMenu.scaleTextBox();
	}
	if (typeof mainComputer != "undefined") {
		mainComputer.scaleTextBox();
	}
	if (typeof mainQuantityMenu != "undefined") {
		mainQuantityMenu.scaleTextBox();
	}
	if (typeof mainConfirmMenu != "undefined") {
		mainConfirmMenu.scaleTextBox();
	}
	previousPlayableHeight = playableHeight;
	previousPlayableWidth = playableWidth;
}
function scaleButtons() {
	//let buttons = document.getElementsByTagName('button');
	let sectionWidth, sectionHeight;
	let sectionButtons = document.getElementsByClassName('section');
	/*for (let i = 0; i < buttons.length; ++i) {
		buttons[i].style.fontSize = (scale*1.5) + 'px';
		buttons[i].style.overflow = 'hidden';
	}*/
	if (pixelHeight < pixelWidth) {
		sectionHeight = pixelHeight/10;
		sectionWidth = pixelHeight/6;
	} else {
		sectionHeight = pixelWidth/8;
		sectionWidth = pixelWidth/4;
	}
	for (let i = 0; i < sectionButtons.length; ++i) {
		sectionButtons[i].style.width = sectionWidth + "px";
		sectionButtons[i].style.height = sectionHeight + "px";
		sectionButtons.lineHeight = sectionHeight + "px";
		if (sectionButtons[i].id.indexOf('bottomSection') != -1) {
			sectionButtons[i].style.bottom = sectionHeight + 'px';
			sectionButtons[i].style.left = sectionWidth*0.75 + 'px';
		} else if (sectionButtons[i].id.indexOf('topSection') != -1) {
			sectionButtons[i].style.bottom = (sectionHeight*3) + 'px';
			sectionButtons[i].style.left = sectionWidth*0.75 + 'px';
		} else if (sectionButtons[i].id.indexOf('leftSection') != -1) {
			sectionButtons[i].style.bottom = sectionHeight*2 + 'px';
			sectionButtons[i].style.left = sectionWidth/4 + 'px';
		} else if (sectionButtons[i].id.indexOf('rightSection') != -1) {
			sectionButtons[i].style.bottom = sectionHeight*2 + 'px';
			sectionButtons[i].style.left = sectionWidth*1.25 + 'px';
		} else if (sectionButtons[i].id.indexOf('bButton') != -1) {
			sectionButtons[i].style.bottom = sectionHeight*1.9 + 'px';
			sectionButtons[i].style.left = sectionWidth*2.5 + 'px';
			sectionButtons[i].style.borderRadius = "100px";
		} else if (sectionButtons[i].id.indexOf('aButton') != -1) {
			sectionButtons[i].style.bottom = sectionHeight*3 + 'px';
			sectionButtons[i].style.left = sectionWidth*2.75 + 'px';
			sectionButtons[i].style.borderRadius = "100px";
		} else if (sectionButtons[i].id.indexOf('startButton') != -1) {
			sectionButtons[i].style.bottom = sectionHeight*1 + 'px';
			sectionButtons[i].style.left = sectionWidth*2 + 'px';
			sectionButtons[i].style.borderRadius = "100px";
			sectionButtons[i].style.width = sectionWidth/2 + "px";
			sectionButtons[i].style.height = sectionHeight/2 + "px";
		}
	}
}
function screenSetup() {
	resettingScreen = true;
	pixelWidth = background.clientWidth;
	if (pixelWidth % 2 != 0) {
		--pixelWidth;
	}
	pixelHeight = background.clientHeight;
	if (pixelHeight % 2 != 0) {
		--pixelHeight;
	}
	tileSize = Math.ceil((Math.sqrt(pixelHeight*pixelWidth)/16)/16)*16;
	scale = tileSize/2;
	//Setup playing field
	setPlayable();
	scaleButtons();
	resettingScreen = false;
}
function nextFrame() {
	//Check if player has collided with a special tile
	for (let i = 0; i < specialTiles.length; ++i) {
		if (player.currentX == specialTiles[i].currentX && player.currentY == specialTiles[i].currentY) {
			if (justUnloaded) {
				continue;
			}
			specialTiles[i].functionToRun();
			if (specialTiles[i].runOnce) {
				specialTiles.splice(i, 1);
			}
		}
	}
	if (aiMoveDelay == 0) {
		//Queue up AI moves eveny 20 frames
		for (let i = 0; i < aiCharacters.length; ++i) {
			if (aiCharacters[i].wanders) {
				aiCharacters[i].startMove(moveDirections[Math.floor(Math.random() * moveDirections.length)]);
			}
		}
		aiMoveDelay = 200;
	} else {
		--aiMoveDelay;
	}
	for (let i = 0; i < frameQueue.length; ++i) {
		frameQueue.shift()();
	}
}
function redResizeend() {
	let newPixelWidth = background.clientWidth;
	if (newPixelWidth % 2 != 0) {
		--newPixelWidth;
	}
	let newPixelHeight = background.clientHeight;
	if (newPixelHeight % 2 != 0) {
		--newPixelHeight;
	}
	if (newPixelHeight == pixelHeight && newPixelWidth == pixelWidth) {
		return;
	}
	if (new Date() - resizeRedRtime < resizeRedDelta) {
		setTimeout(redResizeend, resizeRedDelta);
	} else {
		resizeRedTimeout = false;
		screenSetup();
	}
	if (debugEnabled) {
		refreshDebug();
	}
}
function keyParse(e) {
	if (e.code) {
		if (e.code == "KeyW" || e.code == "ArrowUp") {
			upPressed();
		} else if (e.code == "KeyS" || e.code == "ArrowDown") {
			downPressed();
		} else if (e.code == "KeyA" || e.code == "ArrowLeft") {
			leftPressed();
		} else if (e.code == "KeyD" || e.code == "ArrowRight") {
			rightPressed();
		} else if (e.code == "Space" || e.code == "Enter") {
			pressedA();
		} else if (e.code == "Escape" || e.code == "Backspace") {
			if (currentState == states.INOVERWORLD) {
				pressedStart();
			} else {
				pressedB();
			}	
		}
	} else {
		if (e.keyCode == 87 || e.keyCode == 38) {
			upPressed();
		} else if (e.keyCode == 83 || e.keyCode == 40) {
			downPressed();
		} else if (e.keyCode == 65 || e.keyCode == 37) {
			leftPressed();
		} else if (e.keyCode == 68 || e.keyCode == 39) {
			rightPressed();
		} else if (e.keyCode == 32 || e.keyCode == 13) {
			pressedA();
		} else if (e.keyCode == 49 || e.keyCode == 8) {
			if (currentState == states.INOVERWORLD) {
				pressedStart();
			} else {
				pressedB();
			}	
		}
	}
}
function mergeArrayDuplicates(arrayToMerge) {
	for (let i = 0; i < arrayToMerge.length; ++i) {
		for (let n = i + 1; n < arrayToMerge.length; ++n) {
			if (arrayToMerge[i].name == arrayToMerge[n].name) {
				arrayToMerge[i].quantity = arrayToMerge[i].quantity + arrayToMerge[n].quantity;
				arrayToMerge.splice(n, 1);
			}
		}
	}
}
function getTop(theElement) {
	return parseInt(theElement.style.top.replace('px', ''));
}
function getLeft(theElement) {
	return parseInt(theElement.style.left.replace('px', ''));
}
function refreshDebug() {
	if (debugEnabled) {
		if (document.getElementById("middleDiv")) {
			playable.removeChild(document.getElementById("middleDiv"));
		}
		var tempDebugDivs = document.getElementById("debugDivs");
		tempDebugDivs.innerHTML = "";
		for (let i = 0; i < xTiles*2; ++i) {
			for (let n = 0; n < yTiles*2; ++n) {
				let tempDiv = document.createElement('div');
				tempDiv.style.outline = "1px solid grey";
				tempDiv.style.opacity = 0.5;
				tempDiv.style.outlineOffset = "-1px";
				tempDiv.style.position = "absolute";
				tempDiv.style.top = ((n*tileSize/2)-getTop(currentMap.containerDiv)) + "px";
				tempDiv.style.left = ((i*tileSize/2)-getLeft(currentMap.containerDiv)) + "px";
				tempDiv.style.width = tileSize/2 + "px";
				tempDiv.style.height = tileSize/2 + "px";
				tempDebugDivs.appendChild(tempDiv);
			}
		}
		for (let i = 0; i < allObjects.length; ++i) {
			allObjects[i].enableDebug();
		}
		var middleDiv = document.createElement("div");
		middleDiv.id = "middleDiv";
		//middleDiv.style.outlineOffset = "-1px";
		middleDiv.style.outline = "2px solid yellow";
		middleDiv.style.outlineOffset = "-1px";
		middleDiv.style.position = "absolute";
		middleDiv.style.width = tileSize + "px";
		middleDiv.style.height = tileSize + "px";
		middleDiv.style.top = (middleY*tileSize) + "px";
		middleDiv.style.left = (middleX*tileSize) + "px";
		middleDiv.style.zIndex = "9999";
		playable.appendChild(middleDiv);
	}
}

	


//End