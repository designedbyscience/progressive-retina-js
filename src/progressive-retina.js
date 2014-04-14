/* exported upscaleImagerator */
var upscaleImagerator = function(imageSelector, options){
	var self = this;	
	
	/*
	*
	*
	*
	*
	*
	*/

	
	var defaults = {
		threshold2x: 800,
		threshold4x: 1400,
		ratio: 4/3,
		suffix2x:"@2x",
		suffix4x:"@4x",
		load: true		
	};

	// Merge defaults and options
	for (var attrname in options){ 
		defaults[attrname] = options[attrname]; 
	}
	
	
	// Some simple sanity checks for the options
	if(defaults.threshold2x <= 0){
		throw new Error("threshold2x must be greater than 0.");
	}
	
	if(defaults.suffix2x === null || defaults.suffix2x.toString().length === 0){
		throw new Error("suffix2x must be defined and be a non-empty string");
	}
	
	if(defaults.suffix4x === null || defaults.suffix4x.toString().length === 0){
		throw new Error("suffix4x must be defined");
	}

	
	
	this.options = defaults;
	
	// Using XHR, make a request for an image. 
	// We want to check to see if the file exists before 
	//The request is considering success once we get a 200 from the server
	var checkForImage = function(imageElement, url){
	
		var checkFileRequest = new XMLHttpRequest();
	
		checkFileRequest.addEventListener("readystatechange", function(){
		
			if(checkFileRequest.readyState === 2 && checkFileRequest.status === 200){
				imageElement.setAttribute("src", url);
			}
		});
	
		checkFileRequest.open("get", url, true);
		checkFileRequest.send();
	
	};
	
	
	var changeSrc = function(img, size){
		var smallSrc = img.getAttribute("src");
		var newSrc = smallSrc.replace(/\.(jpg|jpeg|png)/, "_" + size + ".$1");

		checkForImage(img, newSrc);		
	};

	this.upscaleImages = function(){
	

			var images;
			var w = window.innerWidth;
			var h = window.innerHeight;

			var possibleWidth;
			// Portrait or Landscape viewing
			// Calculating the possible width of the image in the window
			// Since we are constraining images to a fixed ratio (default is 4/3)
			// We're checking to see if the browser height will restrict the possible width of the image
			if(w > h){
				possibleWidth = h*this.options.ratio;
			
			}else{
				possibleWidth = w;
			}
		
			var windowCheck = window.devicePixelRatio * possibleWidth;


		
			if( this.options.threshold4x !== 0 && windowCheck > this.options.threshold4x){
		
				//load really large images
				
				images = document.querySelectorAll(imageSelector);

				Array.prototype.forEach.call(images, function(img){
					
					changeSrc(img, self.options.suffix4x);					
					
				});
		
			}else if(windowCheck > this.options.threshold2x){
				// load large images
								
				images = document.querySelectorAll(imageSelector);				

				Array.prototype.forEach.call(images, function(img){

					changeSrc(img, self.options.suffix2x);
					
				});		
			}
	};
	
	
	
	if(this.options.load){
		window.addEventListener("load", this.upscaleImages);		
	}
};