'use strict';
//Enable strict mode

function Computer(xParam, yParam) {
	let computer = new Menu(6, 5, xParam, yParam);
	computer.withdrawMenu = undefined;
	computer.depositMenu = undefined;
	computer.tossMenu = undefined;
	computer.start = function(textToShow) {
		computer.fullReset();
		computer.initialise();
		computer.showSelectionArrow();
		currentMenu = computer;
		textBox.startDialog(textToShow, true, function() {
			currentState = states.INMENU;
			computer.show();
		});
	};
	computer.initialise = function() {
		computer.loadNext("WITHDRAW ITEM", function() {
			if (!computer.withdrawMenu) {
				//Spawn new submenu
				computer.withdrawMenu = new SubMenu(6, 5, computer);
			}
			//Reset menu
			computer.withdrawMenu.fullReset();
			if (computerItems.length > 0) {
				//Load items
				for (let i = 0; i < computerItems.length; ++i) {
					computer.withdrawMenu.loadNext(computerItems[i].name, function() {
						mainQuantityMenu.start(computerItems[i].quantity, computer.withdrawMenu);
						mainQuantityMenu.loadNext("x " + computerItems[i].quantity, function() {
							//If we cancelled the how many selection, we need to do one thing
							if (mainQuantityMenu.confirmed == false) {
								mainQuantityMenu.stop();
								textBox.startDialog("What do you want to withdraw?", false, function(){
									computer.withdrawMenu.redraw();
									currentState = states.INSUBMENU;
									currentMenu = computer.withdrawMenu;
								});
							} else if (mainQuantityMenu.currentQuantity >= computerItems[i].quantity) {
								//If we withdrew it all, then withdraw everything
								mainQuantityMenu.stop();
								//Remove the item from computerItems and add it to playerItems
								playerItems.push(computerItems.splice(i, 1)[0]);
								mergeArrayDuplicates(playerItems);
								//Remove the menuoption for this item
								computer.withdrawMenu.removeOption(computer.withdrawMenu.currentOption);
								textBox.startDialog("Withdrew " + playerItems[playerItems.length -1].name + ".&~What do you want to withdraw?", false, function(){
									computer.withdrawMenu.redraw();
									currentState = states.INSUBMENU;
									currentMenu = computer.withdrawMenu;
								});
							} else {
								//We deposited some if it - so update the menuoption and the item quantity
								mainQuantityMenu.stop();
								var itemCopy = JSON.parse(JSON.stringify(computerItems[i]));
								itemCopy.quantity = mainQuantityMenu.currentQuantity;
								playerItems.push(itemCopy);
								mergeArrayDuplicates(playerItems);
								computerItems[i].quantity = computerItems[i].quantity - mainQuantityMenu.currentQuantity;
								computer.withdrawMenu.options[computer.withdrawMenu.currentOption].count = computerItems[i].quantity;
								textBox.startDialog("Withdrew " + playerItems[playerItems.length -1].name + ".&~What do you want to withdraw?", false, function(){
									//computer.tossMenu.options[computer.depositMenu.currentOption].reload();
									computer.withdrawMenu.redraw();
									currentState = states.INSUBMENU;
									currentMenu = computer.withdrawMenu;
								});
							}
						}, true);
					}, true, computerItems[i].quantity);
				}
				//Load cancel
				computer.withdrawMenu.loadNext("CANCEL", function() {computer.withdrawMenu.stop();});
				//Start the menu
				computer.withdrawMenu.start("What do you want to withdraw?");
			} else {
				textBox.startDialog("There is nothing stored.&~What do you want to do?", true, function(){currentState = states.INMENU;});
			}
		});
		computer.loadNext("DEPOSIT ITEM", function() {
			if (!computer.depositMenu) {
				//Spawn new submenu
				computer.depositMenu = new SubMenu(6, 5, computer);
			}
			//Reset menu
			computer.depositMenu.fullReset();
			if (playerItems.length > 0) {
				//Load items
				for (let i = 0; i < playerItems.length; ++i) {
					computer.depositMenu.loadNext(playerItems[i].name, function() {
						mainQuantityMenu.start(playerItems[i].quantity, computer.depositMenu);
						mainQuantityMenu.loadNext("x " + playerItems[i].quantity, function() {
							//If we cancelled the how many selection, we need to do one thing
							if (mainQuantityMenu.confirmed == false) {
								mainQuantityMenu.stop();
								textBox.startDialog("What do you want to deposit?", false, function(){
									computer.depositMenu.redraw();
									currentState = states.INSUBMENU;
									currentMenu = computer.depositMenu;
								});
							} else if (mainQuantityMenu.currentQuantity >= playerItems[i].quantity) {
								//If we deposited it all, then deposit away everything
								mainQuantityMenu.stop();
								//Remove the item from player items and add it to computerItems
								computerItems.push(playerItems.splice(i, 1)[0]);
								mergeArrayDuplicates(computerItems);
								//Remove the menuoption for this item
								computer.depositMenu.removeOption(computer.depositMenu.currentOption);
								textBox.startDialog(computerItems[computerItems.length -1].name + " was stored via PC.&~What do you want to deposit?", false, function(){
									computer.depositMenu.redraw();
									currentState = states.INSUBMENU;
									currentMenu = computer.depositMenu;
								});
							} else {
								//We deposited some if it - so update the menuoption and the item quantity
								mainQuantityMenu.stop();
								var itemCopy = JSON.parse(JSON.stringify(playerItems[i]));
								itemCopy.quantity = mainQuantityMenu.currentQuantity;
								computerItems.push(itemCopy);
								mergeArrayDuplicates(computerItems);
								playerItems[i].quantity = playerItems[i].quantity - mainQuantityMenu.currentQuantity;
								computer.depositMenu.options[computer.depositMenu.currentOption].count = playerItems[i].quantity;
								textBox.startDialog(computerItems[computerItems.length -1].name + " was stored via PC.&~What do you want to deposit?", false, function(){
									//computer.tossMenu.options[computer.depositMenu.currentOption].reload();
									computer.depositMenu.redraw();
									currentState = states.INSUBMENU;
									currentMenu = computer.depositMenu;
								});
							}
						}, true);
					}, true, playerItems[i].quantity);
				}
				//Load cancel
				computer.depositMenu.loadNext("CANCEL", function() {computer.depositMenu.stop();});
				//Start the menu
				computer.depositMenu.start("What do you want to deposit?");
			} else {
				textBox.startDialog("You have nothing to deposit.&~What do you want to do?", true, function(){currentState = states.INMENU;});
			}
		});
		computer.loadNext("TOSS ITEM", function() {
			//TO DO
			//Add confirmation menu
			if (!computer.tossMenu) {
				//Spawn new submenu
				computer.tossMenu = new SubMenu(6, 5, computer);
			}
			//Reset menu
			computer.tossMenu.fullReset();
			if (computerItems.length > 0) {
				//Load items
				for (let i = 0; i < computerItems.length; ++i) {
					computer.tossMenu.loadNext(computerItems[i].name, function() {
						mainQuantityMenu.start(computerItems[i].quantity, computer.tossMenu);
						mainQuantityMenu.loadNext("x " + computerItems[i].quantity, function() {
							//If we cancelled the how many selection, we need to do one thing
							if (mainQuantityMenu.confirmed == false) {
								mainQuantityMenu.stop();
								textBox.startDialog("What do you want to toss away?", false, function(){
									computer.tossMenu.redraw();
									currentState = states.INSUBMENU;
									currentMenu = computer.tossMenu;
								});
							} else if (mainQuantityMenu.currentQuantity >= computerItems[i].quantity) {
								//If we withdrew it all, then toss away everything
								mainQuantityMenu.stop();
								computer.tossMenu.removeOption(computer.tossMenu.currentOption);
								textBox.startDialog("Threw away " + computerItems.splice(i, 1)[0].name + "&~What do you want to toss away?", false, function(){
									computer.tossMenu.redraw();
									currentState = states.INSUBMENU;
									currentMenu = computer.tossMenu;
								});
							} else {
								//We withdrew some if it - so update the menuoption and the item quantity
								mainQuantityMenu.stop();
								computerItems[i].quantity = computerItems[i].quantity - mainQuantityMenu.currentQuantity;
								computer.tossMenu.options[computer.tossMenu.currentOption].count = computerItems[i].quantity;
								textBox.startDialog("Threw away " + computerItems[i].name + "&~What do you want to toss away?", false, function(){
									//computer.tossMenu.options[computer.tossMenu.currentOption].reload();
									computer.tossMenu.redraw();
									currentState = states.INSUBMENU;
									currentMenu = computer.tossMenu;
								});
							}
						}, true);
					}, true, computerItems[i].quantity);
				}
				//Load cancel
				computer.tossMenu.loadNext("CANCEL", function() {computer.tossMenu.stop();});
				//Start the menu
				computer.tossMenu.start("What do you want to toss away?");
			} else {
				textBox.startDialog("There is nothing stored.&~What do you want to do?", true, function(){currentState = states.INMENU;});
			}
		});
		computer.loadNext("LOG OFF", function() {
			computer.stop();
		});
	};
	return computer;
}