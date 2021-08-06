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
			if (!startMenu.pokeMenu) {
				//Spawn new submenu
				startMenu.pokeMenu = new SubMenu(6, 5, pokemon.length + 1, startMenu);
			}
			//Reset menu
			startMenu.pokeMenu.fullReset();
			if (pokemon.length > 0) {
				//Load items
				for (let i = 0; i < pokemon.length; ++i) {
					startMenu.pokeMenu.loadNext(pokemon[i].name, function() {
						//Do something with the pokemon
					}, true);
				}
				//Load cancel
				startMenu.pokeMenu.loadNext("CANCEL", function() {startMenu.pokeMenu.stop();});
				//Start the menu
				startMenu.pokeMenu.start("Something something pokemon?");
			} else {
				
				//textBox.startDialog("You have no pokemon :(", true, function(){currentState = states.INMENU;});
			}
		});
		startMenu.loadNext("ITEM", function() {
			if (!startMenu.itemMenu) {
				//Spawn new submenu
				startMenu.itemMenu = new SubMenu(6, 5, computerItems.length + 1, startMenu);
			}
			//Reset menu
			startMenu.itemMenu.fullReset();
			if (computerItems.length > 0) {
				//Load items
				for (let i = 0; i < computerItems.length; ++i) {
					startMenu.itemMenu.loadNext(computerItems[i].name, function() {
						//Start a use menu I guess? 
					}, true);
				}
				//Load cancel
				startMenu.itemMenu.loadNext("CANCEL", function() {startMenu.itemMenu.stop();});
				//Start the menu
				startMenu.itemMenu.start("What do you want to withdraw?");
			} else {
				textBox.startDialog("Nothing to withdraw&~What do you want to do?", true, function(){currentState = states.INMENU;});
			}
		});
		startMenu.loadNext(playerName, function() {
			if (!startMenu.playerMenu) {
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
			}
		});
		startMenu.loadNext("SAVE", function() {
			if (!startMenu.playerMenu) {
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
			}
		});
		startMenu.loadNext("OPTION", function() {
			if (!startMenu.playerMenu) {
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
			}
		});
		startMenu.loadNext("EXIT", function() {
			startMenu.stop();
		});
	};
	return startMenu;
}