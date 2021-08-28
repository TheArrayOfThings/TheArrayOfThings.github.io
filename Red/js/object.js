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
			this.visibleDiv.style.outline = "2px solid orange";
			this.visibleDiv.style.position = "absolute";
			this.visibleDiv.style.left = (this.startingX*tileSize) + "px";
			this.visibleDiv.style.top = (this.startingY*tileSize) + "px";
			this.visibleDiv.style.zIndex = "999";
			this.visibleDiv.id = "debugDiv";
			if (document.getElementById("debugDivs")) {
				document.getElementById("debugDivs").appendChild(this.visibleDiv);
			}
		},
        move: function(horizontalIncrement, verticalIncrement) {
			if (typeof this.visibleDiv != "undefined") {
				this.visibleDiv.id = this.entityClass;
			}
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
	if (debugEnabled) {
		baseObject.enableDebug();
	}
	allObjects.push(baseObject);
	return baseObject;
}