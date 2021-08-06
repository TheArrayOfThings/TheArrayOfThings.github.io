'use strict';
//Enable strict mode

function Object(startingXParam, startingYParam) {
	let object = {
		entityClass: "object",
		startingX: startingXParam,
		startingY: startingYParam,
		currentX: startingXParam,
		currentY: startingYParam,
		visibleDiv: undefined,
		debugEnabled: false,
		enableDebug: function() {
			this.debugEnabled = true;
			this.visibleDiv = document.createElement('div');
			this.visibleDiv.style.width = tileSize + "px";
			this.visibleDiv.style.height = tileSize + "px";
			this.visibleDiv.style.outline = "2px solid orange";
			this.visibleDiv.style.position = "absolute";
			this.visibleDiv.style.left = (this.startingX*tileSize) + "px";
			this.visibleDiv.style.top = (this.startingY*tileSize) + "px";
			playable.appendChild(this.visibleDiv);
		},
        move: function(horizontalIncrement, verticalIncrement) {
			if (this.debugEnabled) {
				this.visibleDiv.style.top = (getTop(this.visibleDiv) + (verticalIncrement*tileSize)) + 'px';
				this.visibleDiv.style.left = (getLeft(this.visibleDiv) + (horizontalIncrement*tileSize)) + 'px';
			}
			this.currentX = this.currentX + horizontalIncrement;
			this.currentY = this.currentY + verticalIncrement;
        }
	};
	//object.enableDebug();
	allObjects.push(object);
	return object;
}