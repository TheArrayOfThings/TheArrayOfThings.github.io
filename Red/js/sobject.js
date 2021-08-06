'use strict';
//Enable strict mode

function sObject(startingXParam, startingYParam, functionToRunParam, runOnceParam) {
	let sobject = new Object(startingXParam, startingYParam);
	sobject.entityClass = "specialobject";
	sobject.functionToRun = functionToRunParam;
   	sobject.runOnce = runOnceParam;
	specialTiles.push(sobject);
	return sobject;
}