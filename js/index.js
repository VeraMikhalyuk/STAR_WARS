function load() {
	renderBoard();
	resizeBoard();
	hideAddressBar();
}

function preload() {
	this.length = preload.arguments.length;
	for (var i = 0; i < this.length; i++) {
		this[i] = new Image();
		this[i].src = "../images/" + preload.arguments[i];
	}
}
var pics = new preload("black.jpg", "white.jpg",
	"you1.png", "you2.png", "you1k.png", "you2k.png",
	"me1.png", "me2.png", "me1k.png", "me2k.png");

var black = -1; // computer is black
var red = 1; // visitor is red
var square_dim = 35;
var piece_toggled = false;
var my_turn = false;
var double_jump = false;
var comp_move = false;
var game_is_over = false;
var safe_from = safe_to = null;
var toggler = null;
var togglers = 0;
var compfishka = 0;
var myfishka = 0;

function Board() {
	board = new Array();
	for (var i = 0; i < 8; i++) {
		board[i] = new Array();
		for (var j = 0; j < 8; j++)
			board[i][j] = Board.arguments[8 * j + i];
	}
	board[-2] = new Array(); // prevents errors
	board[-1] = new Array(); // prevents errors
	board[8] = new Array(); // prevents errors
	board[9] = new Array(); // prevents errors
}
var board;
Board(1, 0, 1, 0, 1, 0, 1, 0,
	0, 1, 0, 1, 0, 1, 0, 1,
	1, 0, 1, 0, 1, 0, 1, 0,
	0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0,
	0, -1, 0, -1, 0, -1, 0, -1,
	-1, 0, -1, 0, -1, 0, -1, 0,
	0, -1, 0, -1, 0, -1, 0, -1);

function message(str) {
	if(!game_is_over) utils.event.trigger("message_show", str);
}
function moveable_space(i, j) {
	// calculates whether it is a gray (moveable)
	// or black (non-moveable) space
	return (((i % 2) + j) % 2 == 0);
}




function Coord(x, y) {
	this.x = x;
	this.y = y;
}
function coord(x, y) {
	c = new Coord(x, y);
	return c;
}

function insertAfter(elem, refElem) { 
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling); 
  }

function renderBoard() {
	var content = [];
	content.push("<table border=0 cellspacing=0 cellpadding=0 id='board'>");
	for (var j = 0; j < 8; j++) {
		content.push("<tr>");
		for (var i = 0; i < 8; i++) {
			var style = "";
			var onClickEvent = "";
			if(moveable_space(i, j)) {
				style = "white";
				onClickEvent = generateFunction(i, j);
			}
			content.push("<td class='" + style + "' " + onClickEvent + ">");
			var contentInCell = generateImage(i, j);
			content.push(contentInCell);
			content.push("</td>");
		}
		content.push("</tr>");
	}
	content.push("</table>");
	document.getElementById("board_containter").innerHTML = content.join("");
	var elem = document.createElement('td');
    elem.innerHTML = "<img src=\"images/001.png\"><img id=\"myfishka\" style=\"width:128px\" src=\"images/0.png\"> <br/> <img src=\"images/002.png\"> <img id=\"compfishka\" style=\"width:128px\" src=\"images/0.png\">";
	insertAfter(elem, document.getElementById("board_containter"));
	//document.getElementById("board_containter").innerHTML+="<td><a>Игрок</a> <br/> <a>Компьютер</a></td>";
}
function generateImage(i, j) {
	var imageSrc = "";
	var imageName = "space" + i + "" + j;
	if(board[i][j] == 1) imageSrc = "checkers/"+localStorage.getItem("light");
	else if(board[i][j] == -1) imageSrc = "checkers/"+localStorage.getItem("dark");
	else if(moveable_space(i, j))imageSrc = "white.jpg";
	else imageSrc = "black.jpg";

	var contentInCell = "<img src='./images/" + imageSrc + "' name='" + imageName + "' border=0>";
	return  contentInCell;
}
function generateFunction(i, j) {
	content = " onClick='clicked(" + i + "," + j + ")'";
	return content;
}

