'use strict';
//Enable strict mode

function Sprite(resourceLocationParam, startingXParam, startingYParam, selectionXParam, selectionYParam, collidableParam) {
    let sprite = new BaseObject(startingXParam, startingYParam, collidableParam);
	sprite.entityClass = "sprite";
	sprite.sourceImage = resourceLocationParam;
	sprite.selectionX = selectionXParam;
	sprite.selectionY = selectionYParam;
	sprite.canvas =  undefined;
	sprite.context =  undefined;
	sprite.flippedHorizontally =  false;
	sprite.flippedVertically =  false;
	sprite.initialise = function() {
		//Create the canvas
		sprite.canvas = document.createElement('canvas');
		sprite.canvas.style.position = "absolute";
		sprite.canvas.style.width = tileSize + "px";
		sprite.canvas.width = tileSize;
		sprite.canvas.style.height = tileSize + "px";
		sprite.canvas.height = tileSize;
		sprite.canvas.style.transition = "all " + ((tickRate) * animationDelay) + "ms linear";
		//Create the context
		sprite.context = sprite.canvas.getContext('2d');
		sprite.context.mozImageSmoothingEnabled = false;
		sprite.context.webkitImageSmoothingEnabled = false;
		sprite.context.msImageSmoothingEnabled = false;
		sprite.context.imageSmoothingEnabled = false;
		sprite.draw();
		//Append canvas to playable area
		playable.appendChild(sprite.canvas);
		//Move canvas to correct location
		sprite.changeLoc(sprite.startingX, sprite.startingY);
	};
	sprite.draw = function () {
		sprite.context.clearRect(0, 0, sprite.canvas.width,sprite.canvas.height);
		sprite.context.drawImage(sprite.sourceImage, sprite.selectionX*16, sprite.selectionY*16, 16, 16, 0, 0, tileSize, tileSize);
	};
	sprite.flipHorz = function() {
		if (sprite.flippedHorizontally) {
			return;
		} else {
			sprite.flippedHorizontally = true;
		}
		//First, clear the canvas
		sprite.context.clearRect(0, 0, sprite.canvas.width,sprite.canvas.height);
		//Second, flip the context
		sprite.context.translate(sprite.canvas.width, 0);
		sprite.context.scale(-1, 1);
		//Third, draw the image
		sprite.context.drawImage(sprite.sourceImage, sprite.selectionX*16, sprite.selectionY*16, 16, 16, 0, 0, tileSize, tileSize);
	};		
	sprite.unflipHorz = function() {
		if (sprite.flippedHorizontally == false) {
			return;
		} else {
			sprite.flippedHorizontally = false;
		}
		//First, clear the canvas
		sprite.context.clearRect(0, 0, sprite.canvas.width,sprite.canvas.height);
		//Second, flip the context
		sprite.context.translate(sprite.canvas.width, 0);
		sprite.context.scale(-1, 1);
		//Third, draw the image
		sprite.context.drawImage(sprite.sourceImage, sprite.selectionX*16, sprite.selectionY*16, 16, 16, 0, 0, tileSize, tileSize);
	};
	sprite.flipVert = function() {
		if (sprite.flippedVertically) {
			return;
		} else {
			sprite.flippedVertically = true;
		}
		//First, clear the canvas
		sprite.context.clearRect(0, 0, sprite.canvas.width,sprite.canvas.height);
		//Second, flip the context
		sprite.context.translate(0, sprite.canvas.height);
		sprite.context.scale(-1, 1);
		//Third, draw the image
		sprite.context.drawImage(sprite.sourceImage, sprite.selectionX*16, sprite.selectionY*16, 16, 16, 0, 0, tileSize, tileSize);
	};		
	sprite.unflipVert = function() {
		if (sprite.flippedVertically == false) {
			return;
		} else {
			sprite.flippedVertically = false;
		}
		//First, clear the canvas
		sprite.context.clearRect(0, 0, sprite.canvas.width,sprite.canvas.height);
		//Second, flip the context
		sprite.context.translate(0, sprite.canvas.height);
		sprite.context.scale(-1, 1);
		//Third, draw the image
		sprite.context.drawImage(sprite.sourceImage, sprite.selectionX*16, sprite.selectionY*16, 16, 16, 0, 0, tileSize, tileSize);
	};
	sprite.move = function(horizontalIncrement, verticalIncrement) {
		sprite.canvas.style.top = (getTop(sprite.canvas) + (verticalIncrement*tileSize)) + 'px';
		sprite.canvas.style.left = (getLeft(sprite.canvas) + (horizontalIncrement*tileSize)) + 'px';
		sprite.currentX = sprite.currentX + horizontalIncrement;
		sprite.currentY = sprite.currentY + verticalIncrement;
	};
	sprite.changeLoc = function(x, y) {
		sprite.canvas.style.left = x*tileSize + "px";
		sprite.canvas.style.top = y*tileSize + "px";
		sprite.currentX = x;
		sprite.currentY = y;
	};
	sprite.hide = function() {
		sprite.canvas.style.visibility = 'hidden';
	};
	sprite.show = function() {
		sprite.canvas.style.visibility = 'unset';
	};
	sprite.changeSelection = function(x,y) {
		sprite.selectionX = x;
		sprite.selectionY = y;
	};
	sprite.initialise();
    return sprite;
}




//End