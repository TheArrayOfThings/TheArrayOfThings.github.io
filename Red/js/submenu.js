'use strict';
//Enable strict mode

function SubMenu(widthParam, heightParam, parentParam) {
	let submenu = new Menu(widthParam, heightParam, (-parentParam.bX)-1, parentParam.bY);
	submenu.class = "submenu";
	submenu.parent = parentParam;
	submenu.start = function(textToShow) {
		//submenu.currentItem = 0;
		submenu.showSelectionArrow();
		textBox.startDialog(textToShow, false, function() {
			currentState = states.INSUBMENU;
			currentMenu = submenu;
			submenu.show();
		});
	};
	submenu.startQuiet = function() {
		//submenu.currentItem = 0;
		submenu.showSelectionArrow();
		currentState = states.INSUBMENU;
		currentMenu = submenu;
		submenu.show();
	};
	submenu.stop = function() {
		submenu.hide();
		currentMenu = submenu.parent;
		if (submenu.parent.class == "submenu") {
			currentState = states.INSUBMENU;
		} else {
			currentState = states.INMENU;
		}
		textBox.clear();
		textBox.startDialog("What do you want to do?", true, function(){currentState = states.INMENU;});
		//submenu.parent.start("What do you want to do?");
	};
	submenu.stopQuiet = function() {
		submenu.hide();
		currentMenu = submenu.parent;
		if (submenu.parent.class == "submenu") {
			currentState = states.INSUBMENU;
		} else {
			currentState = states.INMENU;
		}
		currentState = states.INMENU;
	};
	return submenu;
}