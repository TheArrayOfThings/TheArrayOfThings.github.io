'use strict';
//Enable strict mode

function Sprite(resourceLocationParam, startingXParam, startingYParam, selectionXParam, selectionYParam, collidableParam) {
    let sprite = new BaseObject(startingXParam, startingYParam, collidableParam);
	sprite.entityClass = "sprite";
	sprite.sourceImage = resourceLocationParam;
	sprite.selectionX = selectionXParam;
	sprite.selectionY = selectionYParam;
	sprite.containerDiv = undefined;
	sprite.canvas =  undefined;
	sprite.context =  undefined;
	sprite.flippedHorizontally =  false;
	sprite.flippedVertically =  false;
	sprite.flipBit = 0;
	sprite.initialise = function() {
		//Create the containing Div
		sprite.containerDiv = document.createElement('div');
		sprite.containerDiv.style.transition = "all " + ((tickRate) * animationDelay) + "ms linear";
		sprite.containerDiv.style.position = "absolute";
		//Create the canvas
		sprite.canvas = document.createElement('canvas');
		sprite.canvas.style.position = "absolute";
		//Append the sprite canvas to the containerDiv
		sprite.containerDiv.appendChild(sprite.canvas);
		//sprite.canvas.style.transition = "all " + ((tickRate) * animationDelay) + "ms linear";
		//Append containerDiv to playable area
		document.getElementById('mapContainerDiv').appendChild(sprite.containerDiv);
		sprite.containerDiv.width = tileSize;
		sprite.containerDiv.height = tileSize;
		sprite.canvas.width = tileSize;
		sprite.canvas.height = tileSize;
		//Create the context
		sprite.context = sprite.canvas.getContext('2d');
		sprite.context.mozImageSmoothingEnabled = false;
		sprite.context.webkitImageSmoothingEnabled = false;
		sprite.context.msImageSmoothingEnabled = false;
		sprite.context.imageSmoothingEnabled = false;
		sprite.scaleCanvas();
		sprite.changeLoc(sprite.startingX, sprite.startingY);
		sprite.draw();
	};
	sprite.scaleCanvas = function() {
		sprite.containerDiv.style.width = tileSize + "px";
		sprite.containerDiv.style.height = tileSize + "px";
		sprite.canvas.style.width = tileSize + "px";
		sprite.canvas.style.height = tileSize + "px";
		/*if (sprite.flippedHorizontally) {
			sprite.flippedHorizontally =  false;
			sprite.flipHorz();
		}*/
	};
	sprite.draw = function () {
		sprite.context.clearRect(0, 0, sprite.canvas.width,sprite.canvas.height);
		sprite.context.drawImage(sprite.sourceImage, sprite.selectionX*16, sprite.selectionY*16, 16, 16, 0, 0, sprite.canvas.width, sprite.canvas.height);
		sprite.removeWhite();
	};
	sprite.removeWhite = function() {
		var imageData = sprite.context.getImageData(0, 0, sprite.canvas.width, sprite.canvas.height);
		for (var i = 0; i < imageData.data.length; i+= 4) {
			if (imageData.data[i] == 255 && imageData.data[i+1] == 255 && imageData.data[i+2] == 255) {
				imageData.data[i+3] =0;
			}
		}
		sprite.context.putImageData(imageData, 0, 0);
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
		sprite.removeWhite();
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
		sprite.removeWhite();
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
		sprite.removeWhite();
	};
	sprite.move = function(horizontalIncrement, verticalIncrement) {
		if (typeof sprite.visibleDiv != "undefined") {
			sprite.visibleDiv.style.top = (getTop(sprite.visibleDiv) + (verticalIncrement*tileSize)) + 'px';
			sprite.visibleDiv.style.left = (getLeft(sprite.visibleDiv) + (horizontalIncrement*tileSize)) + 'px';
		}
		sprite.containerDiv.style.left = (getLeft(sprite.containerDiv) + (horizontalIncrement*tileSize)) + 'px';
		sprite.containerDiv.style.top = (getTop(sprite.containerDiv) + (verticalIncrement*tileSize)) + 'px';
		sprite.currentX = sprite.currentX + horizontalIncrement;
		sprite.currentY = sprite.currentY + verticalIncrement;
	};
	sprite.centre = function() {
		sprite.containerDiv.style.left = (middleX*tileSize) + "px";
		sprite.containerDiv.style.top = (middleY*tileSize) + "px";
	};
	sprite.changeLoc = function(x, y) {
		if (typeof sprite.visibleDiv != "undefined") {
			sprite.visibleDiv.style.top = y*tileSize + 'px';
			sprite.visibleDiv.style.left = x*tileSize + 'px';
		}
		sprite.containerDiv.style.left = (x*tileSize) + "px";
		sprite.containerDiv.style.top = (y*tileSize) + "px";
		sprite.currentX = x;
		sprite.currentY = y;
	};
	sprite.hide = function() {
		sprite.containerDiv.style.display = "none";
	};
	sprite.show = function() {
		sprite.containerDiv.style.display = "block";
	};
	sprite.changeSelection = function(x,y) {
		sprite.selectionX = x;
		sprite.selectionY = y;
	};
	sprite.remove = function() {
		if (sprite.entityClass != "player") {
			document.getElementById('mapContainerDiv').removeChild(sprite.containerDiv);
		}
	};
	sprite.initialise();
    return sprite;
}




//End