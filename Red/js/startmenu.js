'use strict';
//Enable strict mode

function StartMenu(xParam, yParam) {
	let startMenu = new Menu(4, 7, xParam, yParam, 4);
	startMenu.pokeMenu = undefined;
	startMenu.itemMenu = undefined;
	startMenu.playerMenu = undefined;
	startMenu.start = function() {
		startMenu.fullReset();
		startMenu.initialise();
		startMenu.showSelectionArrow();
		currentMenu = startMenu;
		currentState = states.INMENU;
		startMenu.show();
	};
	startMenu.initialise = function() {
		startMenu.loadNext("POKéMON", function() {
			
		});
		startMenu.loadNext("ITEM", function() {
			if (!startMenu.itemMenu) {
				//Spawn new submenu
				startMenu.itemMenu = new SubMenu(6, 5, startMenu);
			}
			//Reset menu
			startMenu.itemMenu.fullReset();
			if (playerItems.length > 0) {
				//Load items
				for (let i = 0; i < playerItems.length; ++i) {
					startMenu.itemMenu.loadNext(playerItems[i].name, function() {
						//Toss confirm menu presumably!
					}, true, playerItems[i].quantity);
				}
				//Load cancel
				startMenu.itemMenu.loadNext("CANCEL", function() {startMenu.itemMenu.stopQuiet();});
				//Start the menu
				startMenu.itemMenu.startQuiet();
			} else {
				textBox.startDialog("There is nothing stored.&~What do you want to do?", true, function(){currentState = states.INMENU;});
			}
		});
		startMenu.loadNext(playerName, function() {
			
		});
		startMenu.loadNext("SAVE", function() {
			if (isInternetExplorer) {
				startMenu.stop();
				textBox.startDialog("Internet explorer detected!&~Unable to save!", false, function(){
					
				});
			} else {
				startMenu.stop();
				textBox.startDialog("Game saved!", false, function(){
					localStorage.setItem("playerX", player.currentX);
					localStorage.setItem("playerY", player.currentY);
					localStorage.setItem("playerDirection", player.direction);
				});
			}
		});
		startMenu.loadNext("OPTION", function() {
			/*if (!startMenu.playerMenu) {
				//Spawn new submenu
				startMenu.playerMenu = new SubMenu(6, 5, computerItems.length + 1, startMenu);
			}
			//Reset menu
			startMenu.playerMenu.fullReset();
			if (computerItems.length > 0) {
				//Load items
				for (let i = 0; i < computerItems.length; ++i) {
					startMenu.playerMenu.loadNext(computerItems[i].name, function() {

					}, true);
				}
				//Load cancel
				startMenu.playerMenu.loadNext("CANCEL", function() {startMenu.itemMenu.stop();});
				//Start the menu
				startMenu.playerMenu.start("What do you want to withdraw?");
			} else {
				textBox.startDialog("Nothing to withdraw&~What do you want to do?", true, function(){currentState = states.INMENU;});
			}*/
		});
		startMenu.loadNext("EXIT", function() {
			startMenu.stop();
		});
	};
	return startMenu;
}