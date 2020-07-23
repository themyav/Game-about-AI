var canvas;
var context;

//текущая позиция
var x = 0;
var y = 0;

//скорость перемещения
var dx = 0;
var dy = 0;
var step = 2; //длина шага

let gameBackground = new Image();
let information = new Image();
let node = new Image();
gameBackground.src = "resources/bc.png";
information.src = "resources/new_info.png";
node.src = "resources/node.png";

class Edge{
    //TODO
}

class Node{
    constructor(n_x, n_y) {
        this.n_x = n_x;
        this.n_y = n_y;
    }
    draw_Node(){
        context.drawImage(node, this.n_x, this.n_y);
    }

}


window.onload = function () {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    drawBackground(20, 20);
    window.onkeydown = processKey;
};

let timer;

function updateCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(gameBackground, 0, 0);
    context.drawImage(information, x, y);
    let node, new_x = 250, new_y = 140;
    for(let i = 0; i < 5; i++){
        node = new Node(new_x, new_y);
        node.draw_Node();
        new_x += 120;
        new_y += 120;
    }

    //context.stroke();

}


function drawBackground(startingX, startingY) {
    clearTimeout(timer);

    dx = 0;
    dy = 0;
    canvas.width = gameBackground.width;
    canvas.height = gameBackground.height;

    x = startingX;
    y = startingY;

    updateCanvas();

    timer = setTimeout("drawFrame()", 10);
}

function processKey(e){
    dx = 0;
    dy = 0;

    if(e.keyCode == 38) dy -= step; //up
    if(e.keyCode == 40) dy += step; //down
    if(e.keyCode == 37) dx -= step; //left
    if(e.keyCode == 39) dx += step; // right

}

function drawFrame() {
    if(dx != 0 || dy != 0){
        x += dx;
        y += dy;
        updateCanvas();
    }
    timer = setTimeout("drawFrame()", 10);

}

/*
TODO
1)вершины генерируются в цикле в самом начале, запоминаются их координаты и потом воссоздаются
в update
2)класс ребер. Ребра генерируются между каждой парой вершин
3)два объекта - вход и выход соответственно
4)коллизию
5)веса, привязанные к вершинам и к информации. Тоже отдельный класс
6)Действия игрока. Однонаправленность, но ВЕТВЛЕНИЕ
7) нормальные картинки

NOT TO DO!!!!!!!!!!!!!!!!!!!!!
не переписывать весь код
 */