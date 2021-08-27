'use strict';
//Enable strict mode

function Box(bWidthParam, bHeightParam, bXParam, bYParam) {
    let box = {
        class: "box",
        bWidth: bWidthParam,
        bHeight: bHeightParam,
        bX: bXParam,
        bY: bYParam,
        bCanvas: undefined,
        bContext: undefined,
        initialise: function() {
            //Create the background canvas
            this.bCanvas = document.createElement('canvas');
            this.bCanvas.style.position = "absolute";
            this.bCanvas.style.width = this.bWidth * tileSize + "px";
            this.bCanvas.width = this.bWidth * tileSize;
            this.bCanvas.style.height = this.bHeight * tileSize + "px";
            this.bCanvas.height = this.bHeight * tileSize;
            this.bCanvas.style.overflow = "hidden";
            //Create the background context
            this.bContext = this.bCanvas.getContext('2d');
			this.bContext.mozImageSmoothingEnabled = false;
			this.bContext.webkitImageSmoothingEnabled = false;
			this.bContext.msImageSmoothingEnabled = false;
			this.bContext.imageSmoothingEnabled = false;
            this.bCanvas.style.left = this.bX * tileSize + "px";
            this.bCanvas.style.top = this.bY * tileSize + "px";
            this.bCanvas.style.visibility = "hidden";
            this.draw();
        },
        draw: function() {
            for (let i = 0; i < this.bHeight * 2; ++i) { //for each row
                for (let n = 0; n < this.bWidth * 2; ++n) { //for each column
                    if (i == 0 && n == 0) {
                        //Top left corner
                        this.bContext.drawImage(boxImage, 1 * 8, 6 * 8, 8, 8, n * tileSize, i * tileSize, tileSize / 2, tileSize / 2);
                    } else if (i == 0 && n == this.bWidth * 2 - 1) {
                        //Top right corner
                        this.bContext.drawImage(boxImage, 3 * 8, 6 * 8, 8, 8, n * (tileSize / 2), i * (tileSize / 2), tileSize / 2, tileSize / 2);
                    } else if (i == this.bHeight * 2 - 1 && n == 0) {
                        //Bottom left corner
                        this.bContext.drawImage(boxImage, 1 * 8, 7 * 8, 8, 8, n * (tileSize / 2), i * (tileSize / 2), tileSize / 2, tileSize / 2);
                    } else if (i == this.bHeight * 2 - 1 && n == this.bWidth * 2 - 1) {
                        //Bottom right corner
                        this.bContext.drawImage(boxImage, 2 * 8, 7 * 8, 8, 8, n * (tileSize / 2), i * (tileSize / 2), tileSize / 2, tileSize / 2);
                    } else if (i == 0 || i == this.bHeight * 2 - 1) {
                        //first or last row being drawn
                        this.bContext.drawImage(boxImage, 2 * 8, 6 * 8, 8, 8, n * (tileSize / 2), i * (tileSize / 2), tileSize / 2, tileSize / 2);
                    } else if (n == 0 || n == this.bWidth * 2 - 1) {
                        //first or last column being drawn
                        this.bContext.drawImage(boxImage, 0 * 8, 7 * 8, 8, 8, n * (tileSize / 2), i * (tileSize / 2), tileSize / 2, tileSize / 2);
                    } else {
                        //Draw white
                        this.bContext.drawImage(boxImage, 3 * 8, 7 * 8, 8, 8, n * (tileSize / 2), i * (tileSize / 2), tileSize / 2, tileSize / 2);
                    }
                }
            }
            document.getElementById('menu').appendChild(this.bCanvas);
        },
        show: function() {
            this.bCanvas.style.visibility = "visible";
            this.showContents();
        },
        hide: function() {
            this.bCanvas.style.visibility = "hidden";
            this.hideContents();
        },
        showContents: function() {},
        hideContents: function() {}
    };
    box.initialise();
    return box;
}