function clicked(i, j) {
	if(my_turn) {
		if(integ(board[i][j]) == 1) toggle(i, j);
		else if(piece_toggled) move(selected, coord(i, j));
	} else {
		message("Not your turn!");
	}
}
function toggle(x, y) {
	if(my_turn) {
		if(piece_toggled)
			{
				draw(selected.x, selected.y,  ((board[selected.x][selected.y] == 1.1) ? "me1k.png" : "checkers/"+localStorage.getItem("light")));
			}
		if(piece_toggled && (selected.x == x) && (selected.y == y)) {
			piece_toggled = false;
			if(double_jump) {
				my_turn = double_jump = false;
				computer();
			}
		} else {
			piece_toggled = true;
			draw(x, y,  ((board[x][y] == 1.1) ? "me2k.png" : "checkers/"+localStorage.getItem("light")));
		}
		selected = coord(x, y);
	} else {
		if((piece_toggled) && (integ(board[selected_c.x][selected_c.y]) == -1))
			draw(selected_c.x, selected_c.y, ((board[selected_c.x][selected_c.y] == -1.1) ? "you1k.png" : "checkers/"+localStorage.getItem("dark")));
		if(piece_toggled && (selected_c.x == x) && (selected_c.y == y)) {
			piece_toggled = false;
		} else {
			piece_toggled = true;
			draw(x, y, ((board[x][y] == -1.1) ? "you2k.png" : "checkers/"+localStorage.getItem("dark")));
		}
		selected_c = coord(x, y);
	}
}
function draw(x, y, name) {
	document.images["space" + x + "" + y].src = "./images/" + name;
}
function integ(num) {
	if(num != null)
		return Math.round(num);
	else
		return null;
}
function abs(num) {
	return Math.abs(num);
}
function sign(num) {
	if(num < 0) return -1;
	else return 1;
}
function concatenate(arr1, arr2) {
	// function tacks the second array onto the end of the first and returns result
	for (var i = 0; i < arr2.length; i++)
		arr1[arr1.length + i] = arr2[i];
	return arr1;
}
function legal_move(from, to) {
	if((to.x < 0) || (to.y < 0) || (to.x > 7) || (to.y > 7)) return false;
	piece = board[from.x][from.y];
	distance = coord(to.x - from.x, to.y - from.y);
	if((distance.x == 0) || (distance.y == 0)) {
		message("You may only move diagonally");
		return false;
	}
	if(abs(distance.x) != abs(distance.y)) {
		message("Invalid move");
		return false;
	}
	if(abs(distance.x) > 2) {
		message("Invalid move");
		return false;
	}
	if((abs(distance.x) == 1) && double_jump) {
		return false;
	}
	if((board[to.x][to.y] != 0) || (piece == 0)) {
		return false;
	}
	if((abs(distance.x) == 2)
		&& (integ(piece) != -integ(board[from.x + sign(distance.x)][from.y + sign(distance.y)]))) {
		return false;
	}
	if((integ(piece) == piece) && (sign(piece) != sign(distance.y))) {
		return false;
	}

	return true;
}
function move(from, to) {
	my_turn = true;
	if(legal_move(from, to)) {
		piece = board[from.x][from.y];
		distance = coord(to.x - from.x, to.y - from.y);
		if((abs(distance.x) == 1) && (board[to.x][to.y] == 0)) {
			swap(from, to);
		} else if((abs(distance.x) == 2)
			&& (integ(piece) != integ(board[from.x + sign(distance.x)][from.y + sign(distance.y)]))) {
			double_jump = false;
			swap(from, to);
			remove(from.x + sign(distance.x), from.y + sign(distance.y));
			if((legal_move(to, coord(to.x + 2, to.y + 2)))
				|| (legal_move(to, coord(to.x + 2, to.y - 2)))
				|| (legal_move(to, coord(to.x - 2, to.y - 2)))
				|| (legal_move(to, coord(to.x - 2, to.y + 2)))) {
				double_jump = true;
				message("You may complete the double jump or<br> click on your piece to stay still.");
			}
		}
		if((board[to.x][to.y] == 1) && (to.y == 7)) king_me(to.x, to.y);
		selected = to;
		if(game_over() && !double_jump) {
			setTimeout("toggle(" + to.x + "," + to.y + ");my_turn = double_jump = false;computer();", 800);
		}
	}
	return true;
}
function king_me(x, y) {
	if(board[x][y] == 1) {
		board[x][y] = 1.1; // king you
		draw(x, y, "me2k.png");
	} else if(board[x][y] == -1) {
		board[x][y] = -1.1; // king me
		draw(x, y, "you2k.png");
	}
}

