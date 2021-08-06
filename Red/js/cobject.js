'use strict';
//Enable strict mode

function cObject(startingXParam, startingYParam) {
	let cobject = new Object(startingXParam, startingYParam);
	cobject.entityClass = "collisionobject";
	collidables.push(cobject);
	return cobject;
}