'use strict';
//Enable strict mode

function MenuTextbox() {
	let menutextbox = new TextBox(startingXParam, startingYParam);
	menutextbox.postAction = function() {
		
	};
	menutextbox.delay = 0;
	return menutextbox;
}