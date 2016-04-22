var canvas = document.getElementById("outlines"), 
	context = canvas.getContext("2d"),
	w = 0,
	h = 0,
	scale = 1;
	
function setSize(wIn, hIn) {
	w = wIn;
	h = hIn; 
	canvas.width = w;
	canvas.height = h;

}

function setModel(model, scaleIn) {
	scale = scaleIn;

	if(model === 'skin'){
		drawSkinOutlines();
	}
}


/*
 * scaled coord translation 
 */
function c(i) {
	return i * scale;
}

var models = {};

models.skin = [
	{
		label: 'Head Top',
		section: [8,0,8,8]
	},{
		label: 'Head Face',
		section: [8,8,8,8]
	},{
		label: 'Head Right Side',
		section: [0,8,8,8]
	},{
		label: 'Head Right Side',
		section: [0,8,8,8]
	},{
		label: 'Head Left Side',
		section: [16,8,8,8]
	},{
		label: 'Head Bottom',
		section: [16,0,8,8]
	},{
		label: 'Head Back',
		section: [24,8,8,8]
	},{
		label: 'Head2 Top',
		section: [8+32,0,8,8]
	},{
		label: 'Head2 Face',
		section: [8+32,8,8,8]
	},{
		label: 'Head2 Right Side',
		section: [0+32,8,8,8]
	},{
		label: 'Head2 Right Side',
		section: [0+32,8,8,8]
	},{
		label: 'Head2 Left Side',
		section: [16+32,8,8,8]
	},{
		label: 'Head2 Bottom',
		section: [16+32,0,8,8]
	},{
		label: 'Head2 Back',
		section: [24+32,8,8,8]
	},


	


	


	


	{
		label: 'Leg Top',
		section: [4,16,4,4]
	},{
		label: 'Leg Bott',
		section: [8,16,4,4]
	},{
		label: 'Leg Out',
		section: [0,20,4,12]
	},{
		label: 'Leg Front',
		section: [4,20,4,12]
	},{
		label: 'Leg In',
		section: [8,20,4,12]
	},{
		label: 'Leg Back',
		section: [12,20,4,12]
	},



	{
		label: 'Torso Top',
		section: [20,16,8,4]
	},{
		label: 'Torso Bottom',
		section: [28,16,8,4]
	},

	{
		label: 'Torso R',
		section: [16,20,4,12]
	},{
		label: 'Torso Front',
		section: [20,20,8,12]
	},{
		label: 'Torso L',
		section: [28,20,4,12]
	},{
		label: 'Torso Back',
		section: [32,20,8,12]
	},


	{
		label: 'RArm Top',
		section: [44,16,4,4]
	},{
		label: 'RArm Bot',
		section: [48,16,4,4]
	},{
		label: 'RArm Out',
		section: [40,20,4,12]
	},{
		label: 'RArm Frt',
		section: [44,20,4,12]
	},{
		label: 'RArm In',
		section: [48,20,4,12]
	},{
		label: 'RArm Back',
		section: [52,20,4,12]
	},


	{
		label: 'RArm2 Top',
		section: [44,16+16,4,4]
	},{
		label: 'RArm2 Bot',
		section: [48,16+16,4,4]
	},{
		label: 'RArm2 Out',
		section: [40,20+16,4,12]
	},{
		label: 'RArm2 Frt',
		section: [44,20+16,4,12]
	},{
		label: 'RArm2 In',
		section: [48,20+16,4,12]
	},{
		label: 'RArm2 Back',
		section: [52,20+16,4,12]
	},


	{
		label: 'Torso Top',
		section: [20,16+16,8,4]
	},{
		label: 'Torso Bottom',
		section: [28,16+16,8,4]
	},
	{
		label: 'Torso2 R',
		section: [16,20+16,4,12]
	},{
		label: 'Torso2 Front',
		section: [20,20+16,8,12]
	},{
		label: 'Torso2 L',
		section: [28,20+16,4,12]
	},{
		label: 'Torso2 Back',
		section: [32,20+16,8,12]
	},

	{
		label: 'RLeg2 Top',
		section: [4,16+16,4,4]
	},{
		label: 'RLeg2 Bott',
		section: [8,16+16,4,4]
	},{
		label: 'RLeg2 Out',
		section: [0,20+16,4,12]
	},{
		label: 'RLeg2 Front',
		section: [4,20+16,4,12]
	},{
		label: 'RLeg2 In',
		section: [8,20+16,4,12]
	},{
		label: 'RLeg2 Back',
		section: [12,20+16,4,12]
	},


	{
		label: 'LLeg2 Top',
		section: [4,16+32,4,4]
	},{
		label: 'LLeg2 Bott',
		section: [8,16+32,4,4]
	},{
		label: 'LLeg2 Out',
		section: [0,20+32,4,12]
	},{
		label: 'LLeg2 Front',
		section: [4,20+32,4,12]
	},{
		label: 'LLeg2 In',
		section: [8,20+32,4,12]
	},{
		label: 'LLeg2 Back',
		section: [12,20+32,4,12]
	},


	{
		label: 'LLeg Top',
		section: [4+16,16+32,4,4]
	},{
		label: 'LLeg Bott',
		section: [8+16,16+32,4,4]
	},{
		label: 'LLeg Out',
		section: [0+16,20+32,4,12]
	},{
		label: 'LLeg Front',
		section: [4+16,20+32,4,12]
	},{
		label: 'LLeg In',
		section: [8+16,20+32,4,12]
	},{
		label: 'LLeg Back',
		section: [12+16,20+32,4,12]
	},


	{
		label: 'LArm Top',
		section: [36,48,4,4]
	},{
		label: 'LArm Bott',
		section: [40,48,4,4]
	},{
		label: 'LArm Right',
		section: [32,52,4,12]
	},{
		label: 'LArm Frt',
		section: [32+4,52,4,12]
	},{
		label: 'LArm Left',
		section: [32+8,52,4,12]
	},{
		label: 'LArm Back',
		section: [32+12,52,4,12]
	},

	/*
	{
		label: 'LArm2 Top',
		section: [36,48,4,4]
	},{
		label: 'LArm2 Bott',
		section: [40,48,4,4]
	}
	,*/
	{
		label: 'LArm2 Right',
		section: [32+16,52,4,12]
	},{
		label: 'LArm2 Frt',
		section: [32+4+16,52,4,12]
	},{
		label: 'LArm2 Left',
		section: [32+8+16,52,4,12]
	},{
		label: 'LArm2 Back',
		section: [32+12+16,52,4,12]
	},

];


