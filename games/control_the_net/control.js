var IntervalId;
let isPaused = false;

let canvas;
let context;

//текущая позиция
let x = 0;
let y = 0;

//скорость перемещения
let dx = 1;
let dy = 0;
const step = 1; //длина шага
let game_started = true;
let prev_dx = dx, prev_dy = dy;

let gameBackground = new Image();
let information = new Image();
let node = new Image();
gameBackground.src = "resources/bc.png";
information.src = "resources/new_info.png";
node.src = "resources/node.png";

//массивы

let nodes = [];
let edges = [];
let turn = [];
let colors = ["steelblue", "khaki", "coral"];

function getRandom(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function drawLine(cord, line_width, to_stroke, to_fill, color = "black") { //coordinates
    context.beginPath();
    let sx = cord[0], sy = cord[1];
    context.moveTo(sx, sy);
    for(let i = 2; i < cord.length; i+=2){
        context.lineTo(cord[i], cord[i + 1]);
    }
    context.lineWidth = line_width;
    if(to_stroke) {
        context.strokeStyle = color;
        context.stroke();
    }
    if(to_fill) {
        context.fillStyle = color;
        context.fill();
    }

}


class Edge{
    constructor(left, right, color) {
        self.left = left;
        self.right = right;
        self.color = color;
    }
    draw_Edge(){
        let sx = self.left.x + node.width / 2;
        let sy = self.left.y + node.height / 2;
        let fx = self.right.x + node.width / 2;
        let fy = self.right.y + node.height / 2;
        drawLine([sx, sy, fx, sy],  3, true, false, self.color);
        drawLine([fx, sy, fx, fy],  3, true, false, self.color);
        turn.push({"x" : fx, "y" : sy});
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
        context.fillStyle = "black";
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
    drawBackground(21.5, (80 + node.height / 2) - information.height / 2);
    window.onkeydown = processKey;
};

function updateCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(gameBackground, 0, 0);

    context.font = "25px Arial";
    context.fillText('Нажми на пробел, чтобы начать движение!', 680, 25);

     drawLine([30, 80, 40, 20, 100, 20, 90, 80, 30, 80 ], 3, false, true, "darkred");
      drawLine([1030, 880, 1040, 820, 1100, 820, 1090, 880, 1030, 880 ], 3, false, true, "darkred");

    for(let i = 0; i < edges.length; i++){
        let edge = new Edge(edges[i].left, edges[i].right, edges[i].color);
        edge.draw_Edge();
    }

    for(let i = 0; i < nodes.length; i++){
        let node = new Node(nodes[i].x, nodes[i].y);
        node.set_Weight(nodes[i].weight);
        node.draw_Node();
    }

    let information = new Information(x, y);
    information.set_Weight();
    information.draw_Information();
    //дело в том, что желаемое перемещение должно быть разрешено реализовывать только в пределах нейрона, а не за ним.

}

function drawBackground(startingX, startingY) {

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
            nodes.push({"x" : node_x, "y" : node_y, "weight" : node_weight, "edges" : []});
        }
        node_y += 170;
    }

    //генерация связей
    for(let i = 0; i < nodes.length; i++){
        for(let j = i + 1; j < nodes.length; j+=2){
            let color = colors[getRandom(colors.length)];
            let dir_x, dir_y;
            let sx = nodes[i].x + node.width / 2;
            let sy = nodes[i].y + node.height / 2;
            let fx = nodes[j].x + node.width / 2;
            let fy = nodes[j].y + node.height / 2;
            if(sx == fx) dir_x = 0;
            else if(sx < fx) dir_x = 1;
            else dir_x = -1;
            if(sy == fy) dir_y = 0;
            else if(sy < fy) dir_y = 1;
            else dir_y = -1;

            edges.push({ "left" : nodes[i], "right" : nodes[j], "color" : color});
            nodes[i].edges.push({ "left" : nodes[i], "right" : nodes[j], "dir_x" : dir_x, "dir_y" : dir_y});
            nodes[j].edges.push({ "left" : nodes[i], "right" : nodes[j], "dir_x" : -dir_x, "dir_y" : -dir_y});
        }
    }

    updateCanvas();
}

function processKey(e){

        dx = 0;
        dy = 0;

        if(e.keyCode === 38) dy -= step; //up
        else if(e.keyCode === 40) dy += step; //down
        else if(e.keyCode === 37) dx -= step; //left
        else if(e.keyCode === 39) dx += step; // right
        else {
            dx = prev_dx;
            dy = prev_dy;
        }
}

function checkCollision(cx, cy) {
    cx = cx + information.width / 2;
    cy = cy + information.height / 2;
    for (let i = 0; i < nodes.length; i++) {
        let n_x = nodes[i].x + node.width / 2;
        let n_y = nodes[i].y + node.height / 2;
        if (cx == n_x && cy == n_y) {
            console.log(cx, cy, n_x, n_y);
            return true;
        }
    }
    return false;
}

function drawFrame() {
    if(dx != 0 || dy != 0){
        if(checkCollision(x, y)){
            x += dx;
            y += dy;
            prev_dx = dx;
            prev_dy = dy; // меняем направление
        }
        else{
            x += prev_dx;
            y += prev_dy; //движемся как раньше
        }
        updateCanvas();
    }
}

IntervalId = setInterval(drawFrame, 10);

function togglePause() {
    isPaused = !isPaused;
    if (isPaused) {
        console.log("Pausing");
        clearInterval(IntervalId);
    }
    else {
        console.log("Unpausing");
        IntervalId = setInterval(drawFrame, 10);

    }
}
/*
TODO
1) Когда информация находится в центре нейрона:
1.1 - проверка весов и алерт о проигрыше, если вес нейрона меньше.
1.2 иначе:
 - если dx == prev_x и dy == prev_y, то ищем первое свободное ребро и идем в него
 - иначе проверяем, существует ли выбранное ребро. Если да, то идем в него, иначе в какое существует.
2) Проверка поворотов
- когда находимся в точке поворота изменяем направление
3) Можно отдельную функцию взятия координат центра.
7) нормальные картинки

NOT TO DO!!!!!!!!!!!!!!!!!!!!!
не переписывать весь код
 */
