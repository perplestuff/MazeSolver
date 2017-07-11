var maze;
var ctx;

var WIDTH = 500;
var HEIGHT = 500;

tileW = 20;
tileH = 20;

tileRowCount = 25;
tileColumnCount = 25;

var tile = [];
for (c = 0; c < tileColumnCount; c++) {
	tile[c] = [];
	for (r = 0; r < tileRowCount; r++) {
		tile[c][r] = {x: c*(tileW+3), y: r*(tileH+3), state: 'e'}; //'e' is for empty
	}
}
tile[0][0].state = 's';
tile[tileColumnCount-1][tileRowCount-1].state = 'f';

function rect(x,y,w,h,state) {
	if (state == 's') {
		ctx.fillStyle = '#0000FF';
	} else if (state == 'f') {
		ctx.fillStyle = '#FF0000';
	} else if (state == 'e') {
		ctx.fillStyle = '#00FF00';
	} else if (state == 'w') {
		ctx.fillStyle - '#FF00FF';
	} else {
		alert ("error");
	}
	 //red red green green blue blue
	
	ctx.beginPath();
	ctx.rect(x,y,w,h);
	ctx.closePath();
	ctx.fill();
}

function clear () {
	ctx.clearRect(0,0,WIDTH,HEIGHT);
}

function draw() {
	clear();
	
	for (c = 0; c < tileColumnCount; c++) {
		for (r = 0; r < tileRowCount; r++) {
			rect(tile[c][r].x, tile[c][r].y, tileW, tileH, tile[c][r].state);
		}
	}
}

function init() {
	maze = document.getElementById("myMaze");
	ctx = maze.getContext("2d");
	return setInterval (draw, 10);
}

function mMove() {
	x = e.pageX - maze.offsetLeft;
	y = e.pageY - maze.offsetTop;
	
	for (c = 0; c < tileColumnCount; c++) {
		for (r = 0; r < tileRowCount; r++) {
			if (c*(tileW+3) < x && x < c*(tileW+3)+tileW && r*(tileH+3) < y && y < r*(tileH+3)+tileH) {
				if (tile[c][r] == "e") {
					tile[c][r].state = "w";
				} else if (tile[c][r] == "w") {
					tile[c][r].state = "e";
				}
			}
		}
	}
}

function mClick (e) {
	maze.onmousemove = mMove;
	
	x = e.pageX - maze.offsetLeft;
	y = e.pageY - maze.offsetTop;
	
	for (c = 0; c < tileColumnCount; c++) {
		for (r = 0; r < tileRowCount; r++) {
			if (c*(tileW+3) < x && x < c*(tileW+3)+tileW && r*(tileH+3) < y && y < r*(tileH+3)+tileH) {
				if (tile[c][r] == "e") {
					tile[c][r].state = "w";
				} else if (tile[c][r] == "w") {
					tile[c][r].state = "e";
				}
			}
		}
	}
}
function mUp() {
	maze.onmousemove = null;
}

init();
maze.onmousedown = mClick;
maze.onmouseup = mUp;

