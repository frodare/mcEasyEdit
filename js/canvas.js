var canvas = document.getElementById("editor"), 
	context = canvas.getContext("2d"),
	grid = require('./grid.js'),
	outlines = require('./outlines.js'),
	scale = 10,
	color = null,
	currentColor = document.getElementById("current-color"),
	$ = require('jquery');

document.oncontextmenu = function(ev){
	ev.preventDefault();
};


//grid.canvas.addEventListener('mousedown', mousedownHandler, false);
outlines.canvas.addEventListener('mousedown', mousedownHandler, false);


function loadImage(src) { 
	var dfd = $.Deferred();
	var image = $("<img/>", { 
		src: src, 
		load: function() {
			setImage(this);
			dfd.resolve(this);
		}
	});
	return dfd;
}

function setImage(img) {
    var w = img.width * scale;
    var h = img.height * scale;

    canvas.width = w;
    canvas.height = h;

    grid.setSize(w, h);
    outlines.setModel('skin', scale);
    
    context.scale(scale, scale);
    context.imageSmoothingEnabled = false;
    context.drawImage(img, 0, 0);
}


function mousedownHandler(ev) { 
	var x = ev.layerX;
	var y = ev.layerY;
	if(ev.button === 0){
		paintColor(x, y);
	}
	if(ev.button === 2){
		pixcol(x, y);
	}
	ev.preventDefault();
	return false;
}

function paintColor(x, y) { 
	context.fillRect(coordAdjust(x), coordAdjust(y), 1, 1);
}

function coordAdjust(cssCoord) { 
	return (cssCoord /scale) - (cssCoord % scale)/scale;
}

function pixcol(x, y) {
	var pixeldata = context.getImageData(x, y, 1, 1);
	var col = pixeldata.data;
	color = pixeldata;

	context.fillStyle = 'rgb(' + col[0] + ', ' + col[1] + ', ' + col[2] + ')';

	currentColor.style.background = 'rgba(' +
	col[0] + ',' + col[1] + ',' +
	col[2] + ',' + col[3] + ')';
}


module.exports = {
	canvas: canvas,
	context: context,
	loadImage: loadImage
};