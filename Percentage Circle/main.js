var canvasElements = document.getElementsByClassName('chart-canvas');
var numberOfPercentsElements = document.getElementsByClassName('number-of-percents');
var percents = [];
var arrayOfChartComponents = [];
var i; 


function ChartComponent(canvas, percent) {
  this.canvas = canvas;
  this.percent = percent;
}

ChartComponent.prototype.circ = Math.PI * 2;
ChartComponent.prototype.quart = Math.PI / 2;

ChartComponent.prototype.animate = function(current) {
	var that = this;
  this.canvas.ctx.clearRect(0, 0, 2 * this.canvas.x, 2 * this.canvas.y);
	this.canvas.ctx.beginPath();
	this.canvas.ctx.arc(this.canvas.x, this.canvas.y, this.canvas.radius, -this.quart, this.circ * current - this.quart, false);
	this.canvas.ctx.stroke();
	this.percent.currentValue += 1;
	this.percent.element.innerText = Math.floor(this.percent.currentValue) + '%'; 
	if (this.percent.currentValue < this.percent.finalValue) {
	  requestAnimationFrame(function() {
	    that.animate(that.percent.currentValue / 100)
	  });
	}	
}


function CanvasComponent(canvasElement) {
  this.ctx = canvasElement.getContext('2d');
  this.ctx.lineWidth = 10;
	this.ctx.strokeStyle = '#6846a8';
	this.ctx.shadowOffsetX = 0;
	this.ctx.shadowOffsetY = 0;
	this.ctx.shadowBlur = 5;
	this.ctx.shadowColor = '#656565';
  
  this.x = canvasElement.width / 2;
  this.y = canvasElement.height / 2;
  this.radius = canvasElement.width / 2 - 10;
}


function PercentComponent(numberOfPercentsElement) {
  this.currentValue = 0;
  this.finalValue = numberOfPercentsElement.dataset.percentages;
  this.element = numberOfPercentsElement;
}


for (i = 0; i < canvasElements.length; i++) {
	var canvasComponent = new CanvasComponent(canvasElements[i]);
	var percentComponent = new PercentComponent(numberOfPercentsElements[i]);
  var chartComponent = new ChartComponent(canvasComponent, percentComponent);
  arrayOfChartComponents.push(chartComponent);
}


arrayOfChartComponents[1].canvas.ctx.strokeStyle = 'rgb(255,93,85)';
arrayOfChartComponents[2].canvas.ctx.strokeStyle = 'rgb(114,187,83)';


arrayOfChartComponents.forEach(function(elem) {
	elem.animate(0);
});
