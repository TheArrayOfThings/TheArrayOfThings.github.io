function Entity() {
	//'entity' here is an object. 
	//Other "classes" can extend this object.
	var entity = {
		//Example of inheritable property
		aiDriven: false,
		//Example of inheritable function
		moveStep: function() {
			//Functionailty to move the entity
		},
	};
	//'allEntities' is useful for looping through all the entities
	//The gamestate makes use of this to detect collisions, remove all the entities on reset etc
	allEntities.push(entity);
	return entity;
}

function Snake(snakeNameParam) {
	//Extend the Entity base object
	var snake = new Entity();
	//Example of setting a new property
	snake.snakeName = snakeNameParam;
	//Example of setting a  new function
	snake.move = function() {
		//As 'Snake' inherited from 'Entity', can access the properties and functions of 'Entity'
		if (snake.aiDriven) {
			snake.moveStep();
		}
	};
	return snake;
}

//New 'Snake' with all the functions and properties of Entity and Snake "classes"
let playerSnake = new Snake("Ryan");