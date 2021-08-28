'use strict';
//Enable strict mode

function MenuOption(parentParam) {
	let menuoption = {
		parent: parentParam,
		displayText: "Needs a string Ryan...",
		textBuffer: "",
		functionToRun: undefined,
		count: 1,
		isItem: false,
		load: function(displayTextParam, functionToRunParam) {
			console.log("loading...");
			this.displayText = displayTextParam;
			this.parent = parentParam;
			console.log(this.parent);
			var tempDisplayText;
			if (this.isItem) {
				tempDisplayText = displayTextParam + " x " + this.count;
			} else {
				tempDisplayText = displayTextParam;
			}
			this.functionToRun = functionToRunParam;
			this.parent.writeLineInstant(tempDisplayText);
		}
		/*reload: function() {
			var tempCountForSomeReason = this.count;
			console.log("Count: " + this.count);
			var tempDisplayText;
			if (this.isItem) {
				tempDisplayText = this.displayText + " x " + tempCountForSomeReason;
			} else {
				tempDisplayText = this.displayText;
			}
			this.parent.writeLineInstant(tempDisplayText);
		}*/
	};
	return menuoption;
}