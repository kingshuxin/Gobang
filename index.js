var GEZI = 40;
var HE = 12;
var WID = 15;

var cvs = document.getElementById('cvs');
var ctx = cvs.getContext('2d');

var checkerBoard = [];
var turn = true;

cvs.width = GEZI*WID;
cvs.height = GEZI*HE;
ctx.strokeRect(0,0,100,100);
document.getElementById('replay').onclick = function (){
	init();
}

init();