'use strict';
//Enable strict mode

function Map(tileSetParam, tlXParam, tlYParam, widthParam, heightParam) {
    let map = {
		tileSet: tileSetParam,
		tlX: tlXParam,
		tlY: tlYParam,
		cWidth: widthParam,
		cHeight: heightParam,
		canvas: undefined,
		context: undefined,
		currentX: 1,
		currentY: 1,
		initialise: function () {
			//Create the canvas
			this.canvas = document.createElement('canvas');
			this.canvas.style.position = "absolute";
			this.canvas.width = this.cWidth*tileSize;
			this.canvas.height = this.cHeight*tileSize;
			this.canvas.style.transition = "all " + ((tickRate) * animationDelay) + "ms linear";
			//Create the context
			this.context = this.canvas.getContext('2d');
			this.context.mozImageSmoothingEnabled = false;
			this.context.webkitImageSmoothingEnabled = false;
			this.context.msImageSmoothingEnabled = false;
			this.context.imageSmoothingEnabled = false;
			//Append canvas to playable area
			playable.appendChild(this.canvas);
			this.canvas.style.left = this.tlX*tileSize + "px";
			this.canvas.style.top = this.tlY*tileSize + "px";
		},
		drawTile: function(selectionX, selectionY, collidable) {
			if (collidable) {
				new cObject(this.currentX + this.tlX - 1, this.currentY + this.tlY - 1);
			}
			//Draw tile
			this.context.drawImage(this.tileSet, selectionX*16, selectionY*16, 16, 16, ((this.currentX*tileSize) - tileSize), ((this.currentY*tileSize) - tileSize), tileSize, tileSize);
			this.nextTile();
		},
		drawSpecialTile: function(selectionX, selectionY, functionToRun, runOnceParam) {
			new sObject(this.currentX + this.tlX - 1, this.currentY + this.tlY - 1, functionToRun, runOnceParam);
			//Draw tile
			this.context.drawImage(this.tileSet, selectionX*16, selectionY*16, 16, 16, ((this.currentX*tileSize) - tileSize), ((this.currentY*tileSize) - tileSize), tileSize, tileSize);
			this.nextTile();
		},
		drawInteractableTile: function(selectionX, selectionY, functionToRun) {
			new iObject(this.currentX + this.tlX - 1, this.currentY + this.tlY - 1, functionToRun);
			//Draw tile
			this.context.drawImage(this.tileSet, selectionX*16, selectionY*16, 16, 16, ((this.currentX*tileSize) - tileSize), ((this.currentY*tileSize) - tileSize), tileSize, tileSize);
			this.nextTile();
		},
		drawInteractableHalfTile: function(tlX, tlY, blX, blY, functionToRun) {
			new iObject(this.currentX + this.tlX - 1, this.currentY + this.tlY - 1, functionToRun);
			//Draw top-left half
			this.context.drawImage(this.tileSet, tlX*16, tlY*8, 16, 8, ((this.currentX*tileSize) - tileSize), ((this.currentY*tileSize) - tileSize), tileSize, tileSize/2);
			//Draw bottom-left half
			this.context.drawImage(this.tileSet, blX*16, blY*8, 16, 8, ((this.currentX*tileSize) - tileSize), (((this.currentY*tileSize) - tileSize)) + (tileSize/2), tileSize, tileSize/2);
			this.nextTile();
		},
		drawHalfTile: function(tlX, tlY, blX, blY, collidable) {
			if (collidable) {
				new cObject(this.currentX + this.tlX - 1, this.currentY + this.tlY - 1);
			}
			//Draw top-left half
			this.context.drawImage(this.tileSet, tlX*16, tlY*8, 16, 8, ((this.currentX*tileSize) - tileSize), ((this.currentY*tileSize) - tileSize), tileSize, tileSize/2);
			//Draw bottom-left half
			this.context.drawImage(this.tileSet, blX*16, blY*8, 16, 8, ((this.currentX*tileSize) - tileSize), (((this.currentY*tileSize) - tileSize)) + (tileSize/2), tileSize, tileSize/2);
			this.nextTile();
		},
		drawQuarterTile: function(tlX, tlY, trX, trY, blX, blY, brX, brY, collidable) {
			if (collidable) {
				new cObject(this.currentX + this.tlX - 1, this.currentY + this.tlY - 1);
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
            this.canvas.style.top = (getTop(this.canvas) + (verticalIncrement*tileSize)) + "px";
            this.canvas.style.left = (getLeft(this.canvas) + (horizontalIncrement*tileSize)) + "px";
			this.tlX = this.tlX + horizontalIncrement;
			this.tlY = this.tlY + verticalIncrement;
        },
		load: function() {
			
		}
	};
	map.initialise();
    return map;
}




//End