function outline(modelPart) {
	sec = modelPart.section;
	//context.rect(c(sec[0]), c(sec[1]), c(sec[2]), c(sec[3]));

	var x1 = c(sec[0]) + 0.5,
		x2 = c(sec[0] + sec[2]) + 0.5,
		y1 = c(sec[1]) + 0.5,
		y2 = c(sec[1] + sec[3]) + 0.5;

	context.moveTo(x1, y1);
	context.lineTo(x2, y1);

	context.moveTo(x1, y2);
	context.lineTo(x2, y2);

	context.moveTo(x1, y1);
	context.lineTo(x1, y2);

	context.moveTo(x2, y1);
	context.lineTo(x2, y2);

	context.fillText(modelPart.label, c(sec[0] + sec[2]/2), c(sec[1] + sec[3]/2));
}

function drawSkinOutlines() {
	var model = models.skin;

	context.imageSmoothingEnabled = false;
	setSize(c(64), c(64));

	context.textAlign = "center";
	context.font="10px helvetica";
	context.strokeStyle = '#000000';

	var i = 0, sec;
	for(i = 0; i < model.length; i++) {
		outline(model[i]);
	}

	context.strokeStyle = "black";
	context.imageSmoothingEnabled = false;
	context.stroke();
}

module.exports = {
	canvas: canvas,
	setModel: setModel
};