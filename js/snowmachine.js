/* Snowmachine v.1.0
 * 	
 * Author: Lasse Löytynoja
 * Date: 20.3.2013
 * 
 * Purpose of this application was mainly to learn few things on JavaScript: 
 * creating a app that uses a namespace pattern and animation on the HTML 5 
 * canvas component using requestAnimationFrame. 
*/

/* namespace: if object ns exists, use it, otherwise create new empty object */
var ns = ns || {};

ns.fps = 40;
ns.now;
ns.then = Date.now();
ns.interval = 1000 / ns.fps;
ns.delta;
ns.flakes = [];

/* for browser support */
(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

ns.main = function main() {

	/* get the elements */
	ns.canvas = document.getElementById("ns-canvas");		
	ns.counter = document.getElementById("flake-counter");
	ns.slider = document.getElementById("flake-slider");
	ns.ctx = ns.canvas.getContext("2d");

	/* canvas size must be set as attributes... */
	var canvasWidth = window.innerWidth - 0.04 * window.innerWidth;
	var canvasHeight = window.innerHeight - 0.1 * window.innerHeight;
	ns.canvas.setAttribute('width', canvasWidth);
	ns.canvas.setAttribute('height', canvasHeight);	
	/* ...and css attributes via style properties */
	ns.canvas.style.width = canvasWidth + "px";
	ns.canvas.style.height = canvasHeight + "px";
	
	/* init properties */
	ns.props = new ns.properties(4, 2, 1, 10);
	ns.drawControls();
	ns.createFlakes();

	/* start animation */
	ns.draw();
	}

ns.drawControls = function () {
	$("#slider").slider();
	$("#slider").slider({ step: 1 });
	$("#slider").slider( "option", "min", 1 );
	$("#slider").slider( "option", "max", 10 );
	$("#slider").slider( "option", "value", 1 );

	$("#slider").slider({
		change: function( event, ui ) {}
	});
	$("#slider" ).on( "slidechange", function(event, slider){ ns.props.setFlakesPerRound($( "#slider" ).slider( "value" )); });
}	

ns.flake = function (x, y, velocity){

	this.x = x;
	this.y = y;
	this.velocity = velocity;
		
	this.move = function() {
		this.y = this.y + this.velocity;
		}
	this.getY = function() {
		return this.y;
	};
	this.getX = function() {
		return this.x;
	};
}

ns.properties = function (maxVelocity, minVelocity, flakesPerRound, minRate) {

	var counter = 0;
	this.maxVelocity = maxVelocity;
	this.minVelocity = minVelocity;
	this.flakesPerRound = flakesPerRound;
	this.minRate = minRate;
	
	/* counter */
	this.increaseCounter = function () {
		counter++;
		if (counter > 1000) {
			counter = 0;
		}
	}
	this.getCounterValue = function () {
		return counter;
	}
	
	/* flakes per addition */
	this.setFlakesPerRound = function (flakeAmount) {
		ns.slider.innerHTML = $( "#slider" ).slider( "value" );
		//alert("vaihto");
		this.flakesPerRound = flakeAmount;
	}
	this.getFlakesPerRound = function () {
		return this.flakesPerRound;
	}
	
	/* minimum rate */
	this.setMinRate = function (rate) {
		minRate = rate;
	}
	this.getMinRate = function () {
		return minRate;
	}
	
	/* velocity */
	this.setMaxVelocity = function (velocity) {
		maxVelocity = velocity;
	}
	this.getMaxVelocity = function () {
		return maxVelocity;
	}
	this.setMinVelocity = function (velocity) {
		minVelocity = velocity;
	}
	this.getMinVelocity = function () {
		return minVelocity;
}
	}

ns.updateFlakeCounter = function () {
	ns.counter.innerHTML = ns.flakes.length;
}

/* remove flakes which have passed the bottom of canvas */
ns.removeFlakes = function () {

	var newFlakeArr = []

	for (var i = 0; i < ns.flakes.length; i++) {
		if (ns.flakes[i].getY() < ns.canvas.height) {
			newFlakeArr.push(ns.flakes[i]);
		}
	}	
	ns.flakes = newFlakeArr;
}
/* create bunch of flakes per call */
ns.createFlakes = function () {
	for (var i = 0; i < ns.props.getFlakesPerRound(); i++) {
		var velocity = Math.random() * ns.props.getMaxVelocity();
		ns.flakes.push(new ns.flake(
									Math.random() * ns.canvas.width, 
									-2, 
									(velocity > ns.props.getMinVelocity()) ? velocity : velocity + ns.props.getMinVelocity()));
	}
}

/*
 * Actions:
 * - updates flake objects (movement)
 * - creates new flakes
 * - removes flakes that passed bottom of the canvas
 * - updates flake counter
 * - does the actual drawing to canvas. 
 * Frame rate control implementation taken from here:
 * http://codetheory.in/controlling-the-frame-rate-with-requestanimationframe/
 */
ns.draw = function () {

    ns.now = Date.now();
    ns.delta = ns.now - ns.then;
     
    if (ns.delta > ns.interval) {
        then = ns.now - (ns.delta % ns.interval);
		ns.removeFlakes();
		ns.createFlakes();
		ns.updateFlakeCounter();
		ns.ctx.clearRect(0, 0, ns.canvas.width, ns.canvas.height);
		for (var i = 0; i < ns.flakes.length; i++) {
			ns.flakes[i].move();
			ns.ctx.beginPath();
			ns.ctx.arc(ns.flakes[i].getX(), ns.flakes[i].getY(), 4, 0, 2 * Math.PI, false);
			ns.ctx.fillStyle = 'yellow';
			ns.ctx.fill();
		}
	}
	window.requestAnimationFrame(ns.draw);			
}
