'use strict';
//Enable strict mode

function sObject(startingXParam, startingYParam, functionToRunParam, runOnceParam) {
	let sobject = new BaseObject(startingXParam, startingYParam);
	sobject.entityClass = "specialobject";
	if (typeof sobject.visibleDiv != "undefined") {
		sobject.visibleDiv.style.outline = "2px solid green";
	}
	sobject.functionToRun = functionToRunParam;
   	sobject.runOnce = runOnceParam;
	specialTiles.push(sobject);
	return sobject;
}