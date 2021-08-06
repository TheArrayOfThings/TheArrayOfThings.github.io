'use strict';
//Enable strict mode

function iObject(startingXParam, startingYParam, functionToRunParam) {
	let iobject = new cObject(startingXParam, startingYParam);
	iobject.entityClass = "interactableobject";
	iobject.functionToRun = functionToRunParam;
	interactableTiles.push(iobject);
	return iobject;
}