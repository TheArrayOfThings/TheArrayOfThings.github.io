'use strict';
//Enable strict mode

function Player(resourceLocationParam, startingXParam, startingYParam) {
	let player = new CharacterSprite(resourceLocationParam, startingXParam, startingYParam);
	player.entityClass = "player";
	if (typeof player.visibleDiv != "undefined") {
		player.visibleDiv.style.outline = "2px solid purple";
		document.getElementById("mapContainerDiv").appendChild(player.visibleDiv);
	}
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
                //player.move(0, 0);
				if (player.currentY == 0) {
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
                //player.move(0, 0);
				if (player.currentY == currentMap.cHeight - 1) {
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
                //player.move(0, 0);
				if (player.currentX == 0) {
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
                //player.move(0, 0);
				if (player.currentX == currentMap.cWidth - 1) {
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
		switch (player.direction) {
			case 'up':
				player.move(0, (-1));
			break;
			case 'down':
				player.move(0, (1));
			break;
			case 'left':
				player.move(-1, (0));
			break;
			case 'right':
				player.move(1, (0));
			break;
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