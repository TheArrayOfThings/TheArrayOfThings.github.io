'use strict';
//Enable strict mode

function cObject(startingXParam, startingYParam) {
	let cobject = new BaseObject(startingXParam, startingYParam);
	cobject.entityClass = "collisionobject";
	if (typeof cobject.visibleDiv != "undefined") {
		cobject.visibleDiv.style.outline = "2px solid red";
	}
	collidables.push(cobject);
	return cobject;
}