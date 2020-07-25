let canvas;
let context;

//текущая позиция
let x = 0;
let y = 0;

//скорость перемещения
let dx = 0;
let dy = 0;
const step = 1; //длина шага

let gameBackground = new Image();
let information = new Image();
let node = new Image();
gameBackground.src = "resources/bc.png";
information.src = "resources/new_info.png";
node.src = "resources/node.png";

let nodes = [];
let edges = [];

function getRandom(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function drawLine(sx, sy, fx, fy, line_width) {
    context.beginPath();
    context.moveTo(sx,sy);
    context.lineTo(fx,fy);
    context.lineWidth = line_width;
    context.stroke();

}

class Edge{
    constructor(left, right) {
        self.left = left;
        self.right = right;
    }
    draw_Edge(){
        let sx = self.left.x + node.width / 2;
        let sy = self.left.y + node.height / 2;
        let fx = self.right.x + node.width / 2;
        let fy = self.right.y + node.height / 2;
        drawLine(sx, sy, fx, fy, 3);
    }
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
     checkCollision(x, y);

     for(let i = 0; i < edges.length; i++){
        let edge = new Edge(edges[i].left, edges[i].right);
        edge.draw_Edge();
    }

    for(let i = 0; i < nodes.length; i++){
        let node = new Node(nodes[i].x, nodes[i].y);
        node.set_Weight(nodes[i].weight);
        node.draw_Node();
    }


}


function drawBackground(startingX, startingY) {
    clearTimeout(timer);

    dx = 0;
    dy = 0;
    canvas.width = gameBackground.width;
    canvas.height = gameBackground.height;

    x = startingX;
    y = startingY;

    //генерация нейронов
    let node_y = 80;
    for(let i = 0; i < 5; i++){ //уровень (слой)
        let numberNodes = 2 + getRandom(3); //количество нейронов в слое
        let node_x = 100;
        let free = canvas.width - (2 * numberNodes) * 100;
        free = Math.floor(free / numberNodes);
        for (let j = 0; j < numberNodes; j++){
            if(j == 0) node_x = node_x + getRandom(free);
            else node_x = node_x + 200 + getRandom(free);
            let node_weight = (3 + getRandom(20));
            nodes.push({"x" : node_x, "y" : node_y, "weight" : node_weight});
        }
        node_y += 170;
    }

    //генерация связей
    for(let i = 0; i < nodes.length; i++){
        for(let j = i + 1; j < nodes.length; j+=2){
            edges.push({ "left" : nodes[i], "right" : nodes[j]});
        }
    }

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
    let cx = x + dx, cy = y + dy;
    checkCollision(cx, cy);
}

function checkCollision(cx, cy) {
    cx = cx + information.width / 2;
    cy = cy + information.height / 2;
     for (let i = 1; i < nodes.length; i++){
         let n_x = nodes[i].x + node.width / 2;
         let n_y = nodes[i].y + node.height / 2;
        if( Math.sqrt((n_x - cx) * (n_x- cx)  + (n_y - cy) * (n_y- cy)) < information.width / 2 + node.width / 2){
            dx = 0;
            dy = 0;
            break;
        }
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
1)Пересчет весов при столкновении.
2)класс ребер. Ребра генерируются между каждой парой вершин
(передается указатель на соответствующие вершины)
Движение объекта не произвольно, а по ребру. Пока движешься по ребру, нельзя сменить направление.
3)два объекта - вход и выход соответственно
6)Действия игрока. Однонаправленность, но ВЕТВЛЕНИЕ
7) нормальные картинки

NOT TO DO!!!!!!!!!!!!!!!!!!!!!
не переписывать весь код
 */