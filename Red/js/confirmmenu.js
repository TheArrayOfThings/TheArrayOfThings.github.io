'use strict';
//Enable strict mode

function ConfirmMenu() {
    let confirmMenu = new Menu(3, 2, middleX+2.5, middleY);
    confirmMenu.class = "submenu";
    confirmMenu.parent = undefined;
    confirmMenu.currentQuantity = 1;
    confirmMenu.totalItems = undefined;
    confirmMenu.confirmed = false;
    confirmMenu.start = function(displayTextParam, parentParam) {
        confirmMenu.confirmed = false;
        confirmText.displayText = displayTextParam;
        confirmMenu.parent = parentParam;
        confirmMenu.showSelectionArrow();
        confirmMenu.fullReset();
		textBox.startDialog(confirmText.displayText, false, function() {
			currentState = states.INSUBMENU;
			currentMenu = confirmMenu;
			confirmMenu.show();
		});
	};
	confirmMenu.stop = function() {
		confirmMenu.hide();
        textBox.clear();
    };
    confirmMenu.pressedA = function () {
        confirmMenu.confirmed = true;
		if (confirmMenu.options[confirmMenu.currentOption].functionToRun != null & confirmMenu.options[confirmMenu.currentOption].functionToRun != undefined) {
			confirmMenu.options[confirmMenu.currentOption].functionToRun();
        }
    };
    confirmMenu.pressedB = function () {
        confirmMenu.confirmed = false;
		if (confirmMenu.options[confirmMenu.currentOption].functionToRun != null & confirmMenu.options[confirmMenu.currentOption].functionToRun != undefined) {
			confirmMenu.options[confirmMenu.currentOption].functionToRun();
        }
    };
    confirmMenu.loadNext("Yes", function() {
        confirmMenu.confirmed = true;
    });
    confirmMenu.loadNext("Yes", function() {
        confirmMenu.confirmed = false;
    });
    document.getElementById('menu').removeChild(confirmMenu.bCanvas);
    document.getElementById('menu').removeChild(confirmMenu.tCanvas);
    document.getElementById('frontmenu').appendChild(confirmMenu.bCanvas);
    document.getElementById('frontmenu').appendChild(confirmMenu.tCanvas);
    return confirmMenu;
}