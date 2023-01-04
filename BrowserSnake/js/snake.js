function Snake(snakeNameParm, aiDrivenParm) {
	let snake = new Entity();
	//Define bullet specific variables
	//Snake name!
	snake.snakeName = snakeNameParm;
	//Colors
	snake.primaryColor = undefined;
	snake.secondaryColor = undefined;
	snake.eyeColor = undefined;
	snake.travelDirection = 'right';
	//Snake setup
	snake.snakeDiv = undefined;
	snake.rightHead = undefined;
	snake.leftHead = undefined;
	snake.upHead = undefined;
	snake.downHead = undefined;
	snake.childSegments = [];
	//Settings
	snake.internalScore = 0;
	snake.aiDriven = aiDrivenParm;
	snake.scoreBox = undefined;
	snake.snakeScoreLabel = undefined;
	snake.snakeScore = undefined;
	snake.fireTiming = 0;
	snake.fireDelay = 4;
	snake.bulletTimeout = 20;
	snake.doubleShotEnabled = false;
	snake.tripleShotEnabled = false;
	snake.randomBulletsEnabled = false;
	snake.homingBulletsEnabled = false;
	//Initialise functions
	snake.initialise = function () {
		if (snake.aiDriven) {
			++aliveAI;
		}
		snake.aiTargetClass = 'powerup';
		snake.movementEnabled = true;
		snake.entityClass = 'snake';
		snake.buildScoreBoard();
		snake.randomiseColors();
		snake.setHeads();
		snake.initialiseSegments();
		snake.setSnakeBody();
		snake.scoreBox.innerHTML = 0;
	};
	//Visual functions
	snake.buildScoreBoard = function () {
		/*
		Building the following html
		<tr class="scoreLabels">
		<th class='scoreboard'>High Score</th>
		<th class='scoreboard name playerOneName'>Player 1 Score</th>
		<th class='scoreboard name playerTwoName'>Player 2 Score</th>
		</tr>
		<tr class="scores">
		<th class='scoreboard highscore'>0</th>
		<th class='scoreboard score playerOneScore'>0</th>
		<th class='scoreboard score playerTwoScore'>0</th>
		</tr>
		*/
		let scoreLabels = document.getElementsByClassName('scoreLabels')[0];
		let scores = document.getElementsByClassName('scores')[0];
		snake.snakeScoreLabel = document.createElement('th');
		snake.snakeScoreLabel.className += ' scoreboard';
		snake.snakeScoreLabel.className += ' name';
		snake.snakeScoreLabel.innerHTML = snake.snakeName + " Score";
		scoreLabels.appendChild(snake.snakeScoreLabel);
		snake.allDivs.push(snake.snakeScoreLabel);
		snake.snakeScore = document.createElement('th');
		snake.snakeScore.className += ' scoreboard';
		snake.snakeScore.className += ' score';
		scores.appendChild(snake.snakeScore);
		snake.allDivs.push(snake.snakeScore);
		snake.scoreBox = snake.snakeScore;
	};
	snake.initialiseSegments = function () {
		//for (let i = 0; i < initialPieces; ++i) {
		let i = 0, len = initialPieces;
		while (i < len) {
			snake.appendSegment();
			i++;
		}
		snake.childSegments[snake.childSegments.length - 1].collisionDiv.style.borderRadius = "40% 0px 0px 40%";
	};
	snake.setSnakeBody = function () {
		//for (let i = 0; i < snake.childSegments.length; ++i) {
		let i = 0, len = snake.childSegments.length;
		while (i < len) {
			snake.childSegments[i].collisionDiv.style.top = (parseInt(snake.collisionDiv.style.top.replace('px', ''))) + 'px';
			snake.childSegments[i].collisionDiv.style.left = (parseInt(snake.collisionDiv.style.left.replace('px', '')) - (entitySize * (i + 1))) + 'px';
			i++;
		}
	};
	snake.appendSegment = function () {
		snake.childSegments.push(new SnakeSegment(snake));
		return snake.childSegments[snake.childSegments.length - 1].collisionDiv;
	};
	snake.setSnakeCss = function (targetElement) {
		targetElement.style.width = entitySize + 'px';
		targetElement.style.height = entitySize + 'px';
		targetElement.style.position = 'absolute';
		if (snake.childSegments.length % 2 != 0 || targetElement.className.indexOf('head') != -1) {
			targetElement.style.background = snake.primaryColor;
		} else {
			targetElement.style.background = snake.secondaryColor;
		}
		targetElement.style.boxShadow = "0px 0px 0px " + Math.ceil(entitySize / 30) + "px white";
	};
	snake.setHeads = function () {
		/*
		Building the following html
		<div class='wholeSnake'>
		<div class="snake head right"></div>
		<div class="snake head left"></div>
		<div class="snake head up"></div>
		<div class="snake head down"></div>
		</div>
		*/
		let wholeSnake = document.createElement('div');
		let head;
		wholeSnake.className += ' wholeSnake';
		head = document.createElement('div');
		head.className += ' snake';
		head.className += ' head';
		head.className += ' right';
		wholeSnake.appendChild(head);
		head = document.createElement('div');
		head.className += ' snake';
		head.className += ' head';
		head.className += ' left';
		wholeSnake.appendChild(head);
		head = document.createElement('div');
		head.className += ' snake';
		head.className += ' head';
		head.className += ' up';
		wholeSnake.appendChild(head);
		head = document.createElement('div');
		head.className += ' snake';
		head.className += ' head';
		head.className += ' down';
		wholeSnake.appendChild(head);
		playable.appendChild(wholeSnake);
		snake.snakeDiv = wholeSnake;
		snake.allDivs.push(wholeSnake);
		for (let i = 0; i < snake.snakeDiv.childNodes.length; ++i) {
			if (snake.snakeDiv.childNodes[i].className && snake.snakeDiv.childNodes[i].className.indexOf('right') != -1) {
				snake.rightHead = snake.snakeDiv.childNodes[i];
			}
			if (snake.snakeDiv.childNodes[i].className && snake.snakeDiv.childNodes[i].className.indexOf('left') != -1) {
				snake.leftHead = snake.snakeDiv.childNodes[i];
			}
			if (snake.snakeDiv.childNodes[i].className && snake.snakeDiv.childNodes[i].className.indexOf('up') != -1) {
				snake.upHead = snake.snakeDiv.childNodes[i];
			}
			if (snake.snakeDiv.childNodes[i].className && snake.snakeDiv.childNodes[i].className.indexOf('down') != -1) {
				snake.downHead = snake.snakeDiv.childNodes[i];
			}
		}
		//Add the eyes to the snake heads
		let tempEye = snake.createEye();
		tempEye.style.top = "0px";
		tempEye.style.right = "0px";
		snake.rightHead.appendChild(tempEye);
		tempEye = snake.createEye();
		tempEye.style.bottom = "0px";
		tempEye.style.right = "0px";
		snake.rightHead.appendChild(tempEye);

		tempEye = snake.createEye();
		tempEye.style.bottom = "0px";
		tempEye.style.left = "0px";
		snake.leftHead.appendChild(tempEye);
		tempEye = snake.createEye();
		tempEye.style.top = "0px";
		tempEye.style.left = "0px";
		snake.leftHead.appendChild(tempEye);

		tempEye = snake.createEye();
		tempEye.style.top = "0px";
		tempEye.style.right = "0px";
		snake.upHead.appendChild(tempEye);
		tempEye = snake.createEye();
		tempEye.style.top = "0px";
		tempEye.style.left = "0px";
		snake.upHead.appendChild(tempEye);

		tempEye = snake.createEye();
		tempEye.style.bottom = "0px";
		tempEye.style.right = "0px";
		snake.downHead.appendChild(tempEye);
		tempEye = snake.createEye();
		tempEye.style.bottom = "0px";
		tempEye.style.left = "0px";
		snake.downHead.appendChild(tempEye);

		//Round the corners of the snake heads top-left, top-right, bottom-right, bottom-left

		snake.setSnakeCss(snake.rightHead);
		snake.setSnakeCss(snake.leftHead);
		snake.setSnakeCss(snake.upHead);
		snake.setSnakeCss(snake.downHead);

		snake.leftHead.style.display = 'inline';
		snake.leftHead.style.display = 'none';
		snake.upHead.style.display = 'none';
		snake.downHead.style.display = 'none';

		snake.collisionDiv = snake.rightHead;
		randomiseLocation(snake.collisionDiv);
	};
	snake.swapHead = function () {
		snake.collisionDiv.style.display = 'none';
		switch (snake.travelDirection) {
			case 'right':
				snake.rightHead.style.top = snake.collisionDiv.style.top;
				snake.rightHead.style.left = snake.collisionDiv.style.left;
				snake.collisionDiv = snake.rightHead;
				break;
			case 'left':
				snake.leftHead.style.top = snake.collisionDiv.style.top;
				snake.leftHead.style.left = snake.collisionDiv.style.left;
				snake.collisionDiv = snake.leftHead;
				break;
			case 'up':
				snake.upHead.style.top = snake.collisionDiv.style.top;
				snake.upHead.style.left = snake.collisionDiv.style.left;
				snake.collisionDiv = snake.upHead;
				break;
			case 'down':
				snake.downHead.style.top = snake.collisionDiv.style.top;
				snake.downHead.style.left = snake.collisionDiv.style.left;
				snake.collisionDiv = snake.downHead;
				break;
		}
		snake.collisionDiv.style.display = 'inline';
	};
	snake.randomiseColors = function () {
		if (!isInternetExplorer) {
			if (localStorage.getItem("SnakePrimary" + snake.snakeName) != null) {
				snake.primaryColor = colorArray.splice(colorArray.indexOf(localStorage.getItem("SnakePrimary" + snake.snakeName)), 1);
				snake.secondaryColor = colorArray.splice(colorArray.indexOf(localStorage.getItem("SnakeSecondary" + snake.snakeName)), 1);
				snake.eyeColor = colorArray.splice(colorArray.indexOf(localStorage.getItem("SnakeEye" + snake.snakeName)), 1);
			}
		}
		if (!snake.primaryColor || !snake.secondaryColor || !snake.eyeColor) {
			snake.primaryColor = colorArray.splice(Math.floor(Math.random() * colorArray.length), 1);
			snake.secondaryColor = colorArray.splice(Math.floor(Math.random() * colorArray.length), 1);
			snake.eyeColor = colorArray.splice(Math.floor(Math.random() * colorArray.length), 1);
			if (!isInternetExplorer) {
				localStorage.setItem("SnakePrimary" + snake.snakeName, snake.primaryColor);
				localStorage.setItem("SnakeSecondary" + snake.snakeName, snake.secondaryColor);
				localStorage.setItem("SnakeEye" + snake.snakeName, snake.eyeColor);
			}
		}
	};
	snake.createEye = function () {
		let newEye = document.createElement('div');
		newEye.className += " eye";
		newEye.style.background = snake.eyeColor;
		return newEye;
	};
	//Behaviour functions
	snake.alternativeAction = function () {
		snake.swapHead();
		for (let i = 0; i < snake.childSegments.length; ++i) {
			if (i == (snake.childSegments.length - 1)) {
				//Last snake segment top-left, top-right, bottom-right, bottom-left
				if (getTop(snake.childSegments[i - 1].collisionDiv) < getTop(snake.childSegments[i].collisionDiv)) {
					//Last segment is above
					snake.childSegments[i].collisionDiv.style.borderRadius = "0px 0px 40% 40%";
				} else if (getTop(snake.childSegments[i - 1].collisionDiv) > getTop(snake.childSegments[i].collisionDiv)) {
					//Last segment is below
					snake.childSegments[i].collisionDiv.style.borderRadius = "40% 40% 0px 0px";
				} else if (getLeft(snake.childSegments[i - 1].collisionDiv) < getLeft(snake.childSegments[i].collisionDiv)) {
					//Last segment is to left
					snake.childSegments[i].collisionDiv.style.borderRadius = "0px 40% 40% 0px";
				} else if (getLeft(snake.childSegments[i - 1].collisionDiv) > getLeft(snake.childSegments[i].collisionDiv)) {
					//Last segment is to right
					snake.childSegments[i].collisionDiv.style.borderRadius = "40% 0px 0px 40%";
				}
			} else {
				snake.childSegments[i].collisionDiv.style.borderRadius = "unset";
			}
			let tempTop = snake.childSegments[i].collisionDiv.style.top;
			let tempLeft = snake.childSegments[i].collisionDiv.style.left;
			snake.childSegments[i].collisionDiv.style.top = snake.beforeMoveTop;
			snake.childSegments[i].collisionDiv.style.left = snake.beforeMoveLeft;
			snake.beforeMoveTop = tempTop;
			snake.beforeMoveLeft = tempLeft;
			snake.childSegments[i].collisionDiv.style.display = 'inline';
		}
		if (classicSnake) {
			return;
		}
		if (snake.fireTiming >= snake.fireDelay) {
			snake.fireTiming = 0;
			snake.fire();
		} else {
			++snake.fireTiming;
		}
	};
	snake.alternativeDeathAction = function () {
		for (let i = 0; i < snake.childSegments.length; ++i) {
			snake.childSegments[i].kill();
		}
	};
	snake.fire = function () {
		if (snake.tripleShotEnabled) {
			if (snake.travelDirection == 'left' || snake.travelDirection == 'right') {
				new Bullet(getTop(snake.collisionDiv), getLeft(snake.collisionDiv), snake);
				new Bullet(getTop(snake.collisionDiv) - entitySize, getLeft(snake.collisionDiv), snake);
				new Bullet(getTop(snake.collisionDiv) + entitySize, getLeft(snake.collisionDiv), snake);
			} else {
				new Bullet(getTop(snake.collisionDiv), getLeft(snake.collisionDiv), snake);
				new Bullet(getTop(snake.collisionDiv), getLeft(snake.collisionDiv) - entitySize, snake);
				new Bullet(getTop(snake.collisionDiv), getLeft(snake.collisionDiv) + entitySize, snake);
			}
		} else if (snake.doubleShotEnabled) {
			if (snake.travelDirection == 'left' || snake.travelDirection == 'right') {
				new Bullet(getTop(snake.collisionDiv) - entitySize, getLeft(snake.collisionDiv), snake);
				new Bullet(getTop(snake.collisionDiv) + entitySize, getLeft(snake.collisionDiv), snake);
			} else {
				new Bullet(getTop(snake.collisionDiv), getLeft(snake.collisionDiv) - entitySize, snake);
				new Bullet(getTop(snake.collisionDiv), getLeft(snake.collisionDiv) + entitySize, snake);
			}
		} else {
			new Bullet(getTop(snake.collisionDiv), getLeft(snake.collisionDiv), snake);
		}

	};
	snake.initialise();
	return snake;
}
//End