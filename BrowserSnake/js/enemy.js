function Enemy() {
	var enemy = new Entity();
	enemy.enemyFace = document.createElement('p');
	enemy.initialise = function() {
		//Behaviour tweaks
		enemy.entityClass = 'enemy';
		enemy.aiTargetClass = 'snake';
		enemy.movementEnabled = true;
		enemy.collisionDiv = document.createElement('div');
		enemy.collisionDiv.className += "snake ";
		enemy.collisionDiv.className += "enemy ";
		enemy.collisionDiv.style.height = entitySize + "px";
		enemy.collisionDiv.style.width = entitySize + "px";
		enemy.collisionDiv.style.top = "0px";
		enemy.collisionDiv.style.left = "0px";
		enemy.collisionDiv.style.width = entitySize + 'px';
		enemy.collisionDiv.style.height = entitySize + 'px';
		enemy.collisionDiv.style.position = 'absolute';
		enemy.collisionDiv.style.boxShadow = "0px 0px 0px " + Math.ceil(entitySize/30) + "px white";
		enemy.enemyFace.innerHTML = "'-'";
		enemy.enemyFace.style.textAlign = 'center';
		enemy.enemyFace.style.fontSize = entitySize/1.5 + 'px';
		enemy.enemyFace.style.margin = "0px";
		enemy.enemyFace.style.color = "black";
		enemy.collisionDiv.appendChild(enemy.enemyFace);
		playable.appendChild(enemy.collisionDiv);
		enemy.allDivs.push(enemy.collisionDiv);
		randomiseLocation(enemy.collisionDiv);
		++aliveEnemies;
	};
	enemy.alternativeAction = function() {
		enemy.movementDelay = enemyMovementDelay;
		if (this.aiDriven) {
			if(enemy.enemyFace.innerHTML == "'-'") {
				enemy.enemyFace.innerHTML = "'~'";
			} else {
				enemy.enemyFace.innerHTML = "'-'";
			}
		} else {
			enemy.travelDirection = moveDirections[Math.floor(Math.random() * moveDirections.length)];
			if(enemy.enemyFace.innerHTML == "^-^") {
				enemy.enemyFace.innerHTML = "^o^";
			} else {
				enemy.enemyFace.innerHTML = "^-^";
			}
		}
	};
	enemy.initialise();
	return enemy;
}