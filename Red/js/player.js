'use strict';
//Enable strict mode

function Player(resourceLocationParam, startingXParam, startingYParam) {
	let player = new CharacterSprite(resourceLocationParam, startingXParam, startingYParam);
	player.entityClass = "player";
    player.moveStep = function() {
		let willCollide = false;
        switch (player.direction) {
            case 'up':
                if (player.flipBit == 0) {
                    player.flipHorz();
                    player.flipBit = 1;
                } else {
                    player.unflipHorz();
                    player.flipBit = 0;
                }
                player.showBackRunning();
                player.move(0, 0);
				if (player.currentY == (currentMap.tlY)) {
					willCollide = true;
					break;
				}
				for (let i = 0; i < collidables.length; ++i) {
					if ((player.currentX) == collidables[i].currentX && (player.currentY - 1) == collidables[i].currentY) {
						willCollide = true;
					}
				}
                break;
            case 'down':
                if (player.flipBit == 0) {
                    player.flipHorz();
                    player.flipBit = 1;
                } else {
                    player.unflipHorz();
                    player.flipBit = 0;
                }
                player.showFrontRunning();
                player.move(0, 0);
				if (player.currentY + 1 == (currentMap.tlY + currentMap.cHeight)) {
					willCollide = true;
					break;
				}
				for (let i = 0; i < collidables.length; ++i) {
					if ((player.currentX) == collidables[i].currentX && (player.currentY + 1) == collidables[i].currentY) {
						willCollide = true;
					}
				}
                break;
            case 'left':
                player.showLeftRunning();
                player.move(0, 0);
				if (player.currentX == currentMap.tlX) {
					willCollide = true;
					break;
				}
				for (let i = 0; i < collidables.length; ++i) {
					if ((player.currentX - 1) == collidables[i].currentX && (player.currentY) == collidables[i].currentY) {
						willCollide = true;
					}
				}
                break;
            case 'right':
                player.showRightRunning();
                player.move(0, 0);
				if (player.currentX + 1 == currentMap.tlX + currentMap.cWidth) {
					willCollide = true;
					break;
				}
				for (let i = 0; i < collidables.length; ++i) {
					if ((player.currentX + 1) == collidables[i].currentX && (player.currentY) == collidables[i].currentY) {
						willCollide = true;
					}
				}
                break;
        }
		if (willCollide == false) {
			player.shiftScreen();
		}
		setTimeout(player.afterMove.bind(player), ((tickRate*animationDelay)));
    };
	player.shiftScreen = function() {
		for (let i = 0; i < allObjects.length; ++i) {
			if (allObjects[i] == player) {
				continue;
			}
			switch (player.direction) {
				case 'up':
				allObjects[i].move(0, (1));
				break;
				case 'down':
				allObjects[i].move(0, (-1));
				break;
				case 'left':
				allObjects[i].move((1), 0);
				break;
				case 'right':
				allObjects[i].move((-1), 0);
				break;
			}
		}
		switch (player.direction) {
			case 'up':
			currentMap.moveCanvas(0, (1));
			break;
			case 'down':
			currentMap.moveCanvas(0, (-1));
			break;
			case 'left':
			currentMap.moveCanvas((1), 0);
			break;
			case 'right':
			currentMap.moveCanvas((-1), 0);
			break;
		}
	};
	return player;
}