'use strict';
//Enable strict mode

function Item(nameParam, quantityParam) {
	let item = {
		entityClass: "item",
		name: nameParam,
		quantity: quantityParam
	};
	return item;
}