function SnakeSegment(parentSnakeParm) {
	var snakesegment = new Entity();
	snakesegment.parentSnake = parentSnakeParm;
	snakesegment.initialise = function() {
		snakesegment.entityClass = 'snakesegment';
		snakesegment.collisionDiv = document.createElement('div');
		snakesegment.collisionDiv.className += 'snake';
		snakesegment.collisionDiv.className += ' body';
		snakesegment.parentSnake.setSnakeCss(snakesegment.collisionDiv);
		snakesegment.parentSnake.snakeDiv.appendChild(snakesegment.collisionDiv);
		snakesegment.allDivs.push(snakesegment.collisionDiv);
	};
	snakesegment.initialise();
	return snakesegment;
}