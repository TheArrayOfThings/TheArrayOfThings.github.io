'use strict';
//Enable strict mode

function Box(bWidthParam, bHeightParam, bXOffsetParam, bYOffsetParam) {
    let box = {
        class: "box",
        bWidth: bWidthParam,
        bHeight: bHeightParam,
        bX: bXOffsetParam,
        bY: bYOffsetParam,
        bCanvas: undefined,
		boxContainerDiv:undefined,
		originalTileSize:undefined,
        initialise: function() {
			this.originalTileSize = tileSize;
			this.boxContainerDiv = document.createElement("div");
			this.boxContainerDiv.style.position = "absolute";
			this.boxContainerDiv.id = "boxContainerDiv";
			document.getElementById('menu').appendChild(this.boxContainerDiv);
            //Create the background canvas
            this.bCanvas = document.createElement('canvas');
            this.bCanvas.id = "boxCanvas";
            this.bCanvas.style.position = "absolute";
            this.bCanvas.style.overflow = "hidden";
			this.boxContainerDiv.appendChild(this.bCanvas);

            this.bCanvas.width = this.bWidth * this.originalTileSize;
            this.boxContainerDiv.width = this.bWidth * this.originalTileSize;
            this.bCanvas.height = this.bHeight * this.originalTileSize;
            this.boxContainerDiv.height = this.bHeight * this.originalTileSize;
            //Create the background context
            this.bContext = this.bCanvas.getContext('2d');
			this.bContext.mozImageSmoothingEnabled = false;
			this.bContext.webkitImageSmoothingEnabled = false;
			this.bContext.msImageSmoothingEnabled = false;
			this.bContext.imageSmoothingEnabled = false;
			this.bContext.clearRect(0, 0, this.bCanvas.width,this.bCanvas.height);
            this.draw();
            this.bCanvas.style.display = "none";
			this.scaleBox();
        },
		scaleBox: function() {
            this.boxContainerDiv.style.height = this.bHeight * this.originalTileSize + "px";
            this.boxContainerDiv.style.width = this.bWidth * this.originalTileSize + "px";
            this.bCanvas.style.height = this.bHeight * this.originalTileSize + "px";
            this.bCanvas.style.width = this.bWidth * this.originalTileSize + "px";
            this.boxContainerDiv.style.left = (middleX + this.bX) * this.originalTileSize + "px";
            this.boxContainerDiv.style.top = (middleY + this.bY) * this.originalTileSize + "px";
		},
        draw: function() {
            for (let i = 0; i < this.bHeight * 2; ++i) { //for each row
                for (let n = 0; n < this.bWidth * 2; ++n) { //for each column
                    if (i == 0 && n == 0) {
                        //Top left corner
                        this.bContext.drawImage(boxImage, 1 * 8, 6 * 8, 8, 8, n * this.originalTileSize, i * this.originalTileSize, this.originalTileSize / 2, this.originalTileSize / 2);
                    } else if (i == 0 && n == this.bWidth * 2 - 1) {
                        //Top right corner
                        this.bContext.drawImage(boxImage, 3 * 8, 6 * 8, 8, 8, n * (this.originalTileSize / 2), i * (this.originalTileSize / 2), this.originalTileSize / 2, this.originalTileSize / 2);
                    } else if (i == this.bHeight * 2 - 1 && n == 0) {
                        //Bottom left corner
                        this.bContext.drawImage(boxImage, 1 * 8, 7 * 8, 8, 8, n * (this.originalTileSize / 2), i * (this.originalTileSize / 2), this.originalTileSize / 2, this.originalTileSize / 2);
                    } else if (i == this.bHeight * 2 - 1 && n == this.bWidth * 2 - 1) {
                        //Bottom right corner
                        this.bContext.drawImage(boxImage, 2 * 8, 7 * 8, 8, 8, n * (this.originalTileSize / 2), i * (this.originalTileSize / 2), this.originalTileSize / 2, this.originalTileSize / 2);
                    } else if (i == 0 || i == this.bHeight * 2 - 1) {
                        //first or last row being drawn
                        this.bContext.drawImage(boxImage, 2 * 8, 6 * 8, 8, 8, n * (this.originalTileSize / 2), i * (this.originalTileSize / 2), this.originalTileSize / 2, this.originalTileSize / 2);
                    } else if (n == 0 || n == this.bWidth * 2 - 1) {
                        //first or last column being drawn
                        this.bContext.drawImage(boxImage, 0 * 8, 7 * 8, 8, 8, n * (this.originalTileSize / 2), i * (this.originalTileSize / 2), this.originalTileSize / 2, this.originalTileSize / 2);
                    } else {
                        //Draw white
                        this.bContext.drawImage(boxImage, 3 * 8, 7 * 8, 8, 8, n * (this.originalTileSize / 2), i * (this.originalTileSize / 2), this.originalTileSize / 2, this.originalTileSize / 2);
                    }
                }
            }
        },
        show: function() {
            this.bCanvas.style.display = "block"; 
            this.showContents();
        },
        hide: function() {
            this.bCanvas.style.display = "none";
            this.hideContents();
        },
        showContents: function() {},
        hideContents: function() {}
    };
    box.initialise();
    return box;
}