require('./index.css');
var $ = require('jquery');
require('jquery-ui');

var load = function () { 
	$(function () {
		loadFunc();
	});
};

load();



function loadFunc() {
	

	//get canvas and context 
	var editor = document.getElementById("editor"), 
		context = editor.getContext("2d"),       
		image = $("<img/>", { 
			src: "img/heavyDiamondArmor_layer_1.png", 
			load: function() { 
				context.imageSmoothingEnabled= false;
				context.drawImage(this, 0, 0, 500, 500 * this.height / this.width);
				context.imageSmoothingEnabled= false;
			}
		}),
		tools = {}; 

	tools.save = function() { 
		var saveDialog = $("<div>").appendTo("body");                      
		$("<img/>", { 
			src: editor.toDataURL() 
		}).appendTo(saveDialog);                             
		saveDialog.dialog({ 
			resizable: false, 
			modal: true, 
			title: "Right-click and choose 'Save Image As'", 
			width: editor.width + 35 
		}); 
	};

	tools.resize = function() { 
		//create resizable over canvas 
		var coords = $(editor).offset(), 
			resizer = $("<div>", { 
				id: "resizer"
			}).css({ 
				position: "absolute", 
				left: coords.left, 
				top: coords.top, 
				width: editor.width - 1, 
				height: editor.height - 1 
			}).appendTo("body"); 
	  
			var resizeWidth = null, 
				resizeHeight = null, 
				xpos = editor.offsetLeft + 5, 
				ypos = editor.offsetTop + 5; 
				  
			resizer.resizable({ 
				aspectRatio: true, 
				maxWidth: editor.width - 1, 
				maxHeight: editor.height - 1, 
				  
				resize: function(e, ui) { 
					resizeWidth = Math.round(ui.size.width); 
					resizeHeight = Math.round(ui.size.height); 
				  
					//tooltip to show new size 
					var string = "New width: " + resizeWidth + "px,<br />new height: " + resizeHeight + "px"; 
					  
					if ($("#tip").length) { 
						$("#tip").html(string); 
					} else { 
						var tip = $("<p></p>", { 
							id: "tip", 
							html: string 
						}).css({ 
							left: xpos, 
							top: ypos 
						}).appendTo("body"); 
					} 
				}, 
				stop: function(e, ui) { 
				  
					//confirm resize, then do it 
					var confirmDialog = $("<div></div>", { 
						html: "Image will be resized to " + resizeWidth + "px wide, and " + resizeHeight + "px high.<br />Proceed?"
					});              
									  
					//init confirm dialog 
					confirmDialog.dialog({ 
						resizable: false, 
						modal: true, 
						title: "Confirm resize?", 
						buttons: { 
							Cancel: function() { 
							  
								//tidy up 
								$(this).dialog("close"); 
								resizer.remove(); 
								$("#tip").remove(); 
							}, 
						Yes: function() { 
						  
							//tidy up 
							$(this).dialog("close"); 
							resizer.remove(); 
							$("#tip").remove();                          
							  
							$("<img/>", { 
								src: editor.toDataURL(), 
								load: function() {                           
	  
									//remove old image 
									context.clearRect(0, 0, editor.width, editor.height); 
									  
									//resize canvas 
									editor.width = resizeWidth; 
									editor.height = resizeHeight; 
									  
									//redraw saved image 
									context.drawImage(this, 0, 0, resizeWidth, resizeHeight);    
								} 
							}); 
						} 
					} 
				}); 
			} 
		});
	};

	context.imageSmoothingEnabled= false;

	$("#toolbar").children().click(function(e) { 
		e.preventDefault();          
		//call the relevant function 
		tools[this.id].call(this); 
	});

}


