/* global upscaleImagerator */
/* global ok */
/* global test */
/* global throws */
/* global module */
/* global equal */
/* global expect */
/* global sinon */
module( "Basic Tests", {
	setup: function() {

		window.innerWidth = 1000;
		window.innerHeight = 900;

		// prepare something for all following tests
		window.xhr = sinon.useFakeXMLHttpRequest();
		window.requests = [];
		window.xhr.onCreate = function (xhr) {
			window.requests.push(xhr);
		};	
	},
	teardown: function() {
	// clean up after each test
		window.xhr.restore();
	}
}); 

// Test Cases
 
test("Basic running", function() {
	var up = new upscaleImagerator(".image");
	ok(up, "up variable created");

});
 
test("2x threshold must be greater than 0", function() {

	throws(function(){
	
	new upscaleImagerator(".image", 
					{
						threshold2x: 0,
						threshold4x: 1400,
						ratio: 4/3,
						suffix2x:"@2x",
						suffix4x:"@4x"		
					});

	}, /threshold2x/, "rasised error contains the word threshold2x" );

});

test("suffix2x must be a non-empty string", function() {

	throws(function(){

	new upscaleImagerator(".image", { suffix2x:"" });
	}, /suffix/, "rasised error contains the word suffix2x" );

});

test("suffix4x must be non-empty string", function() {

	throws(function(){

		new upscaleImagerator(".image", { suffix4x:"" });

	}, /suffix4x/, "rasised error contains the word threshold2x" );

});
 
 
 test("Images should use @2x size", function() {
	expect(3);

	var up = new upscaleImagerator(".image");
	up.upscaleImages();
	
	window.requests[0].respond(200);
	window.requests[1].respond(200);
	window.requests[2].respond(200);	
	
	equal($("#one").attr("src"), "images/one_@2x.jpg", "@2x image is loaded");
	equal($("#two").attr("src"), "images/two_@2x.jpg", "@2x image is loaded");
	equal($("#three").attr("src"), "images/three_@2x.jpg", "@2x image is loaded");		

 });
 
 
 test("Images should use @4x size", function() {
	expect(3);

	window.innerWidth = 2400;
	window.innerHeight = 2100;

	var up = new upscaleImagerator(".image");
	up.upscaleImages();
	
	window.requests[0].respond(200);
	window.requests[1].respond(200);
	window.requests[2].respond(200);			
	
	equal($("#one").attr("src"), "images/one_@4x.jpg", "@4x image is loaded");
	equal($("#two").attr("src"), "images/two_@4x.jpg", "@4x image is loaded");
	equal($("#three").attr("src"), "images/three_@4x.jpg", "@4x image is loaded");		

 });
 