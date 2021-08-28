'use strict';
//Enable strict mode

function iObject(startingXParam, startingYParam, functionToRunParam) {
	let iobject = new cObject(startingXParam, startingYParam);
	iobject.entityClass = "interactableobject";
	if (typeof iobject.visibleDiv != "undefined") {
		iobject.visibleDiv.style.outline = "2px solid blue";
	}
	iobject.functionToRun = functionToRunParam;
	interactableTiles.push(iobject);
	return iobject;
}