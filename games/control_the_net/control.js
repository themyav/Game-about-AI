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
    set_Weight(weight = 10){
        this.weight = String(weight);
    }
    get_Weight(){
        return self.weight;
    }
    draw_Node(){
        context.drawImage(node, this.n_x, this.n_y);
        context.font = "30px arial";
        context.fillText(this.weight, this.n_x + 35, this.n_y + 65); //здесь нужно сделать выравнивание
    }

}

class Information{
    constructor(inf_x, inf_y){
        this.inf_x = inf_x;
        this.inf_y = inf_y;
    }
    set_Weight(weight = 9){
        this.weight = String(weight);
    }
    get_Weight(){
        return this.weight;
    }
    draw_Information(){
        context.drawImage(information, this.inf_x, this.inf_y);
        context.font = "30px arial";
        context.fillText(this.weight, this.inf_x + 20, this.inf_y + 40);
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
    let information = new Information(x, y);
    information.set_Weight();
    information.draw_Information();
    let node, new_x = 250, new_y = 140;
    for(let i = 0; i < 5; i++){
        node = new Node(new_x, new_y);
        node.set_Weight();
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
    let prev_dx = dx;
    let prev_dy = dy;
    dx = 0;
    dy = 0;

    if(e.keyCode == 38) dy -= step; //up
    else if(e.keyCode == 40) dy += step; //down
    else if(e.keyCode == 37) dx -= step; //left
    else if(e.keyCode == 39) dx += step; // right
    else {
        dx = prev_dx;
        dy = prev_dy;
    }

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
6)Действия игрока. Однонаправленность, но ВЕТВЛЕНИЕ
7) нормальные картинки

NOT TO DO!!!!!!!!!!!!!!!!!!!!!
не переписывать весь код
 */