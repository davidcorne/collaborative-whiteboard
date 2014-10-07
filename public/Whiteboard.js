var Whiteboard = {
    canvas: null,
    context: null,
    cursorDown: false,
    prevX: 0,
    currX: 0,
    prevY: 0,
    currY: 0,
    lineColour: "black",
    lineWidth: 2,
};

Whiteboard.init = function() {
    // init the drawing
    Whiteboard.canvas = document.getElementsByTagName('canvas')[0];
    Whiteboard.context = Whiteboard.canvas.getContext("2d");
    Whiteboard.canvas.addEventListener("mousemove", function (event) {
        Whiteboard.cursor_move(event);
    }, false);
    Whiteboard.canvas.addEventListener("mousedown", function (event) {
        Whiteboard.cursor_down(event);
    }, false);
    Whiteboard.canvas.addEventListener("mouseup", function (event) {
        Whiteboard.cursor_up(event);
    }, false);
    
    // init the socket communication
    var socket = io();
};

Whiteboard.draw = function () {
    Whiteboard.context.beginPath();
    Whiteboard.context.moveTo(Whiteboard.prevX, Whiteboard.prevY);
    Whiteboard.context.lineTo(Whiteboard.currX, Whiteboard.currY);
    Whiteboard.context.strokeStyle = Whiteboard.lineColour;
    Whiteboard.context.lineWidth = Whiteboard.lineWidth;
    Whiteboard.context.stroke();
    Whiteboard.context.closePath();
}

Whiteboard.cursor_move = function(event) {
    if (Whiteboard.cursorDown) {
        Whiteboard.prevX = Whiteboard.currX;
        Whiteboard.prevY = Whiteboard.currY;
        Whiteboard.currX = event.clientX - Whiteboard.canvas.offsetLeft;
        Whiteboard.currY = event.clientY - Whiteboard.canvas.offsetTop;
        Whiteboard.draw();
    }
}; 

Whiteboard.cursor_down = function(event) {
    Whiteboard.prevX = Whiteboard.currX;
    Whiteboard.prevY = Whiteboard.currY;
    Whiteboard.currX = event.clientX - Whiteboard.canvas.offsetLeft;
    Whiteboard.currY = event.clientY - Whiteboard.canvas.offsetTop;

    Whiteboard.cursorDown = true;
}; 

Whiteboard.cursor_up = function(event) {
    Whiteboard.cursorDown = false;
}; 

