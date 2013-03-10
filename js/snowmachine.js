/* Snowmachine */

var ns = {};

ns.main = function main() {
	ns.canvas = document.getElementById("ns-canvas");			
	ns.ctx = ns.canvas.getContext("2d");
	
	ns.f = new ns.flake(100, -2, 5);	

	ns.draw(ns.f);		
	setInterval(ns.f.move,500);
}

ns.flake = function (x, y, velocity){
	this.x = x;
	this.y = y;
	this.velocity = velocity;
	
	this.move = function() {
		ns.f.y = ns.f.y + ns.f.velocity;
		console.log(ns.f);
		console.log(this.y);
	}
}


ns.draw = function draw(f) {
	ns.ctx.clearRect(0, 0, ns.canvas.width, ns.canvas.height);
	ns.ctx.beginPath();
	ns.ctx.lineWidth="3";
	ns.ctx.strokeStyle="green"; // Green path
	ns.ctx.moveTo(10,10);
	ns.ctx.lineTo(200,200);
	ns.ctx.stroke();				
}