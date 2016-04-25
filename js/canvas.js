/*
 * TODO:
 * blur layer to show transparency
 * color history
 * color editor
 * store image states for undo redo
 * convert to react components
 * build multi layer support (2 images for armor)
 * build front side top back preview
 * current mode indicator (cloning, clear clone, pick color set clone, etc)
 * 
 */

var canvas = document.getElementById("editor"), 
	context = canvas.getContext("2d"),
	exportCanvas = document.getElementById("export"),
	grid = require('./grid.js'),
	outlines = require('./outlines.js'),
	copy = require('./copy.js'),
	scale = 10,
	color = null,
	clone = null,
	cloneOffset = [0,0],
	paintStart = null,
	currentColor = document.getElementById("current-color"),
	preview = document.getElementById("preview"),
	$ = require('jquery');

document.oncontextmenu = function(ev){
	console.log(ev.srcElement.tagName);
	if(ev.srcElement.tagName === 'IMG'){
		return;
	}
	ev.preventDefault();
};

var flag = 0;
var down = false;

document.addEventListener('drop', function(ev) {
	ev.preventDefault();
	console.log('drop', ev);
	getDropedFiles(ev);
});

function getDropedFiles(evt) {
	var files = evt.dataTransfer.files;
	var img = new Image();
	if (files.length > 0) {
		var file = files[0];
		if (typeof FileReader !== "undefined" && file.type.indexOf("image") != -1) {
			var reader = new FileReader();
			// Note: addEventListener doesn't work in Google Chrome for this event
			reader.onload = function (evt) {
				img.src = evt.target.result;
				setImage(img);
			};
			reader.readAsDataURL(file);

			console.log('read file');
		}
	}
}

document.addEventListener('dragover', function(ev) {
	ev.preventDefault();
});

outlines.canvas.addEventListener("mousedown", function(ev){
	flag = 0;
	cloneOffset = [0,0];
	copy.setCloneOffset(cloneOffset[0], cloneOffset[1]);
	paintStart = [ev.layerX, ev.layerY];
	down = true;
}, false);

outlines.canvas.addEventListener("mousemove", function(ev){
	if(!down){
		return;
	}

	if(flag > 3){
		clickAction(ev);
	}

	flag++;
}, false);

outlines.canvas.addEventListener("mouseup", function(ev){
	down = false;
	if(flag < 3){
	   clickAction(ev);
	}
	cloneOffset = [0,0];
	copy.setCloneOffset(cloneOffset[0], cloneOffset[1]);
}, false);



function saveToLocalStorage(img) {
	localStorage.setItem('canvas', img);
}

function restoreFromLocalStorage() {
	var imgSrc = localStorage.getItem('canvas');
	if(!imgSrc){
		return false;
	}
	var localStorageImage = new Image();
	localStorageImage.addEventListener("load", function (event) {
		//context.drawImage(localStorageImage, 0, 0);
		setImage(localStorageImage);
	}, false);
	localStorageImage.src = imgSrc;
	return true;
}

function init() {
	if(!restoreFromLocalStorage()){
		loadImage('../img/heavyDiamondArmor_layer_1.png');
	}
}

var previewUpdateTimer = null;

function updatePreview () {
	if(previewUpdateTimer){
		clearTimeout(previewUpdateTimer);
	}

	previewUpdateTimer = setTimeout(function() {

		

		exportCanvas.width = canvas.width / scale;
		exportCanvas.height = canvas.height / scale;
		exportCanvas.getContext('2d').drawImage(canvas, 0, 0, exportCanvas.width, exportCanvas.height);
		preview.src = exportCanvas.toDataURL('image/png');

		saveToLocalStorage(preview.src);

		previewUpdateTimer = null;
	}, 500);
}

function updateCloneOffset(x, y) {
	var offsetX = snap(x) - snap(paintStart[0]);
	var offsetY = snap(y) - snap(paintStart[1]);

	cloneOffset = [offsetX, offsetY];
	copy.setCloneOffset(cloneOffset[0], cloneOffset[1]);
}

function clickAction(ev) {
	var x = ev.layerX;
	var y = ev.layerY;
	var left = ev.button === 0;

	if(clone){
		updateCloneOffset(x, y);
	}

	if(ev.shiftKey){
		if(left){
			erase(x, y);
		} else {
			setClone(x, y);
		}
	}else{
		if(left){
			paintColor(x, y);
		} else {
			setClone(null);
			pixcol(x, y);
		}
	}
}

function getClone() {
	return clone;
}

function setClone(x, y) {
	copy.setClone(x, y);
	clone = copy.getClone();
}

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
    copy.setSize(w, h);
    outlines.setModel('skin', scale);
    
    //context.scale(scale, scale);
    context.imageSmoothingEnabled = false;
    context.drawImage(img, 0, 0, w, h);
    updatePreview();
}

function paintColor(x, y) {
	erase(x, y);
	if(clone){
		var colorBackup = context.fillStyle;
		context.fillStyle = getColorFromCanvas(clone[0] + cloneOffset[0], clone[1] + cloneOffset[1]);
		context.fillRect(snap(x), snap(y), scale, scale);
		context.fillStyle = colorBackup;
	}else{
		context.fillRect(snap(x), snap(y), scale, scale);
	}
	updatePreview();
}

function snap(x) {
	return x - (x % scale);
}

function erase(x, y) {
	context.clearRect(snap(x), snap(y), scale, scale);
	updatePreview();
}

function pixcol(x, y) {
	//var pixeldata = context.getImageData(x, y, 1, 1);
	//var col = pixeldata.data;
	//color = pixeldata;

	currentColor.style.background = context.fillStyle = getColorFromCanvas(x, y);
}

function getColorFromCanvas(x, y) {
	var sampleX = snap(x) + scale/2,
		sampleY = snap(y) + scale/2;

	var pixeldata = context.getImageData(snap(x) + scale/2, snap(y) + scale/2, 1, 1);
	var aColor = pixeldata.data;
	
	var color = 'rgba(' + aColor[0] + ', ' + aColor[1] + ', ' + aColor[2] + ',' + aColor[3] + ')';
	return color;
}

module.exports = {
	canvas: canvas,
	context: context,
	loadImage: loadImage,
	init: init
};