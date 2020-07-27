let canvas, ctx;
let board, ctx2;
let oldX, oldY;
let drawing;
let img;
let canvasH = 280;
let canvasW = 280;

var matrix = new Array(canvasH);


function runScript() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');

    board = document.getElementById('board');
    ctx2 = board.getContext('2d');

    canvas.addEventListener('mousemove', mouseMove);
    canvas.addEventListener('mousedown', mouseDown);
    canvas.addEventListener('mouseout', mouseOut);
    canvas.addEventListener('mouseup', mouseUp);

    ctx.lineWidth = 2;                                       /* РАЗМЕР КИСТИ */
    ctx.lineCap = "round";
    drawing = false;

    clearCanvas();
}

function doDraw(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = "#000000";
    ctx.stroke();
}

function doDrawEvent(ev) {
    let rect = ev.target.getBoundingClientRect();
    let mouseX = ev.clientX - rect.left;
    let mouseY = ev.clientY - rect.top;

    doDraw(oldX, oldY, mouseX, mouseY);
    oldX = mouseX;
    oldY = mouseY;
}

function mouseDown(ev) {
    let rect = ev.target.getBoundingClientRect();
    drawing = true;

    doDraw();

    oldX = ev.clientX - rect.left;
    oldY = ev.clientY - rect.top;
}

function mouseMove(ev) {
    if(drawing) {
        doDrawEvent(ev);
    }
}

function mouseOut(ev) {
    if(drawing) {
        doDrawEvent(ev);
    }
    drawing = false;
    /* ТУТ ВЫЗОВ ФУНКЦИИ ПРИ УХОДЕ МЫШИ С ПОЛЯ РИСОВАНИЯ           РОМА ЛОХ */
}

function mouseUp(ev) {
    drawing = false;
    /* ТУТ ВЫЗОВ ФУНКЦИИ ПРИ ОТПУСКАНИИ МЫШИ                       РОМА ЛОХ*/
}

function clearCanvas() {
    ctx.beginPath();
    ctx.rect(0, 0, canvasW, canvasH);
    ctx.fillStyle = '#FFF';
    ctx.fill();
    for (let i = 0; i < canvasW; i++) {
        matrix[i] = new Array(canvasH);
        for (let q = 0; q < canvasH; q++) {
            matrix[i][q] = 0;
        }
    }
}

function writeInMatrix() {
    img = ctx.getImageData(0,0,canvasW,canvasH);

    for (let i = 0; i < canvasW; i++) {
        for (let q = 0; q < canvasH; q++) {
            let red = img.data[((i * (img.width * 4)) + (q * 4))];
            if (red < 255) {
                matrix[i][q] = 1;
            }
        }
    }
}

setInterval(writeInMatrix, 10);

/* TEST BOARD CODE */

function paint() {
    ctx2.beginPath();
    ctx2.clearRect(0,0,canvasH,canvasW);
    ctx2.fill();
    for (let i = 0; i < canvasH; i++) {
        for (let q = 0; q < canvasW; q++) {
            if (matrix[q][i] === 1) {
                ctx2.beginPath();
                ctx2.rect(i, q, 1, 1);
                ctx2.fillStyle = 'black';
                ctx2.fill();
            }
        }
    }
}

setInterval(paint, 10);

/* TEST BOARD CODE */