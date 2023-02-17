'use strict';
//Enable strict mode

function BaseObject(startingXParam, startingYParam) {
	let baseObject = {
		entityClass: "baseObject",
		startingX: startingXParam,
		startingY: startingYParam,
		currentX: startingXParam,
		currentY: startingYParam,
		visibleDiv: undefined,
		enableDebug: function() {
			this.visibleDiv = document.createElement('div');
			this.visibleDiv.style.width = tileSize + "px";
			this.visibleDiv.style.height = tileSize + "px";
			switch (this.entityClass) {
				/*case "baseObject":
					this.visibleDiv.style.outline = "2px solid orange";
				break;*/
				case "specialobject":
					this.visibleDiv.style.outline = "2px solid green";
				break;
				case "collisionobject":
					this.visibleDiv.style.outline = "2px solid red";
				break;
				case "interactableobject":
					this.visibleDiv.style.outline = "2px solid blue";
				break;
				case "player":
					this.visibleDiv.style.outline = "2px solid purple";
				break;
			}
			this.visibleDiv.style.position = "absolute";
			this.visibleDiv.style.left = (this.currentX*tileSize) + "px";
			this.visibleDiv.style.top = (this.currentY*tileSize) + "px";
			this.visibleDiv.style.zIndex = "999";
			this.visibleDiv.id = this.entityClass;
			if (document.getElementById("debugDivs")) {
				document.getElementById("debugDivs").appendChild(this.visibleDiv);
			}
		},
        move: function(horizontalIncrement, verticalIncrement) {
			if (typeof this.visibleDiv != "undefined") {
				this.visibleDiv.style.top = (getTop(this.visibleDiv) + (verticalIncrement*tileSize)) + 'px';
				this.visibleDiv.style.left = (getLeft(this.visibleDiv) + (horizontalIncrement*tileSize)) + 'px';
			}
			this.currentX = this.currentX + horizontalIncrement;
			this.currentY = this.currentY + verticalIncrement;
        },
		unload: function() {
			if (typeof this.visibleDiv != "undefined") {
				this.visibleDiv.parentNode.removeChild(this.visibleDiv);
			}
			let index = allObjects.indexOf(this);
			if (index > -1) {
				allObjects.splice(index, 1);
			}
		}
	};
	allObjects.push(baseObject);
	return baseObject;
}