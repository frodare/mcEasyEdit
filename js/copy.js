var canvas = document.getElementById("copy"), 
	context = canvas.getContext("2d"),
	w = 0,
	h = 0,
	clone = null;
	cloneOffset = [0,0];
	scale = 1;
	
function setSize(wIn, hIn) {
	w = wIn;
	h = hIn; 
	canvas.width = w;
	canvas.height = h;
}

function setClone(x, y) {
	cloneOffset = [0,0];
	if(!x && x !== 0){
		clone = null;
	}else{
		clone = [x, y];
	}
	update();
}

function getClone() {
	return clone;
}

function setCloneOffset(x, y) {
	cloneOffset = [x, y];
	update();
}

function update() {
	clear();
	drawCloneCrosshair();
}


function clear() {
	context.clearRect(0, 0, w, h);
}

function drawCloneCrosshair() {
	if(!clone){
		return;
	}

	context.beginPath(); 

	var x = clone[0] + cloneOffset[0] - (clone[0] % 10) + 0.5,
		y = clone[1] + cloneOffset[1] - (clone[1] % 10) + 0.5;

	var x1 = x,
		x2 = x + 10,
		y1 = y,
		y2 = y + 10;

	context.moveTo(x1, y1);
	context.lineTo(x2, y1);

	context.moveTo(x1, y2);
	context.lineTo(x2, y2);

	context.moveTo(x1, y1);
	context.lineTo(x1, y2);

	context.moveTo(x2, y1);
	context.lineTo(x2, y2);

	context.strokeStyle = "red";
	context.imageSmoothingEnabled = false;
	context.stroke();

}

module.exports = {
	canvas: canvas,
	setSize: setSize,
	setClone: setClone,
	getClone: getClone,
	clear: clear,
	setCloneOffset: setCloneOffset
};