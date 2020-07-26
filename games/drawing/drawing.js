let canvas, ctx;
let oldX, oldY;
let drawing;

function runScript() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');

    canvas.addEventListener('mousemove', mouseMove);
    canvas.addEventListener('mousedown', mouseDown);
    canvas.addEventListener('mouseout', mouseOut);
    canvas.addEventListener('mouseup', mouseUp);

    ctx.lineWidth = 2;                                       /* РАЗМЕР КИСТИ */
    ctx.lineCap = "round";
    drawing = false;
}

function doDraw(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = "black";                              /* ЦВЕТ КИСТИ*/
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
}

function mouseUp(ev) {
    drawing = false;
}

function clearCanvas() {
    ctx.beginPath();
    ctx.clearRect(0,0,256,256)
    ctx.fill();
}