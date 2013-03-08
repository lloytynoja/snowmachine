/* Snowmachine */

var ns = {};

ns.main = function main() {
	ns.canvas = document.getElementById("ns-canvas");			
	ns.ctx = ns.canvas.getContext("2d");
	ns.draw();
}

ns.draw = function draw() {
	ns.ctx.clearRect(0, 0, ns.canvas.width, ns.canvas.height);
	ns.ctx.beginPath();
	ns.ctx.lineWidth="3";
	ns.ctx.strokeStyle="green"; // Green path
	ns.ctx.moveTo(10,10);
	ns.ctx.lineTo(100,100+1);
	ns.ctx.stroke();			
}