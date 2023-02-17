'use strict';
//Enable strict mode

function PlayerBedroom(tileSetParam, tlXParam, tlYParam, widthParam, heightParam) {
    let playerbedroom = new Map(tileSetParam, tlXParam, tlYParam, widthParam, heightParam);
    playerbedroom.draw = function() {
		//First, reset the canvas
		playerbedroom.scaleMap();
		playerbedroom.clearMap();
        //Row 1 start
        //Computer
        playerbedroom.drawHalfTile(0, 4, 0, 2, true);
        //Table top left
        playerbedroom.drawQuarterTile(0, 0, 0, 0, 6, 2, 7, 2, true);
        //Table top right
        playerbedroom.drawQuarterTile(0, 0, 0, 0, 7, 2, 9, 2, true);
        //Right of tableRight
        playerbedroom.buildWallTile();
        //Left of middle window
        playerbedroom.buildWallTile();
        //Middle window
        playerbedroom.drawTile(2, 1, true);
        //Right of middle window
        playerbedroom.buildWallTile();
        //Right window
        playerbedroom.drawTile(2, 1, true);
        //Row 2 start
        //Computer keyboard
		playerbedroom.drawInteractableHalfTile(1, 4, 1, 3, function() {
			mainComputer.start("Ryan turned on the PC.&What do you want to do?");
		});
        //Table bottom left
		playerbedroom.drawQuarterTile(12, 2, 10, 2, 12, 3, 10, 3, true);
        //Table bottom right
        playerbedroom.drawTile(5, 1, true);
        //Right of table before stairs
        playerbedroom.buildFloorTile();
        playerbedroom.buildFloorTile();
        playerbedroom.buildFloorTile();
        playerbedroom.buildFloorTile();
        //Stairs
        playerbedroom.drawSpecialTile(5, 0, function() {
			console.log("Loading new map...");
			//Load next map
			playerbedroom.unload();
			currentMap = new RedLivingRoom(redsHouse, 8, 8, 3, 6);
		}, false);
        //Row 3 start (floor tiles only)
        playerbedroom.buildFloorTile();
        playerbedroom.buildFloorTile();
        playerbedroom.buildFloorTile();
        playerbedroom.buildFloorTile();
        playerbedroom.buildFloorTile();
        playerbedroom.buildFloorTile();
        playerbedroom.buildFloorTile();
        playerbedroom.buildFloorTile();
        //Row 4 start (floor tiles only)
        playerbedroom.buildFloorTile();
        playerbedroom.buildFloorTile();
        playerbedroom.buildFloorTile();
        playerbedroom.buildFloorTile();
        playerbedroom.buildFloorTile();
        playerbedroom.buildFloorTile();
        playerbedroom.buildFloorTile();
        playerbedroom.buildFloorTile();
		//Row 5 start
        playerbedroom.buildFloorTile();
        playerbedroom.buildFloorTile();
        playerbedroom.buildFloorTile();
        //TV
		playerbedroom.drawTile(3, 0, true);
        playerbedroom.buildFloorTile();
        playerbedroom.buildFloorTile();
        playerbedroom.buildFloorTile();
        playerbedroom.buildFloorTile();
		//Row 6 start 
        playerbedroom.buildFloorTile();
        playerbedroom.buildFloorTile();
        playerbedroom.buildFloorTile();
        //SNES
        playerbedroom.drawInteractableTile(7, 0, function() {
			textBox.startDialog(playerName + " is playing the SNES!&...Okay!&It's time to go!");
		});
        playerbedroom.buildFloorTile();
        playerbedroom.buildFloorTile();
        playerbedroom.buildFloorTile();
        playerbedroom.buildFloorTile();
		//Row 7 start
		//Bed top
		playerbedroom.drawQuarterTile(13, 2, 14, 2, 13, 3, 14, 3, true);
        playerbedroom.buildFloorTile();
        playerbedroom.buildFloorTile();
        playerbedroom.buildFloorTile();
        playerbedroom.buildFloorTile();
        playerbedroom.buildFloorTile();
		//Tree top
        playerbedroom.drawQuarterTile(4, 4, 5, 4, 8, 0, 9, 0, true);
        playerbedroom.buildFloorTile();
		//Row 8 start
		//Bed bottom
		playerbedroom.drawQuarterTile(13, 3, 14, 3, 15, 3, 15, 2, true);
		playerbedroom.buildFloorTile();
		playerbedroom.buildFloorTile();
		playerbedroom.buildFloorTile();
		playerbedroom.buildFloorTile();
		playerbedroom.buildFloorTile();
		//tree bottom
		playerbedroom.drawQuarterTile(6, 4, 7, 4, 8, 1, 9, 1, true);
        playerbedroom.buildFloorTile();
        //END of rendering
    };
    playerbedroom.buildWallTile = function() {
        playerbedroom.drawQuarterTile(0, 0, 0, 0, 0, 0, 0, 0, true);
    };
    playerbedroom.buildFloorTile = function() {
        playerbedroom.drawQuarterTile(1, 0, 1, 0, 1, 0, 1, 0);
    };
	playerbedroom.draw();
    return playerbedroom;
}




// End