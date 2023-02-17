function Effects() {
	var effects = {
		effectsArray: [],
		getRandomEffect: function() {
			return this.effectsArray[Math.floor(Math.random() * this.effectsArray.length)];
		},
		initialise: function() {
			//Increase firerate
			this.effectsArray.push(function(target) {
				if (target.fireDelay > 0) {
					postLog("More bullets for " + target.snakeName + "!");
					--target.fireDelay;
				} else {
					return effects.getRandomEffect();
				}
			});
			//Increase enemy movement speed
			this.effectsArray.push(function() {
				if (enemyMovementDelay > 0) {
					postLog("Faster!");
					--enemyMovementDelay;
				} else {
					return effects.getRandomEffect();
				}
			});
			//Teleport snake
			this.effectsArray.push(function(target) {
				postLog(target.snakeName + " teleported!");
				randomiseLocation(target.collisionDiv);
				target.hasTeleported = true;
			});
			//Teleport enemies
			this.effectsArray.push(function() {
				postLog("Enemies teleported!");
				for (var i = 0; i < allEntities.length; ++i) {
					if (allEntities[i].entityClass == 'enemy') {
						randomiseLocation(allEntities[i].collisionDiv);
						allEntities[i].hasTeleported = true;
					}
				}
			});
			//Teleport bullets
			this.effectsArray.push(function() {
				postLog("Bullets teleported!");
				for (var i = 0; i < allEntities.length; ++i) {
					if (allEntities[i].entityClass == 'bullet') {
						randomiseLocation(allEntities[i].collisionDiv);
						allEntities[i].hasTeleported = true;
					}
				}
			});
			//Teleport everything
			this.effectsArray.push(function() {
				postLog("Eveything teleported!");
				for (var i = 0; i < allEntities.length; ++i) {
					if (allEntities[i].entityClass != 'snakesegment') {
						randomiseLocation(allEntities[i].collisionDiv);
						allEntities[i].hasTeleported = true;
					}
				}
			});
			//Bullet timeout increased
			this.effectsArray.push(function(target) {
				if (target.bulletTimeout < 100) {
					postLog("Range increased for " + target.snakeName + "!");
					target.bulletTimeout += 10;
				} else {
					return effects.getRandomEffect();
				}
			});
			//Enable double shot
			this.effectsArray.push(function(target) {
				if (target.doubleShotEnabled ) {
					return effects.getRandomEffect();
				}
				postLog("Double shot for " + target.snakeName + "!");
				target.doubleShotEnabled = true;
				setTimeout(function() {target.doubleShotEnabled = false;}, 10000);
			});
			//Enable triple shot
			this.effectsArray.push(function(target) {
				if (target.tripleShotEnabled ) {
					return effects.getRandomEffect();
				}
				postLog("Triple shot for " + target.snakeName + "!");
				target.tripleShotEnabled = true;
				setTimeout(function() {target.tripleShotEnabled = false;}, 10000);
			});
			//Random bullets
			this.effectsArray.push(function(target) {
				if (target.randomBulletsEnabled ) {
					return effects.getRandomEffect();
				}
				postLog("Dude wheres my bullets? For " + target.snakeName + "!");
				target.randomBulletsEnabled = true;
				setTimeout(function() {target.randomBulletsEnabled = false;}, 10000);
			});
			//Spawn more enemies
			this.effectsArray.push(function(target) {
				var toSpawn = Math.floor(Math.random() * 10) + 1;
				postLog(toSpawn + " extra!");
				for (var i = 0; i < toSpawn; ++i) {
					new Enemy();
				}
			});
			//Homing bullets
			this.effectsArray.push(function(target) {
				if (target.homingBulletsEnabled ) {
					return effects.getRandomEffect();
				}
				postLog("Seek and destroy!");
				target.homingBulletsEnabled = true;
				setTimeout(function() {target.homingBulletsEnabled = false;}, 10000);
			});
			//Chasing enemies
			this.effectsArray.push(function() {
				postLog("Reverse Pac-Man!");
				for (var i = 0; i < allEntities.length; ++i) {
					if (allEntities[i].entityClass == 'enemy') {
						allEntities[i].aiDriven = true;
						allEntities[i].collisionDiv.style.backgroundColor = 'red';
					}
				}
				setTimeout(function() {
					for (var i = 0; i < allEntities.length; ++i) {
						if (allEntities[i].entityClass == 'enemy') {
							allEntities[i].aiDriven = false;
							allEntities[i].collisionDiv.style.backgroundColor = 'pink';
						}
					}
				}, 10000);
			});
			//Moving powerup 
			this.effectsArray.push(function() {
				if (powerUp.movementEnabled) {
					return effects.getRandomEffect();
				}
				postLog("Chase me!");
				powerUp.movementEnabled = true;
				setTimeout(function() {powerUp.movementEnabled = false;}, 10000);
			});
		}
	};
	effects.initialise();
	return effects;
}