function swap(from, to) {
	if(my_turn || comp_move) {
		dummy_src = document.images["space" + to.x + "" + to.y].src;
		document.images["space" + to.x + "" + to.y].src = document.images["space" + from.x + "" + from.y].src;
		document.images["space" + from.x + "" + from.y].src = dummy_src;
	}
	dummy_num = board[from.x][from.y];
	board[from.x][from.y] = board[to.x][to.y];
	board[to.x][to.y] = dummy_num;
}
function remove(x, y) {
	if(my_turn || comp_move)
	{
		if(my_turn)
		{
			myfishka++;
			document.getElementById("myfishka").setAttribute('src', 'images/'+myfishka+".png"); 
		}
		else
		{
			compfishka++;
			document.getElementById("compfishka").setAttribute('src', 'images/'+compfishka+".png"); 
		}
		draw(x, y, "white.jpg");
	}
	board[x][y] = 0;
}
function Result(val) {
	this.high = val;
	this.dir = new Array();
}
function move_comp(from, to) {
	toggle(from.x, from.y);
	comp_move = true;
	swap(from, to);
	if(abs(from.x - to.x) == 2) {
		remove(from.x + sign(to.x - from.x), from.y + sign(to.y - from.y));
	}
	if((board[to.x][to.y] == -1) && (to.y == 0)) king_me(to.x, to.y);
	setTimeout("selected_c = coord(" + to.x + "," + to.y + ");piece_toggled = true;", 700);
	setTimeout("bak=my_turn;my_turn=false;toggle(" + to.x + "," + to.y + ");my_turn=bak;", 800);
	if(game_over()) {
		setTimeout("comp_move = false;my_turn = true;togglers=0;", 600);
	}
	return true;
}
function game_over() { // make sure game is not over (return false if game is over)
	comp = you = false;
	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j++) {
			if(integ(board[i][j]) == -1) comp = true;
			if(integ(board[i][j]) == 1) you = true;
		}
	}
	if(!comp) message("You win!");
	if(!you) message("Game over");
	game_is_over = (!comp || !you)
	return (!game_is_over);
}

// the higher the jump_priority, the more often the computer will take the jump over the safe move
var jump_priority = 10;

