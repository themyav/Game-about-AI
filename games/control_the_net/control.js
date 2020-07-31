var IntervalId;
let isPaused = false;

let canvas;
let context;

//текущая позиция
let x = 0;
let y = 0;
let cur_edge = -1; //какой индекс ребра в массиве ребер этой вершины
let cur_node = -1; //от какого ребра идем

//скорость перемещения
let dx = 0;
let dy = 1;
const step = 1; //длина шага
let prev_dx = dx, prev_dy = dy;
let info_start_weight = 3 + getRandom(60);
let startingX = 20.5;
let startingY = 50;


//изображения
let gameBackground = new Image();
let information = new Image();
let node = new Image();
let input_pic = new Image();
let output_pic = new Image();

//ссылки изображений
gameBackground.src = "resources/bc.png";
information.src = "resources/new_info.png";
node.src = "resources/node.png";
input_pic.src = "resources/input.png";
output_pic.src = "resources/output.png";

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
        drawLine([sx, sy, sx, fy],  3, true, false, self.color);
        drawLine([sx, fy, fx, fy],  3, true, false, self.color);
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
    draw_Node(){
        context.drawImage(node, this.n_x, this.n_y);
        context.font = "30px Open Sans";
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
    draw_Information(){
        context.drawImage(information, this.inf_x, this.inf_y);
        context.font = "20px Open Sans";
        context.fillText(this.weight, this.inf_x + 15, this.inf_y + 40);
    }
}


window.onload = function () {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    drawBackground(); //тут задается начальное положение "информации"
    window.onkeydown = processKey;
    canvas.addEventListener("mousedown", changeWeight);
};

function updateCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(gameBackground, 0, 0);

   drawLine([20.5 + information.width / 2, 50, 20.5 + information.width / 2, nodes[0].y + node.height / 2, nodes[0].x + node.width / 2, nodes[0].y + node.height / 2], 5, true, false);
    drawLine([nodes[nodes.length - 1].x + node.width / 2, nodes[nodes.length - 1].y + node.height / 2, nodes[nodes.length - 1].x + node.width / 2, 850, 1050, 850], 5, true, false);

    context.font = "25px Open Sans";
    context.fillText('Нажми на любую клавишу, чтобы начать движение!', 590, 25);

    context.drawImage(input_pic, 20, 20);
    context.drawImage(output_pic, 1040, 820);

    for(let i = 0; i < edges.length; i++){
        let edge = new Edge(edges[i].left, edges[i].right, edges[i].color);
        edge.draw_Edge();
    }

    for(let i = 0; i < nodes.length; i++){
        let node = new Node(nodes[i].x, nodes[i].y);
        node.set_Weight(nodes[i].weight);
        node.draw_Node();
    }

    let info = new Information(x, y);
    info.set_Weight(info_start_weight);
    info.draw_Information();

}

function drawBackground() {

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
            if(j === 0) node_x = node_x + getRandom(free);
            else node_x = node_x + 200 + getRandom(free);
            let node_weight = (3 + getRandom(150));
            nodes.push({"x" : node_x, "y" : node_y, "weight" : node_weight, "edges" : []});
        }
        node_y += 170;
    }

    //генерация связей
    for(let i = 0; i < nodes.length; i++){
        for(let j = i + 1; j < nodes.length; j++){

            let color = colors[getRandom(colors.length)];
            let dir_x, dir_y;
            let sx = nodes[i].x + node.width / 2;
            let sy = nodes[i].y + node.height / 2;
            let fx = nodes[j].x + node.width / 2;
            let fy = nodes[j].y + node.height / 2;

            if(sy === fy) {
                dir_x = 1;
                dir_y = 0;
            }
            else{
                dir_x = 0;
                dir_y = 1;
            }

            edges.push({ "left" : nodes[i], "right" : nodes[j], "color" : color});

            if(sx !== fx && sy !== fy) {
                let turn_dir = (sx < fx ? 1 : -1);
                turn.push({"x" : sx, "y" : fy, "dir": turn_dir}); //координаты поворота и направление
                nodes[i].edges.push({"right" : j, "dir_x" : dir_x, "dir_y" : dir_y , "turn_x" : sx, "turn_y" : fy, "turn_dir" :turn_dir}); //куда ребро, направление ребра, координата поворота
            }
            else {
                nodes[i].edges.push({"right" : j, "dir_x" : dir_x, "dir_y" : dir_y , "turn_x" : -1, "turn_y" : -1, "turn_dir" : -2});
                console.log('nodes ', i, j, sx, sy, fx, fy);
            } //если ребро прямое, то координаты поворота отрицательны

        }
    }
    //из последней вершины можно повернуть к выходу
    nodes[nodes.length - 1].edges.push({"right" : nodes[nodes.length - 1], "dir_x" : 0, "dir_y" : 1,
             "turn_x" : nodes[nodes.length - 1].x + node.width / 2, "turn_y" : 850, "turn_dir" : 1});

    updateCanvas();
}

