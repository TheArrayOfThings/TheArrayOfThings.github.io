'use strict';
//Enable strict mode

function CharacterSprite(sourceImageParam, startingXParam, startingYParam, aiDrivenParam) {
	let characterSprite = new Sprite(sourceImageParam, startingXParam, startingYParam, 0, 0, true);
	characterSprite.entityClass = "characterSprite";
	characterSprite.moving = false;
	characterSprite.direction = undefined;
	characterSprite.flipBit = 0;
	characterSprite.showFrontStill = function() {
		characterSprite.changeSelection(0,0);
		characterSprite.draw();
	};
	characterSprite.showBackStill = function() {
		characterSprite.changeSelection(0,1);
		characterSprite.draw();
	};
	characterSprite.showLeftStill = function() {
		characterSprite.unflipHorz();
		characterSprite.changeSelection(0,2);
		characterSprite.draw();
	};
	characterSprite.showRightStill = function() {
		characterSprite.flipHorz();
		characterSprite.changeSelection(0,2);
		characterSprite.draw();
	};
	characterSprite.showFrontRunning = function() {
		characterSprite.changeSelection(0,3);
		characterSprite.draw();
	};
	characterSprite.showBackRunning = function() {
		characterSprite.changeSelection(0,4);
		characterSprite.draw();
	};
	characterSprite.showLeftRunning = function() {
		characterSprite.unflipHorz();
		characterSprite.changeSelection(0,5);
		characterSprite.draw();
	};
	characterSprite.showRightRunning = function() {
		characterSprite.flipHorz();
		characterSprite.changeSelection(0,5);
		characterSprite.draw();
	};
	characterSprite.startMove = function(directionParam) {
		if (characterSprite.moving) {
			return;
		} else {
			characterSprite.moving = true;
		}
		characterSprite.direction = directionParam;
		frameQueue.push(characterSprite.moveStep.bind(characterSprite));
	};
	characterSprite.moveStep = function() {
		switch (characterSprite.direction) {
			case 'up':
				if (characterSprite.flipBit == 0) {
					characterSprite.unflipHorz();
					characterSprite.flipBit = 1;
				} else {
					characterSprite.flipHorz();
					characterSprite.flipBit = 0;
				}
				characterSprite.showBackRunning();
				characterSprite.move(0, (-1));
				break;
			case 'down':
				if (characterSprite.flipBit == 0) {
					characterSprite.unflipHorz();
					characterSprite.flipBit = 1;
				} else {
					characterSprite.flipHorz();
					characterSprite.flipBit = 0;
				}
				characterSprite.showFrontRunning();
				characterSprite.move(0, (1));
				break;
			case 'left':
				characterSprite.showLeftRunning();
				characterSprite.move((-1), (0));
				break;
			case 'right':
				characterSprite.showRightRunning();
				characterSprite.move((1), (0));
				break;
		}
		setTimeout(characterSprite.afterMove.bind(characterSprite), ((tickRate*animationDelay)));
	};
	characterSprite.afterMove = function() {
		switch (characterSprite.direction) {
			case 'up':
				characterSprite.showBackStill();
				break;
			case 'down':
				characterSprite.showFrontStill();
				break;
			case 'left':
				characterSprite.showLeftStill();
				break;
			case 'right':
				characterSprite.showRightStill();
				break;
		}
		frameQueue.push(function(){characterSprite.moving = false;}.bind(characterSprite));
	};
	if (characterSprite.aiDriven) {
		aiCharacters.push(characterSprite);
	}
	return characterSprite;
}