function computer() {
	// step one - prevent any jumps
	for (var j = 0; j < 8; j++) {
		for (var i = 0; i < 8; i++) {
			if(integ(board[i][j]) == 1) {
				if((legal_move(coord(i, j), coord(i + 2, j + 2))) && (prevent(coord(i + 2, j + 2), coord(i + 1, j + 1)))) {
					return true;
				}
				if((legal_move(coord(i, j), coord(i - 2, j + 2))) && (prevent(coord(i - 2, j + 2), coord(i - 1, j + 1)))) {
					return true;
				}
			}
			if(board[i][j] == 1.1) {
				if((legal_move(coord(i, j), coord(i - 2, j - 2))) && (prevent(coord(i - 2, j - 2), coord(i - 1, j - 1)))) {
					return true;
				}
				if((legal_move(coord(i, j), coord(i + 2, j - 2))) && (prevent(coord(i + 2, j - 2), coord(i + 1, j - 1)))) {
					return true;
				}
			}
		}
	}
	// step two - if step one not taken, look for jumps
	for (var j = 7; j >= 0; j--) {
		for (var i = 0; i < 8; i++) {
			if(jump(i, j))
				return true;
		}
	}
	safe_from = null;
	// step three - if step two not taken, look for safe single space moves
	for (var j = 0; j < 8; j++) {
		for (var i = 0; i < 8; i++) {
			if(single(i, j))
				return true;
		}
	}
	// if no safe moves, just take whatever you can get
	if(safe_from != null) {
		move_comp(safe_from, safe_to);
	} else {
		message("You beat me!!");
		game_is_over = true;
	}
	safe_from = safe_to = null;
	return false;
}
function jump(i, j) {
	if(board[i][j] == -1.1) {
		if(legal_move(coord(i, j), coord(i + 2, j + 2))) {
			move_comp(coord(i, j), coord(i + 2, j + 2));
			setTimeout("jump(" + (i + 2) + "," + (j + 2) + ");", 500);
			return true;
		}
		if(legal_move(coord(i, j), coord(i - 2, j + 2))) {
			move_comp(coord(i, j), coord(i - 2, j + 2));
			setTimeout("jump(" + (i - 2) + "," + (j + 2) + ");", 500);
			return true;
		}
	}
	if(integ(board[i][j]) == -1) {
		if(legal_move(coord(i, j), coord(i - 2, j - 2))) {
			move_comp(coord(i, j), coord(i - 2, j - 2));
			setTimeout("jump(" + (i - 2) + "," + (j - 2) + ");", 500);
			return true;
		}
		if(legal_move(coord(i, j), coord(i + 2, j - 2))) {
			move_comp(coord(i, j), coord(i + 2, j - 2));
			setTimeout("jump(" + (i + 2) + "," + (j - 2) + ");", 500);
			return true;
		}
	}
	return false;
}
function single(i, j) {
	if(board[i][j] == -1.1) {
		if(legal_move(coord(i, j), coord(i + 1, j + 1))) {
			safe_from = coord(i, j);
			safe_to = coord(i + 1, j + 1);
			if(wise(coord(i, j), coord(i + 1, j + 1))) {
				move_comp(coord(i, j), coord(i + 1, j + 1));
				return true;
			}
		}
		if(legal_move(coord(i, j), coord(i - 1, j + 1))) {
			safe_from = coord(i, j);
			safe_to = coord(i - 1, j + 1);
			if(wise(coord(i, j), coord(i - 1, j + 1))) {
				move_comp(coord(i, j), coord(i - 1, j + 1));
				return true;
			}
		}
	}
	if(integ(board[i][j]) == -1) {
		if(legal_move(coord(i, j), coord(i + 1, j - 1))) {
			safe_from = coord(i, j);
			safe_to = coord(i + 1, j - 1);
			if(wise(coord(i, j), coord(i + 1, j - 1))) {
				move_comp(coord(i, j), coord(i + 1, j - 1));
				return true;
			}
		}
		if(legal_move(coord(i, j), coord(i - 1, j - 1))) {
			safe_from = coord(i, j);
			safe_to = coord(i - 1, j - 1);
			if(wise(coord(i, j), coord(i - 1, j - 1))) {
				move_comp(coord(i, j), coord(i - 1, j - 1));
				return true;
			}
		}
	}
	return false;
}
function possibilities(x, y) {
	if(!jump(x, y))
		if(!single(x, y))
			return true;
		else
			return false;
	else
		return false;
}
function prevent(end, s) {
	i = end.x;
	j = end.y;
	if(!possibilities(s.x, s.y))
		return true;
	else if((integ(board[i - 1][j + 1]) == -1) && (legal_move(coord(i - 1, j + 1), coord(i, j)))) {
		return move_comp(coord(i - 1, j + 1), coord(i, j));
	} else if((integ(board[i + 1][j + 1]) == -1) && (legal_move(coord(i + 1, j + 1), coord(i, j)))) {
		return move_comp(coord(i + 1, j + 1), coord(i, j));
	} else if((board[i - 1][j - 1] == -1.1) && (legal_move(coord(i - 1, j - 1), coord(i, j)))) {
		return move_comp(coord(i - 1, j - 1), coord(i, j));
	} else if((board[i + 1][j - 1] == -1.1) && (legal_move(coord(i + 1, j - 1), coord(i, j)))) {
		return move_comp(coord(i + 1, j - 1), coord(i, j));
	} else {
		return false;
	}
}
function wise(from, to) {
	i = to.x;
	j = to.y;
	n = (j > 0);
	s = (j < 7);
	e = (i < 7);
	w = (i > 0);
	if(n && e) ne = board[i + 1][j - 1]; else ne = null;
	if(n && w) nw = board[i - 1][j - 1]; else nw = null;
	if(s && e) se = board[i + 1][j + 1]; else se = null;
	if(s && w) sw = board[i - 1][j + 1]; else sw = null;
	eval(((j - from.y != 1) ? "s" : "n") + ((i - from.x != 1) ? "e" : "w") + "=0;");
	if((sw == 0) && (integ(ne) == 1)) return false;
	if((se == 0) && (integ(nw) == 1)) return false;
	if((nw == 0) && (se == 1.1)) return false;
	if((ne == 0) && (sw == 1.1)) return false;
	return true;
}

message("You may begin! Select a piece to move.");
my_turn = true;

