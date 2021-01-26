function PowerUp() {
	var powerup = new Entity();
	powerup.powerUpColor = 'yellow';
	powerup.initialise = function() {
		powerup.entityClass = 'powerup';
		powerup.collisionDiv = document.createElement('div');
		powerup.collisionDiv.id = 'powerUp';
		powerup.collisionDiv.style.height = entitySize + "px";
		powerup.collisionDiv.style.width = entitySize + "px";
		powerup.collisionDiv.style.background = powerUpColour;
		powerup.collisionDiv.style.boxShadow = "0px 0px 0px " + Math.ceil(entitySize/30) + "px white";
		playable.appendChild(powerup.collisionDiv);
		randomiseLocation(powerup.collisionDiv);
		powerup.allDivs.push(powerup.collisionDiv);
		powerup.movementDelay = 4;
	};
	powerup.alternativeAction = function() {
		if (powerup.movementEnabled) {
			powerup.travelDirection = moveDirections[Math.floor(Math.random() * moveDirections.length)];
		}
	};
	powerup.initialise();
	return powerup;
}