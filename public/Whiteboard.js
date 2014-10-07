var Whiteboard = {
    canvas: null,
    context: null,
    width: null,
    height: null,
    socket: null,
    cursorDown: false,
    prevX: 0,
    currX: 0,
    prevY: 0,
    currY: 0,
    lineColour: "black",
    lineWidth: 2,
};

Whiteboard.init = function() {
    // init the socket communication
    Whiteboard.socket = io();
    Whiteboard.socket.on(Shared.Events.draw_line, function(data) {
        Whiteboard.drawLineBetween(data.point_from, data.point_to);
    });
    Whiteboard.socket.on(Shared.Events.clear_board, function() {
        Whiteboard.context.clearRect(0, 0, Whiteboard.width, Whiteboard.height);
    });

    // init the drawing
    Whiteboard.canvas = document.getElementsByTagName('canvas')[0];
    Whiteboard.context = Whiteboard.canvas.getContext("2d");
    Whiteboard.width = Whiteboard.canvas.width;
    Whiteboard.height = Whiteboard.canvas.height;

    Whiteboard.canvas.addEventListener("mousemove", function (event) {
        event.preventDefault();
        Whiteboard.cursor_move(event);
    }, false);
    Whiteboard.canvas.addEventListener("mousedown", function (event) {
        event.preventDefault();
        Whiteboard.cursor_down(event);
    }, false);
    Whiteboard.canvas.addEventListener("mouseup", function (event) {
        event.preventDefault();
        Whiteboard.cursor_up(event);
    }, false);
    
};

Whiteboard.drawLineBetween = function (point_from, point_to) {
    Whiteboard.context.beginPath();
    Whiteboard.context.moveTo(point_from.x, point_from.y);
    Whiteboard.context.lineTo(point_to.x, point_to.y);
    Whiteboard.context.strokeStyle = Whiteboard.lineColour;
    Whiteboard.context.lineWidth = Whiteboard.lineWidth;
    Whiteboard.context.stroke();
    Whiteboard.context.closePath();
    
};

Whiteboard.clear = function() {
    Whiteboard.socket.emit(Shared.Events.clear_board);
};

Whiteboard.draw = function () {
    Whiteboard.socket.emit(
        Shared.Events.draw_line, 
        {
            point_from: new Shared.Point(Whiteboard.prevX, Whiteboard.prevY),
            point_to: new Shared.Point(Whiteboard.currX, Whiteboard.currY)
        }
    );
};

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

