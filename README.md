progressive-retina-js
=====================

Library to automatically load larger images as the screen demands


Options
-------
	var defaults = {
		threshold2x: 800,
		threshold4x: 1400,
		ratio: 4/3,
		suffix2x:"@2x",
		suffix4x:"@4x",
		load: true		
	};


threshold2x: number, default: `800`
------
Sets the threshold to go find the 2x size images. 


threshold4x: number, default: `1400`
------
Sets the threshold to go find the 4x size images. If 0, the library won't look for 4x versions

ratio: number, default `4/3`
------
While calculating whether to grab larger images, we need the ratio to detemine whether we have the actual screen space for a large image. For example, if the browser is 2000px wide, but only 100px tall, we don't need to load the large image, since we can't display it at 2000px wide without messing with the aspect ratio. 4/3 is a good default for most photography, might need to be adjusted if your image set is primarily something else.

suffix2x: string, default `"_@2x"`
------
When looking for large image, takes the src of the img tag, tacks this suffix between the end of the filename and the extension, then goes and looks for it next to the original image. 

suffix4x: string, default `"_@4x"`
------
Same as above, but for the larger images

load: boolean, default `true`
------
Whether or not to add a window load event listener to call the upscale function


Usage
------

	var upscale = new upscaleImagerator(options);
	
To call upscale on your own

	upscale.upscaleImages();
	
