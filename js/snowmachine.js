/* Snowmachine */

var ns = {};


ns.flakes = [];

ns.main = function main() {
	ns.canvas = document.getElementById("ns-canvas");			
	ns.ctx = ns.canvas.getContext("2d");
	
	/* init properties */
	ns.props = new ns.properties(10, 10, 10);
	ns.createFlakes(ns.props.getFlakesPerRound());

	/* start animation */
	window.requestAnimationFrame(ns.draw(ns.f, ns.props));
	}

ns.flake = function (x, y, velocity){

	this.x = x;
	this.y = y;
	this.velocity = velocity;
		
	this.move = function() {
		y = y + velocity;
	}
	this.getY = function() {
		return y;
	}
}

ns.properties = function (maxVelocity, flakesPerRound, minRate) {

	var counter = 0;
	this.maxVelocity = maxVelocity;
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
}

ns.removeFlakes = function (flakes) {

	var newFlakeArr = []

	for (var flake : flakes) {
		if (flake.getY < ns.canvas.height) {
			newFlakeArr.push(flake);
		}
	}	
	flakes = newFlakeArr;
}

ns.createFlakes = function (amount) {

	for (var i = 0; i < amount; i++) {
		ns.flakes.push(new ns.flake(Math.random() * ns.canvas.width, -2, Math.random() * ns.maxVelocity));
	}
}

/* luuppaa taulukko ja pirrä sisältö */
ns.draw = function draw(f, props) {
	setTimeout(function() {
		f.move();
		console.log(f.getY());
		ns.ctx.clearRect(0, 0, ns.canvas.width, ns.canvas.height);
		ns.ctx.beginPath();
		ns.ctx.lineWidth="3";
		ns.ctx.strokeStyle="white";
		ns.ctx.moveTo(10,f.getY());
		ns.ctx.lineTo(13,f.getY());
		ns.ctx.stroke();
		window.requestAnimationFrame(ns.draw(f));
	}, 1000 / 25);
}