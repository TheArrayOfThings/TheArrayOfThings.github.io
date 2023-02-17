function Bullet(topPosParm, leftPosParm, parentSnake) {
	var bullet = new Entity();
	//Define bullet specific variables
	bullet.parentSnake = parentSnake;
	bullet.topPos = topPosParm;
	bullet.leftPos = leftPosParm;
	bullet.sideSize = entitySize/2;
	bullet.travelDirection = bullet.parentSnake.travelDirection;
	bullet.visibleOffSet = bullet.sideSize/2;
	bullet.initialise = function() {
		if (bullet.parentSnake.randomBulletsEnabled) {
			bullet.leftPos = Math.floor(Math.random() * (playableWidth - entitySize)/entitySize)*entitySize;
			bullet.topPos = Math.floor(Math.random() * (playableHeight - entitySize)/entitySize)*entitySize;
		}
		if (bullet.parentSnake.homingBulletsEnabled) {
			bullet.aiDriven = true;
		}
		bullet.movementDelay = 0;
		bullet.movementEnabled = true;
		bullet.aiTargetClass = 'enemy';
		bullet.entityClass = 'bullet';
		bullet.visibleDiv = document.createElement('div');
		bullet.collisionDiv = document.createElement('div');
		bullet.visibleDiv.className += 'bullet ';
		bullet.visibleDiv.style.height = bullet.sideSize + "px";
		bullet.visibleDiv.style.width = bullet.sideSize + "px";
		bullet.collisionDiv.style.height = entitySize + "px";
		bullet.collisionDiv.style.width = entitySize + "px";
		bullet.visibleDiv.style.position = 'absolute';
		bullet.collisionDiv.style.position = 'absolute';
		if(bullet.travelDirection == 'left') {
			bullet.visibleDiv.style.left = (bullet.leftPos - (entitySize) + bullet.visibleOffSet) + 'px';
			bullet.collisionDiv.style.left = (bullet.leftPos - (entitySize)) + 'px';
			bullet.visibleDiv.style.top = (bullet.topPos + bullet.visibleOffSet) + "px";
			bullet.collisionDiv.style.top = bullet.topPos + 'px';
		} else if (bullet.travelDirection == 'right') {
			bullet.visibleDiv.style.left = ((bullet.leftPos + (entitySize)) + bullet.visibleOffSet) + 'px';
			bullet.collisionDiv.style.left = (bullet.leftPos + (entitySize)) + 'px';
			bullet.visibleDiv.style.top = (bullet.topPos + bullet.visibleOffSet) + "px";
			bullet.collisionDiv.style.top = bullet.topPos + 'px';
		} else if (bullet.travelDirection == 'up') {
			bullet.visibleDiv.style.top = ((bullet.topPos - (entitySize)) + bullet.visibleOffSet) + 'px';
			bullet.collisionDiv.style.top = (bullet.topPos - (entitySize)) + 'px';
			bullet.visibleDiv.style.left = (bullet.leftPos + (bullet.visibleOffSet)) + "px";
			bullet.collisionDiv.style.left = bullet.leftPos + 'px';
		} else if (bullet.travelDirection == 'down') {
			bullet.visibleDiv.style.top = ((bullet.topPos + (entitySize)) + bullet.visibleOffSet) + 'px';
			bullet.collisionDiv.style.top = (bullet.topPos + (entitySize)) + 'px';
			bullet.visibleDiv.style.left = (bullet.leftPos + bullet.visibleOffSet) + "px";
			bullet.collisionDiv.style.left = bullet.leftPos + 'px';
		}
		//bullet.collisionDiv.style.border = '1px solid red'; //Show collisionDiv for debugging
		playable.appendChild(bullet.visibleDiv);
		playable.appendChild(bullet.collisionDiv);
		bullet.allDivs.push(bullet.visibleDiv);
		bullet.allDivs.push(bullet.collisionDiv);
		setTimeout(function() {bullet.kill();}, tickRate*bullet.parentSnake.bulletTimeout);
	};
	bullet.initialise();
	return bullet;
}