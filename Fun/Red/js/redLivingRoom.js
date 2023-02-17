'use strict';
//Enable strict mode

function RedLivingRoom(tileSetParam, tlXParam, tlYParam, widthParam, heightParam) {
    let redLivingRoom = new Map(tileSetParam, tlXParam, tlYParam, widthParam, heightParam);
    redLivingRoom.draw = function() {
		//First, reset the canvas
		redLivingRoom.scaleMap();
		redLivingRoom.clearMap();
        //Row 1 start
        //Top of bookcase left
        //redLivingRoom.drawHalfTile(3, 2, 0, 3, true);
        redLivingRoom.drawQuarterTile(6, 2, 9, 2, 0, 3, 1, 3, true);
		//Top of bookcase right
        redLivingRoom.drawQuarterTile(6, 2, 9, 2, 0, 3, 1, 3, true);
        //Right of bookcase right
        redLivingRoom.buildWallTile();
		//Leftmost window
        redLivingRoom.drawTile(2, 1, true);
        //Middle window
        redLivingRoom.buildWallTile();
        //Right window
        redLivingRoom.drawTile(2, 1, true);
        //Right of middle window
        redLivingRoom.buildWallTile();
        //Right window
        redLivingRoom.drawTile(2, 1, true);
        //Row 2 start
        //Bookcase bottom left
		redLivingRoom.drawInteractableTile(1, 1, function() {
			textBox.startDialog("Crammed full of POKéMON books!");
		});
        //Bookcase bottom right
		redLivingRoom.drawInteractableTile(1, 1, function() {
			textBox.startDialog("Crammed full of POKéMON books!");
		});
        //Floor to right of right bookcase
        redLivingRoom.buildFloorTile();
		//TV
		redLivingRoom.drawInteractableTile(3, 0, function() {
			textBox.startDialog("There's a movie on TV. Four boys&are walking on railroad tracks.&~I better go too.");
		});
        //Right of TV before stairs
        redLivingRoom.buildFloorTile();
        redLivingRoom.buildFloorTile();
        redLivingRoom.buildFloorTile();
        //Stairs
        redLivingRoom.drawSpecialTile(6, 0, function() {
			console.log("Loading new map...");
			//Load next map
			redLivingRoom.unload();
			currentMap = new PlayerBedroom(redsHouse, 8, 8, 3, 6);
		}, false);
        //Row 3 start (floor tiles only)
        redLivingRoom.buildFloorTile();
        redLivingRoom.buildFloorTile();
        redLivingRoom.buildFloorTile();
        redLivingRoom.buildFloorTile();
        redLivingRoom.buildFloorTile();
        redLivingRoom.buildFloorTile();
        redLivingRoom.buildFloorTile();
        redLivingRoom.buildFloorTile();
        //Row 4 start (floor tiles only)
        redLivingRoom.buildFloorTile();
        redLivingRoom.buildFloorTile();
        redLivingRoom.buildFloorTile();
        redLivingRoom.buildFloorTile();
        redLivingRoom.buildFloorTile();
        redLivingRoom.buildFloorTile();
        redLivingRoom.buildFloorTile();
        redLivingRoom.buildFloorTile();
		//Row 5 start
        redLivingRoom.buildFloorTile();
        redLivingRoom.buildFloorTile();
		//Top left chair
		redLivingRoom.drawTile(1, 0, false);
        //Table top left
		redLivingRoom.drawTile(3, 1, true);
        //Table top right
		redLivingRoom.drawTile(4, 1, true);
		//Top right chair
		redLivingRoom.drawTile(1, 0, false);
        redLivingRoom.buildFloorTile();
        redLivingRoom.buildFloorTile();
		//Row 6 start 
        redLivingRoom.buildFloorTile();
        redLivingRoom.buildFloorTile();
		//Bottom left chair
		redLivingRoom.drawTile(1, 0, false);
		//Bottom left table
		redLivingRoom.drawQuarterTile(12,2,10,2,12,3,10,3,true);
		//Bottom right table
		redLivingRoom.drawTile(5, 1, true);
		//Bottom right chair
		redLivingRoom.drawTile(1, 0, false);
        redLivingRoom.buildFloorTile();
        redLivingRoom.buildFloorTile();
		//Row 7 start (floor tiles only)
        redLivingRoom.buildFloorTile();
        redLivingRoom.buildFloorTile();
        redLivingRoom.buildFloorTile();
        redLivingRoom.buildFloorTile();
        redLivingRoom.buildFloorTile();
        redLivingRoom.buildFloorTile();
        redLivingRoom.buildFloorTile();
        redLivingRoom.buildFloorTile();
		//Row 8 start
        redLivingRoom.buildFloorTile();
        redLivingRoom.buildFloorTile();
		redLivingRoom.drawSpecialQuarterTile(4,0,4,0,4,1,4,1,function() {
			textBox.startDialog("Thanks for checking out my&pokemon remake.&~This is all I've built so far!");
		},true);
		redLivingRoom.drawSpecialQuarterTile(4,0,4,0,4,1,4,1,function() {
			textBox.startDialog("Thanks for checking out my&pokemon remake.&~This is all I've built so far!");
		},true);
		redLivingRoom.buildFloorTile();
		redLivingRoom.buildFloorTile();
		redLivingRoom.buildFloorTile();
        redLivingRoom.buildFloorTile();
        redLivingRoom.buildFloorTile();
        //END of rendering
		//Create mom character
		var momCharacter = new CharacterSprite(momSprite, 5, 4, false, function() {
			momCharacter.facePlayer();
			textBox.startDialog("MOM: Right.&All boys leave&home some day.&It said so on TV.&~PROF. OAK, next door, is looking&for you.", false, function() {
				momCharacter.showLeftStill();
			});
		});
		momCharacter.showLeftStill();
    };
    redLivingRoom.buildWallTile = function() {
        redLivingRoom.drawQuarterTile(0, 0, 0, 0, 0, 0, 0, 0, true);
    };
    redLivingRoom.buildFloorTile = function() {
        redLivingRoom.drawQuarterTile(1, 0, 1, 0, 1, 0, 1, 0);
    };
	redLivingRoom.draw();
    return redLivingRoom;
}




// End