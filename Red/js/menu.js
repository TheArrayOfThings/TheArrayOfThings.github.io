'use strict';
//Enable strict mode

function Menu(widthParam, heightParam, xParam, yParam) {
	let menu = new TextBox(widthParam, heightParam, xParam, yParam);
	menu.options = [];
	menu.width = widthParam;
	menu.height = heightParam;
	menu.loadedOptions = 0;
	menu.currentOption = 0;
	menu.class = "menu";
	menu.initialise = function() {
		menu.fullReset();
		menu.tCanvas.style.left = (getLeft(menu.tCanvas) + tileSize/2) + "px";
	};
	menu.start = function(textToShow) {
		menu.currentOption = 0;
		menu.showSelectionArrow();
		currentMenu = menu;
		textBox.startDialog(textToShow, true, function() {
			currentState = states.INMENU;
			menu.show();
		});
	};
	/*menu.startSilent = function() {
		menu.currentOption = 0;
		menu.showSelectionArrow();
		currentMenu = menu;
		currentState = states.INMENU;
		menu.show();
	};*/
	menu.loadNext = function(displayTextParam, functionToRunParam, isItem, itemCount) {
		if (menu.loadedOptions >= menu.options.length) {
			menu.options.push(new MenuOption(menu));
		}
		if (isItem) {
			menu.options[menu.loadedOptions].isItem = true;
			menu.options[menu.loadedOptions].count = itemCount;
		}
		menu.options[menu.loadedOptions].load(displayTextParam, functionToRunParam);
		menu.loadedOptions = menu.loadedOptions + 1;
	};
	menu.selectNext = function() {
		if (menu.currentOption + 1 == menu.options.length) {
			return;
		} else {
			menu.currentOption = menu.currentOption + 1;
			menu.showSelectionArrow();
		}
	};
	menu.selectPrevious = function() {
		if (menu.currentOption == 0) {
			return;
		} else {
			menu.currentOption = menu.currentOption - 1;
			menu.showSelectionArrow();
		}
	};
	menu.showSelectionArrow = function() {
		//menu.arrowOn = true;
		menu.hideSelectionArrow();
		menu.bContext.drawImage(font, 13 * 8, 6 * 8, 8, 8, /*dx*/menu.fontScale, /*dy*/(((menu.currentOption+2)*tileSize) - tileSize)-tileSize/3, /*dWidth*/tileSize / 3, /*dHeight*/tileSize / 3);	
	};
	menu.hideSelectionArrow = function() {
		//menu.arrowOn = false;
		menu.bContext.drawImage(font, 0 * 8, 4 * 8, 8, 8, /*dx*/menu.fontScale, /*dy*/tileSize/2, /*dWidth*/tileSize / 3, /*dHeight*/(menu.height*tileSize)-tileSize);
	};
	menu.stop = function () {
		menu.hide();
		textBox.hide();
		currentState = states.INOVERWORLD;
	};
	menu.fullReset = function() {
		menu.scaleBox();
		menu.options = [];
		menu.loadedOptions = 0;
		menu.currentOption = 0;
		menu.clear();
	};
	menu.redraw = function() {
		menu.clear();
		menu.loadedOptions = 0;
		menu.currentX = 0;
		menu.currentY = 0;
		//menu.currentOption = 0;
		for (let i = 0; i < menu.options.length; ++i) {
			menu.loadNext(menu.options[i].displayText, menu.options[i].functionToRun, menu.options[i].isItem, menu.options[i].count);
		}
	};
	menu.removeOption = function(toRemove) {
		menu.options.splice(toRemove, 1);
		menu.currentOption = 0;
		//menu.redraw();
		//menu.loadedOptions = menu.loadedOptions - 1;
	};
	menu.pressedA = function () {
		if (menu.options[menu.currentOption].functionToRun != null & menu.options[menu.currentOption].functionToRun != undefined) {
			menu.options[menu.currentOption].functionToRun();
		}
	};
	menu.pressedB = function () {
		menu.stop();
	};
	menu.pressedUp = function () {
		menu.selectPrevious();
	};
	menu.pressedDown = function () {
		menu.selectNext();
	};
	menu.pressedLeft = function () {
		
	};
	menu.pressedRight = function () {
		
	};
	
	menu.initialise();
	return menu;
}