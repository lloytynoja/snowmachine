/* Snowmachine */

var ns = {};
var fps = 40;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;

ns.flakes = [];

ns.main = function main() {
	ns.canvas = document.getElementById("ns-canvas");		
	ns.canvas.setAttribute('width', 800);
	ns.canvas.setAttribute('height', '500');	
	ns.ctx = ns.canvas.getContext("2d");
	ns.counter = document.getElementById("flake-counter");
	
	/* init properties */
	ns.props = new ns.properties(4, 2, 1, 10);
	ns.createFlakes(ns.props);

	//console.log(ns.flakes);
	/* start animation */
	ns.draw();
	//window.requestAnimationFrame(ns.draw(ns.flakes, ns.props));
	//ns.draw(ns.flakes, ns.props);
	}

ns.flake = function (x, y, velocity){

	this.x = x;
	this.y = y;
	this.velocity = velocity;
		
	this.move = function() {
		//console.log("move() called");
		this.y = this.y + this.velocity;
		//console.log("move() called " + this.y);
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
		flakesPerRound = flakeAmount;
	}
	this.getFlakesPerRound = function () {
		return flakesPerRound;
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
ns.removeFlakes = function () {

	var newFlakeArr = []

	for (var i = 0; i < ns.flakes.length; i++) {
		if (ns.flakes[i].getY() < ns.canvas.height) {
			newFlakeArr.push(ns.flakes[i]);
		}
	}	
	ns.flakes = newFlakeArr;
}

ns.createFlakes = function (props) {
	for (var i = 0; i < props.getFlakesPerRound(); i++) {
		var velocity = Math.random() * props.getMaxVelocity();
		ns.flakes.push(new ns.flake(
									Math.random() * ns.canvas.width, 
									-2, 
									(velocity > props.getMinVelocity()) ? velocity : velocity + props.getMinVelocity()));
	}
}

ns.draw = function () {

    now = Date.now();
    delta = now - then;
     
    if (delta > interval) {
		console.log("hep");
        then = now - (delta % interval);
		ns.removeFlakes();
		ns.createFlakes(ns.props);
		ns.updateFlakeCounter();
		ns.ctx.clearRect(0, 0, ns.canvas.width, ns.canvas.height);
		for (var i = 0; i < ns.flakes.length; i++) {
			ns.flakes[i].move();
			ns.ctx.beginPath();
			ns.ctx.arc(ns.flakes[i].getX(), ns.flakes[i].getY(), 4, 0, 2 * Math.PI, false);
			ns.ctx.fillStyle = 'white';
			ns.ctx.fill();
		}
	}
	window.requestAnimationFrame(ns.draw);			
}