function processKey(e){

        dx = 0;
        dy = 0;

        if(e.key === "ArrowUp") dy -= step; //up
        else if(e.key === "ArrowDown") dy += step; //down
        else if(e.key === "ArrowLeft") dx -= step; //left
        else if(e.key === "ArrowRight") dx += step; // right
        else {
            dx = prev_dx;
            dy = prev_dy;
        }
}

function checkCollision(cx, cy) {

    cx = cx + information.width / 2;
    cy = cy + information.height / 2;

    if(cx < 0 || cx > canvas.width || cy < 0 || cy > canvas.height){
        dx = 0;
        dy = 0;
        alert('Ошибка! Выход за край игрового поля!');
        restart();
        return true;
    }

    if(cx === 1050 && cy === 850){
        dx = 0;
        dy = 0;
        alert('Победа! Играем еще раз?');
        restart();
        return true;
    }

    //проверка на поворот
    if(cx === 20.5 + information.width / 2 && cy === nodes[0].y + node.height / 2){
        prev_dx = 1;
        prev_dy = 0;
        return false;
    }
    else if(cur_node > -1 && nodes[cur_node].edges[cur_edge].turn_x === cx && nodes[cur_node].edges[cur_edge].turn_y === cy){
        prev_dx = nodes[cur_node].edges[cur_edge].turn_dir;
        prev_dy = 0;
        return false;
    }

    //проверка попадания в нейрон
    for (let i = 0; i < nodes.length; i++) {
        let n_x = nodes[i].x + node.width / 2;
        let n_y = nodes[i].y + node.height / 2;
        if (cx === n_x && cy === n_y) {
            cur_node = i;
            checkWeight(i);
            return true;
        }
    }
    return false;
}

function gameFailed() {
    alert('Проигрыш. Начать игру сначала?');
    restart();

}

function restart() {
    x = startingX;
    y = startingY;
    dx = 0;
    dy = 1;
    prev_dx = dx;
    prev_dy = dy;
    cur_edge = -1;
    cur_node = -1;
    info_start_weight = 3 + getRandom(60);

}

function checkWeight(i) {
    if(nodes[i].weight < info_start_weight) gameFailed();
    else{
        info_start_weight += Math.floor(nodes[i].weight * 0.1);
        let correct_step = false, free_dx = -1, free_dy = -1, new_edge = -1;

        //проверяем, можно ли идти в направлении, заданном пользователем
        for(let j = 0; j < nodes[i].edges.length; j++){
            if(free_dx === -1){
                free_dx = nodes[i].edges[j].dir_x;
                free_dy = nodes[i].edges[j].dir_y;
                new_edge = j; //если еще не нашли совпадений
            }

            //если у текущей вершины есть свободное ребро в том же направлении.
            if(nodes[i].edges[j].dir_x === dx && nodes[i].edges[j].dir_y === dy){
                new_edge = j;
                correct_step = true;
                break;
            }
        }
        if(!correct_step){
            dx = free_dx;
            dy = free_dy;
        }
        cur_edge = new_edge;
        console.log('chose new_edge', cur_edge);
        if(free_dx === -1 && free_dy === -1) gameFailed();
    }

}


function changeWeight(ev) {
    // изменяем вес нейрона при клике на него
    let cl_x = ev.clientX - canvas.offsetLeft;
    let cl_y = ev.clientY - canvas.offsetTop;
    for(let i = 0; i < nodes.length; i++){
        let cx = nodes[i].x + node.width / 2;
        let cy = nodes[i].y + node.height / 2;
        if((cx - cl_x) * (cx - cl_x) + (cy - cl_y) * (cy - cl_y) <= node.width * node.width) nodes[i].weight += 1;
    }
}


function drawFrame() {
    if(dx !== 0 || dy !== 0){
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
1) перевести все пискселы в проценты
2) красивые картинки
 */
