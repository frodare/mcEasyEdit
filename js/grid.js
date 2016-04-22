var canvas = document.getElementById("grid"), 
	context = canvas.getContext("2d"),
	w = 0,
	h = 0;

function setSize(wIn, hIn) {
	w = wIn;
	h = hIn; 
	canvas.width = w;
	canvas.height = h;
	drawGrid();
}

function drawGrid() {

	for (var x = 0.5; x < 800; x += 10) { 
		context.moveTo(x, 0); 
		context.lineTo(x, 500); 
	}

	for (var y = 0.5; y < 500; y += 10) { 
		context.moveTo(0, y); 
		context.lineTo(800, y); 
	}

	context.strokeStyle = "#eee";
	context.stroke();
}

module.exports = {
	canvas: canvas,
	setSize: setSize
};