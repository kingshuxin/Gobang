//初始化棋盘
function init (){
	for (var i = -5;i < WID + 5;i++) {
		checkerBoard[i] = [];
		for(var j = -5;j < HE + 5;j++){
			checkerBoard[i][j] = {
				state:false,
				type:true
			} 
		}
	}
	drawCheckerBoard();
	cvs.onclick = putChess;
}
//画棋盘
function drawCheckerBoard(){
	for(var i = 0;i< WID;i++){
		for(var j = 0;j < HE;j++){
			ctx.beginPath();
			ctx.strokeStyle = '#000';
			ctx.fillStyle = '#ffc0cb';
			ctx.strokeRect(i*GEZI,j*GEZI,GEZI,GEZI);
			ctx.fillRect(i*GEZI,j*GEZI,GEZI,GEZI);
			ctx.closePath();
		}
	}
}
function putChess (e){
	var x = e.pageX - cvs.offsetLeft;
	var y = e.pageY - cvs.offsetTop;

	x = parseInt(x / GEZI);
	y = parseInt(y / GEZI);
	
	if (checkerBoard[x][y].state) return;

	drawArc(x,y);
	document.getElementById('tips').innerText = '现在轮到' + (turn === true ? '白棋' : '黑棋') + '落子';
	gameOver(x,y);
}
//绘制棋子
function drawArc(w,h){
	ctx.beginPath();
	ctx.fillStyle = (turn === true ? '#fff' : '#000');
	ctx.arc(w * GEZI + GEZI / 2,h * GEZI + GEZI / 2,(GEZI / 2) * 0.8, 0, 2 * Math.PI);
	ctx.fill();
	ctx.closePath();
	turn = !turn;
	checkerBoard[w][h].state = true;
	checkerBoard[w][h].type = turn;
	
} 
//判断游戏能否结束
function gameOver(x,y){
	if(!checkChess(x,y)) return;
	var chess = (turn === true ? '黑棋' : '白棋');
	document.getElementById('tips').innerText = chess + '胜';
	cvs.onclick = null;
}
function checkChess(x,y){
	if(check(x - 5,y - 5, 1, 1, checkerBoard[x][y].type)) return true;
	if(check(x + 5,y - 5, -1, 1, checkerBoard[x][y].type)) return true;
	if(check(x - 5, y, 1, 0, checkerBoard[x][y].type)) return true;
	if(check(x, y - 5, 0, 1, checkerBoard[x][y].type)) return true;
	return false;
}
function check(tpx,tpy,xplus,yplus,type){
	var count = 0;
	for(i = 0;i < 10;i++){
		if(checkerBoard[tpx][tpy].type === type && checkerBoard[tpx][tpy].state === true){
			count ++;
	        if (count >= 5) return true;
		}else{
			count = 0;
		}
		tpx += xplus;
		tpy += yplus;
	}
	return false;
}
// //判断所有方向是否满足胜利条件
// function checkChess(x,y){
// 	var tpx = x,tpy = y;
// 	var type = checkerBoard[x][y].type;
// 	var count = 0;
// 	var i = 0;

// //左上到右下
// 	tpx -=5;
// 	tpy -=5;
// 	for(i = 0;i < 10;i++){
// 		if(checkerBoard[tpx][tpy].type === type && checkerBoard[tpx][tpy].state === true){
// 			count ++;
// 	        if (count >= 5) return true;
// 		}else{
// 			count = 0;
// 		}
// 		tpx ++;
// 		tpy ++;
// 	}
// //从上到下
//     tpx = x;
// 	tpy = y - 5;
// 	count = 0;
// 	for(i = 0;i < 10;i++){
// 		if(checkerBoard[tpx][tpy].type === type && checkerBoard[tpx][tpy].state === true){
// 			count ++;
// 	        if (count >= 5) return true;
// 		}else{
// 			count = 0;
// 		}
// 		tpy ++;
// 	}
// //从右上到左下
//     tpx = x + 5;
// 	tpy = y - 5;
// 	count = 0;
// 	for(i = 0;i < 10;i++){
// 		if(checkerBoard[tpx][tpy].type === type && checkerBoard[tpx][tpy].state === true){
// 			count ++;
// 	        if (count >= 5) return true;
// 		}else{
// 			count = 0;
// 		}
// 		tpx --;
// 		tpy ++;
// 	}
// //从左到右
//     tpx = x - 5;
// 	tpy = y;
// 	count = 0;
// 	for(i = 0;i < 10;i++){
// 		if(checkerBoard[tpx][tpy].type === type && checkerBoard[tpx][tpy].state === true){
// 			count ++;
// 	        if (count >= 5) return true;
// 		}else{
// 			count = 0;
// 		}
// 		tpx ++;
// 	}
	
// 	return false; 	
// }	  