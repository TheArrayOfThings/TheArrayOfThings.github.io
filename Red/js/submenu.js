'use strict';
//Enable strict mode

function SubMenu(widthParam, heightParam, parentParam) {
	let submenu = new Menu(widthParam, heightParam, -2, -4);
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
	return submenu;
}