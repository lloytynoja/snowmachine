/* Snowmachine */

var ns = {};

ns.main = function main() {
	ns.canvas = document.getElementById("ns-canvas");			
	ns.ctx = ns.canvas.getContext("2d");
	
	ns.f = new ns.flake(100, -2, 5);	
	//ns.draw(ns.f);		
	setInterval(function(){ ns.draw(ns.f); },100);
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


ns.draw = function draw(f) {

	f.move();
	console.log(f.getY());
	ns.ctx.clearRect(0, 0, ns.canvas.width, ns.canvas.height);
	ns.ctx.beginPath();
	ns.ctx.lineWidth="3";
	ns.ctx.strokeStyle="white";
	ns.ctx.moveTo(10,f.getY());
	ns.ctx.lineTo(13,f.getY());
	ns.ctx.stroke();				
}