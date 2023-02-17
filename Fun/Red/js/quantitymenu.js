'use strict';
//Enable strict mode

function QuantityMenu() {
    let quantityMenu = new Menu(3, 2, 2.5, middleY);
    quantityMenu.class = "submenu";
    quantityMenu.parent = undefined;
    quantityMenu.currentQuantity = 1;
    quantityMenu.totalItems = undefined;
    quantityMenu.confirmed = false;
    quantityMenu.start = function(quantityNumberParam, parentParam) {
        quantityMenu.confirmed = false;
        quantityMenu.currentQuantity = quantityNumberParam;
        quantityMenu.totalItems = quantityNumberParam;
        quantityMenu.parent = parentParam;
        quantityMenu.showSelectionArrow();
        quantityMenu.fullReset();
        quantityMenu.writeLineInstant("x " + quantityMenu.currentQuantity);
		textBox.startDialog("How many?", true, function() {
			currentState = states.INSUBMENU;
			currentMenu = quantityMenu;
			quantityMenu.show();
		});
	};
	quantityMenu.stop = function() {
		quantityMenu.hide();
        textBox.clear();
    };
    quantityMenu.selectPrevious = function() {
        if (quantityMenu.currentQuantity + 1 <= quantityMenu.totalItems) {
            quantityMenu.currentQuantity = quantityMenu.currentQuantity + 1;
        }
        quantityMenu.clear();
        quantityMenu.writeLineInstant("x " + quantityMenu.currentQuantity);
	};
	quantityMenu.selectNext = function() {
            if (quantityMenu.currentQuantity - 1 > 0) {
                quantityMenu.currentQuantity = quantityMenu.currentQuantity - 1;
            }
            quantityMenu.clear();
            quantityMenu.writeLineInstant("x " + quantityMenu.currentQuantity);
    };
    quantityMenu.showSelectionArrow = function() {

    };
    quantityMenu.pressedA = function () {
        quantityMenu.confirmed = true;
		if (quantityMenu.options[quantityMenu.currentOption].functionToRun != null & quantityMenu.options[quantityMenu.currentOption].functionToRun != undefined) {
			quantityMenu.options[quantityMenu.currentOption].functionToRun();
        }
    };
    quantityMenu.pressedB = function () {
        quantityMenu.confirmed = false;
		if (quantityMenu.options[quantityMenu.currentOption].functionToRun != null & quantityMenu.options[quantityMenu.currentOption].functionToRun != undefined) {
			quantityMenu.options[quantityMenu.currentOption].functionToRun();
        }
	};
	quantityMenu.bCanvas.parentElement.removeChild(quantityMenu.bCanvas);
	quantityMenu.tCanvas.parentElement.removeChild(quantityMenu.tCanvas);
    document.getElementById('frontmenu').appendChild(quantityMenu.bCanvas);
    document.getElementById('frontmenu').appendChild(quantityMenu.tCanvas);
    return quantityMenu;
}