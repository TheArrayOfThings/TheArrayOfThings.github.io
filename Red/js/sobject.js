'use strict';
//Enable strict mode

function sObject(startingXParam, startingYParam, functionToRunParam, runOnceParam) {
	let sobject = new BaseObject(startingXParam, startingYParam);
	sobject.entityClass = "specialobject";
	sobject.functionToRun = functionToRunParam;
   	sobject.runOnce = runOnceParam;
	sobject.hasRun = false;
	specialTiles.push(sobject);
	return sobject;
}