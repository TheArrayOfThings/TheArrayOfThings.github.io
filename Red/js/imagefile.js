'use strict';
//Enable strict mode

function SubImage(sourceImageParam, startingXParam, startingYParam, sectionXParam, sectionYParam) {
    let subImage = {
		entityClass: "image",
		sourceImage: sourceImageParam,
		startingX: startingXParam,
		startingY: startingYParam,
		currentX: startingXParam,
		currentY: startingYParam,
		sectionX: sectionXParam,
		sectionY: sectionYParam,
		canvas: undefined,
		context: undefined,
		flippedHorizontally: false,
		flippedVertically: false,
		initialise: function() {
			//Create the canvas
			this.canvas = document.createElement('canvas');
			this.canvas.style.position = "absolute";
			this.canvas.style.width = tileSize + "px";
			this.canvas.width = tileSize;
			this.canvas.style.height = tileSize + "px";
			this.canvas.height = tileSize;
			this.canvas.style.transition = "all " + ((tickRate) * animationDelay) + "ms linear";
			//Create the context
			this.context = this.canvas.getContext('2d');
			this.context.drawImage(this.sourceImage, this.sectionX*16, this.sectionY*16, 16, 16, 0, 0, tileSize, tileSize);
			//Append canvas to playable area
			playable.appendChild(this.canvas);
			//Move canvas to correct location
			this.changeLoc(this.startingX, this.startingY);
		},
		flipHorz: function() {
			if (this.flippedHorizontally) {
				return;
			} else {
				this.flippedHorizontally = true;
			}
			//First, clear the canvas
			this.context.clearRect(0, 0, this.canvas.width,this.canvas.height);
			//Second, flip the context
			this.context.translate(this.canvas.width, 0);
			this.context.scale(-1, 1);
			//Third, draw the image
			this.context.drawImage(this.sourceImage, this.sectionX*16, this.sectionY*16, 16, 16, 0, 0, tileSize, tileSize);
		},		
		unflipHorz: function() {
			if (this.flippedHorizontally == false) {
				return;
			} else {
				this.flippedHorizontally = false;
			}
			//First, clear the canvas
			this.context.clearRect(0, 0, this.canvas.width,this.canvas.height);
			//Second, flip the context
			this.context.translate(this.canvas.width, 0);
			this.context.scale(-1, 1);
			//Third, draw the image
			this.context.drawImage(this.sourceImage, this.sectionX*16, this.sectionY*16, 16, 16, 0, 0, tileSize, tileSize);
		},
		flipVert: function() {
			if (this.flippedVertically) {
				return;
			} else {
				this.flippedVertically = true;
			}
			//First, clear the canvas
			this.context.clearRect(0, 0, this.canvas.width,this.canvas.height);
			//Second, flip the context
			this.context.translate(0, this.canvas.height);
			this.context.scale(-1, 1);
			//Third, draw the image
			this.context.drawImage(this.sourceImage, this.sectionX*16, this.sectionY*16, 16, 16, 0, 0, tileSize, tileSize);
		},		
		unflipVert: function() {
			if (this.flippedVertically == false) {
				return;
			} else {
				this.flippedVertically = false;
			}
			//First, clear the canvas
			this.context.clearRect(0, 0, this.canvas.width,this.canvas.height);
			//Second, flip the context
			this.context.translate(0, this.canvas.height);
			this.context.scale(-1, 1);
			//Third, draw the image
			this.context.drawImage(this.sourceImage, this.sectionX*16, this.sectionY*16, 16, 16, 0, 0, tileSize, tileSize);
		},
        move: function(horizontalIncrement, verticalIncrement) {
            this.canvas.style.top = (getTop(this.canvas) + (verticalIncrement*tileSize)) + 'px';
            this.canvas.style.left = (getLeft(this.canvas) + (horizontalIncrement*tileSize)) + 'px';
			this.currentX = this.currentX + horizontalIncrement;
			this.currentY = this.currentY + verticalIncrement;
        },
		changeLoc: function(x, y) {
			this.canvas.style.left = x*tileSize + "px";
			this.canvas.style.top = y*tileSize + "px";
			this.currentX = x;
			this.currentY = y;
		},
		hide: function() {
			this.canvas.style.visibility = 'hidden';
		},
		show: function() {
			this.canvas.style.visibility = 'unset';
		}
    };
	subImage.initialise();
    return subImage;
}




//End