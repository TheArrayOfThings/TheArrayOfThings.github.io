'use strict';
//Enable strict mode

function Map(tileSetParam, widthParam, heightParam, defaultStartXParam, defaultStartYParam) {
    let map = {
		tileSet: tileSetParam,
		tlX: undefined,
		tlY: undefined,
		cWidth: widthParam,
		cHeight: heightParam,
		defaultStartX: defaultStartXParam,
		defaultStartY: defaultStartYParam,
		containerDiv: undefined,
		canvas: undefined,
		context: undefined,
		currentX: 1,
		currentY: 1,
		debugDivs: undefined,
		initialise: function () {
			//Create a container div
			this.containerDiv = document.getElementById('mapContainerDiv');
			this.debugDivs = document.getElementById("debugDivs");
			playable.appendChild(this.containerDiv);
			//Create the canvas
			this.canvas = document.createElement('canvas');
			//Append canvas to playable area
			this.containerDiv.appendChild(this.canvas);
			//Make sure to reset the canvas in the overloaded draw function
		},
		resetCanvas: function() {
			this.currentX = 1;
			this.currentY = 1;
			this.scaleMap();
		},
		recentreMap: function() {
			this.tlX = (middleX - (this.cWidth/2)) + (((this.defaultStartX/2)-0.5) - (player.currentX - this.defaultStartX));
			this.tlY = (middleY - (this.cHeight/2)) - (((this.defaultStartY/2)-0.5) - (this.defaultStartY - player.currentY));
			this.containerDiv.style.left = (this.tlX*tileSize) + "px";
			this.containerDiv.style.top = (this.tlY*tileSize) + "px";
			refreshDebug();
		},
		scaleMap: function() {
			this.containerDiv.width = this.cWidth*tileSize;
			this.containerDiv.height = this.cHeight*tileSize;
			this.canvas.width = this.cWidth*tileSize;
			this.canvas.height = this.cHeight*tileSize;
			//Create the context
			this.context = this.canvas.getContext('2d');
			this.context.mozImageSmoothingEnabled = false;
			this.context.webkitImageSmoothingEnabled = false;
			this.context.msImageSmoothingEnabled = false;
			this.context.imageSmoothingEnabled = false;
		},
		drawTile: function(selectionX, selectionY, collidable) {
			if (collidable) {
				new cObject(this.currentX - 1, this.currentY - 1)
			}
			//Draw tile
			this.context.drawImage(this.tileSet, selectionX*16, selectionY*16, 16, 16, ((this.currentX*tileSize) - tileSize), ((this.currentY*tileSize) - tileSize), tileSize, tileSize);
			this.nextTile();
		},
		drawSpecialTile: function(selectionX, selectionY, functionToRun, runOnceParam) {
			new sObject(this.currentX - 1, this.currentY - 1, functionToRun, runOnceParam);
			//Draw tile
			this.context.drawImage(this.tileSet, selectionX*16, selectionY*16, 16, 16, ((this.currentX*tileSize) - tileSize), ((this.currentY*tileSize) - tileSize), tileSize, tileSize);
			this.nextTile();
		},
		drawInteractableTile: function(selectionX, selectionY, functionToRun) {
			new iObject(this.currentX - 1, this.currentY - 1, functionToRun);
			//Draw tile
			this.context.drawImage(this.tileSet, selectionX*16, selectionY*16, 16, 16, ((this.currentX*tileSize) - tileSize), ((this.currentY*tileSize) - tileSize), tileSize, tileSize);
			this.nextTile();
		},
		drawInteractableHalfTile: function(tlX, tlY, blX, blY, functionToRun) {
			new iObject(this.currentX - 1, this.currentY - 1, functionToRun);
			//Draw top-left half
			this.context.drawImage(this.tileSet, tlX*16, tlY*8, 16, 8, ((this.currentX*tileSize) - tileSize), ((this.currentY*tileSize) - tileSize), tileSize, tileSize/2);
			//Draw bottom-left half
			this.context.drawImage(this.tileSet, blX*16, blY*8, 16, 8, ((this.currentX*tileSize) - tileSize), (((this.currentY*tileSize) - tileSize)) + (tileSize/2), tileSize, tileSize/2);
			this.nextTile();
		},
		drawHalfTile: function(tlX, tlY, blX, blY, collidable) {
			if (collidable) {
				new cObject(this.currentX - 1, this.currentY - 1)
			}
			//Draw top-left half
			this.context.drawImage(this.tileSet, tlX*16, tlY*8, 16, 8, ((this.currentX*tileSize) - tileSize), ((this.currentY*tileSize) - tileSize), tileSize, tileSize/2);
			//Draw bottom-left half
			this.context.drawImage(this.tileSet, blX*16, blY*8, 16, 8, ((this.currentX*tileSize) - tileSize), (((this.currentY*tileSize) - tileSize)) + (tileSize/2), tileSize, tileSize/2);
			this.nextTile();
		},
		drawQuarterTile: function(tlX, tlY, trX, trY, blX, blY, brX, brY, collidable) {
			if (collidable) {
				new cObject(this.currentX - 1, this.currentY - 1)
			}
			//Draw top-left quarter
			this.context.drawImage(this.tileSet, tlX*8, tlY*8, 8, 8, ((this.currentX*tileSize) - tileSize), ((this.currentY*tileSize) - tileSize), tileSize/2, tileSize/2);
			//Draw top-right quarter
			this.context.drawImage(this.tileSet, trX*8, trY*8, 8, 8, ((this.currentX*tileSize) - tileSize) + tileSize/2, ((this.currentY*tileSize) - tileSize), tileSize/2, tileSize/2);
			//Draw bottom-left quarter
			this.context.drawImage(this.tileSet, blX*8, blY*8, 8, 8, ((this.currentX*tileSize) - tileSize), ((this.currentY*tileSize) - tileSize) + tileSize/2, tileSize/2, tileSize/2);
			//Draw bottom-right quarter
			this.context.drawImage(this.tileSet, brX*8, brY*8, 8, 8, ((this.currentX*tileSize) - tileSize) + tileSize/2, ((this.currentY*tileSize) - tileSize) + tileSize/2, tileSize/2, tileSize/2);
			this.nextTile();
		},
		nextTile: function() {
			if (this.currentX == this.cWidth) {
				this.currentX = 1;
				++this.currentY;
			} else {
				++this.currentX;
			}
		},
        moveCanvas: function(horizontalIncrement, verticalIncrement) {
            this.containerDiv.style.top = (getTop(this.containerDiv) + (verticalIncrement*tileSize)) + "px";
            this.containerDiv.style.left = (getLeft(this.containerDiv) + (horizontalIncrement*tileSize)) + "px";
			this.tlX = this.tlX + horizontalIncrement;
			this.tlY = this.tlY + verticalIncrement;
        },
		load: function() {
			
		},
		draw: function() {
			
		},
		unload: function() {
			aiCharacters = [];
			collidables = [];
			specialTiles = [];
			interactableTiles = [];
			if (typeof player != "undefined") {
				allObjects = [player];
			} else {
				allObjects = [];
			}
			document.getElementById("debugDivs").innerHTML = "";
		}
	};
	map.initialise();
    return map;
}




//End