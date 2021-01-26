function Entity() {
	var entity = {
		visibleDiv: undefined,
		collisionDiv: undefined,
		isDead: false,
		travelDirection: 'none',
		beforeMoveTop: undefined,
		beforeMoveLeft: undefined,
		entityClass: 'unknown',
		aiDriven: false,
		aiTargetClass: undefined,
		aiTargetEntity: undefined,
		allDivs: [],
		movementEnabled: false,
		movementDelay: 1,
		currentMoveStep: 0,
		visibleOffSet: 0,
		fireDelay: 0,
		hasTeleported: false,
		moveStep: function() {
			if (this.movementEnabled == false) {
				return;
			}
			if (this.hasTeleported) {
				this.hasTeleported = false;
				return;
			}
			if (this.currentMoveStep < this.movementDelay) {
				++this.currentMoveStep;
				return;
			}
			this.currentMoveStep = 0;
			this.beforeMoveTop = this.collisionDiv.style.top;
			this.beforeMoveLeft = this.collisionDiv.style.left;
			var increment = 0;
			if (this.aiDriven) {
				this.autoChooseDirection();
			}
			if (this.travelDirection == 'right' ||  this.travelDirection == 'down') {
				increment = Math.abs(entitySize);
			} else if (this.travelDirection == 'left' || this.travelDirection =='up') {
				increment = -Math.abs(entitySize);
			}
			if (this.travelDirection == 'left' || this.travelDirection == 'right') {
				if (this.visibleDiv != undefined) {
					this.visibleDiv.style.left = getLeft(this.visibleDiv) + increment + "px";
				}
				this.collisionDiv.style.left = getLeft(this.collisionDiv) + increment + "px";
			} else {
				if (this.visibleDiv != undefined) {
					this.visibleDiv.style.top = getTop(this.visibleDiv) + increment + "px";
				}
				this.collisionDiv.style.top = getTop(this.collisionDiv) + increment + "px";
			}
			this.alternativeAction();
		},
		autoChooseDirection: function() {
			if (this.aiTargetClass == undefined) {
				return;
			}
			if (this.aiTargetEntity == undefined || this.aiTargetEntity.isDead) {
				//Get a target
				for (var i = 0; i < allEntities.length; ++i) {
					if (allEntities[i].entityClass == this.aiTargetClass && allEntities[i].isDead == false) {
						if (this.aiTargetEntity == undefined || this.aiTargetEntity.isDead) {
							this.aiTargetEntity = allEntities[i];
							break;
						}
					}
				}
			}
			var directionsToTry;
			if (getTop(this.aiTargetEntity.collisionDiv) < getTop(entity.collisionDiv)) {
				//target is above...
				if (entity.willCollide('up')) {
					directionsToTry = ['left', 'right', 'down'];
					for (var i = 0; i < directionsToTry.length; ++i) {
						if (!entity.willCollide(directionsToTry[i])) {
							entity.travelDirection = directionsToTry[i];
							break;
						}
					}
				} else {
					entity.travelDirection = 'up';
				}
				//alert("MOVING UP");
			} else if (getTop(this.aiTargetEntity.collisionDiv) > getTop(entity.collisionDiv)) {
				//target is below...
				if (entity.willCollide('down')) {
					directionsToTry = ['left', 'right', 'up'];
					for (var i = 0; i < directionsToTry.length; ++i) {
						if (!entity.willCollide(directionsToTry[i])) {
							entity.travelDirection = directionsToTry[i];
							break;
						}
					}
				} else {
					entity.travelDirection = 'down';
				}
				//alert("MOVING DOWN");
			} else if (getLeft(this.aiTargetEntity.collisionDiv) < getLeft(entity.collisionDiv)) {
				//target is to left..
				if (entity.willCollide('left')) { //1
					directionsToTry = ['up', 'right', 'down'];
					for (var i = 0; i < directionsToTry.length; ++i) {
						if (!entity.willCollide(directionsToTry[i])) {
							entity.travelDirection = directionsToTry[i];
							break;
						}
					}
				} else {
					entity.travelDirection = 'left'; //1
				}
				//alert("MOVING LEFT");
			} else if (getLeft(this.aiTargetEntity.collisionDiv) > getLeft(entity.collisionDiv)) {
				//target is to right
				if (entity.willCollide('right')) { //1
					directionsToTry = ['left', 'up', 'down'];
					for (var i = 0; i < directionsToTry.length; ++i) {
						if (!entity.willCollide(directionsToTry[i])) {
							entity.travelDirection = directionsToTry[i];
							break;
						}
					}
				} else {
					entity.travelDirection = 'right'; //1
				}
			}
		},
		willCollide: function(collideDirection) {
			if (collideDirection == 'left') {
				//Check if will collide with an entity
				for (var i = 0; i < allEntities.length; ++i) {
					if (this.entityClass == 'snake' && allEntities[i].entityClass == 'bullet') {
						continue;
					}
					if (this.aiTargetEntity != undefined && allEntities[i].entityClass == this.aiTargetEntity.entityClass) {
						continue;
					}
					if (getLeft(entity.collisionDiv) == getLeft(allEntities[i].collisionDiv) + (entitySize)) {
						if (getTop(entity.collisionDiv) == getTop(allEntities[i].collisionDiv)) {
							return true;
						}
					}
				}
				return false;
			}
			if (collideDirection == 'right') {
				//Check if will collide with an entity
				for (var i = 0; i < allEntities.length; ++i) {
					if (this.entityClass == 'snake' && allEntities[i].entityClass == 'bullet') {
						continue;
					}
					if (this.aiTargetEntity != undefined && allEntities[i].entityClass == this.aiTargetEntity.entityClass) {
						continue;
					}
					if (getLeft(entity.collisionDiv) == getLeft(allEntities[i].collisionDiv) - (entitySize)) {
						if (getTop(entity.collisionDiv) == getTop(allEntities[i].collisionDiv)) {
							return true;
						}
					}
				}
				return false;
			}
			if (collideDirection == 'up') {
				//Check if will collide with an entity
				for (var i = 0; i < allEntities.length; ++i) {
					if (this.entityClass == 'snake' && allEntities[i].entityClass == 'bullet') {
						continue;
					}
					if (this.aiTargetEntity != undefined && allEntities[i].entityClass == this.aiTargetEntity.entityClass) {
						continue;
					}
					if (getLeft(entity.collisionDiv) == getLeft(allEntities[i].collisionDiv)) {
						if (getTop(entity.collisionDiv) == getTop(allEntities[i].collisionDiv) + (entitySize)) {
							return true;
						}
					}
				}
				return false;
			}
			if (collideDirection == 'down') {
				//Check if will collide with an entity
				for (var i = 0; i < allEntities.length; ++i) {
					if (this.entityClass == 'snake' && allEntities[i].entityClass == 'bullet') {
						continue;
					}
					if (this.aiTargetEntity != undefined && allEntities[i].entityClass == this.aiTargetEntity.entityClass) {
						continue;
					}
					if (getLeft(entity.collisionDiv) == getLeft(allEntities[i].collisionDiv)) {
						if (getTop(entity.collisionDiv) == getTop(allEntities[i].collisionDiv) - (entitySize)) {
							return true;
						}
					}
				}
				return false;
			}
			return false;
		},
		kill: function() {
			if (this.isDead == false) {
				this.isDead = true;
				this.alternativeDeathAction();
				
				//Remove all divs
				while (this.allDivs.length > 0) {
					removeElement(this.allDivs.pop());
				}
				entityDied(entity);
			}
		},
		alternativeAction: function() {
			
		},
		alternativeDeathAction: function() {
        
		}
	};
	allEntities.push(entity);
	return entity;
}