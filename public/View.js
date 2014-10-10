Whiteboard.View = {
    controller: null,
    canvas: null,
    context: null,
    width: null,
    height: null,
    cursorDown: false,
    prevX: 0,
    currX: 0,
    prevY: 0,
    currY: 0
};

Whiteboard.View.init = function(controller) {
    Whiteboard.View.controller = controller;

    Whiteboard.View.canvas = document.getElementsByTagName("canvas")[0];
    Whiteboard.View.context = Whiteboard.View.canvas.getContext("2d");
    Whiteboard.View.width = Whiteboard.View.canvas.width;
    Whiteboard.View.height = Whiteboard.View.canvas.height;

    Whiteboard.View.canvas.addEventListener("mousemove", function (event) {
        event.preventDefault();
        Whiteboard.View.cursor_move(event);
    }, false);
    Whiteboard.View.canvas.addEventListener("mousedown", function (event) {
        event.preventDefault();
        Whiteboard.View.cursor_down(event);
    }, false);
    Whiteboard.View.canvas.addEventListener("mouseup", function (event) {
        event.preventDefault();
        Whiteboard.View.cursor_up(event);
    }, false);
};

Whiteboard.View.displayCurrentColour = function (colour) {
    document.getElementById("current-colour").style.background = colour;
};

Whiteboard.View.clearCanvas = function() {
    Whiteboard.View.context.clearRect(
        0, 
        0, 
        Whiteboard.View.width, 
        Whiteboard.View.height
    );
}

Whiteboard.View.clear = function() {
    Whiteboard.View.controller.clear()
};

Whiteboard.View.drawUsers = function(usersPairs) {
    var ul = document.getElementById("current-users");
    // clear the current users tag.
    ul.innerHTML = "";
    for (var i = 0; i < usersPairs.length; ++i) {
        var li = document.createElement("li");
        li.style.color = usersPairs[i].colour;
        li.appendChild(document.createTextNode(usersPairs[i].userName));
        ul.appendChild(li);
    }
};

Whiteboard.View.drawLineBetween = function (point_from, point_to, colour) {
    Whiteboard.View.context.beginPath();
    Whiteboard.View.context.moveTo(point_from.x, point_from.y);
    Whiteboard.View.context.lineTo(point_to.x, point_to.y);
    Whiteboard.View.context.strokeStyle = colour;
    Whiteboard.View.context.lineWidth = Whiteboard.lineWidth;
    Whiteboard.View.context.stroke();
    Whiteboard.View.context.closePath();
    
};

Whiteboard.View.draw = function () {
    Whiteboard.View.controller.drawLine(
        new Shared.Point(Whiteboard.View.prevX, Whiteboard.View.prevY),
        new Shared.Point(Whiteboard.View.currX, Whiteboard.View.currY)
    );
};

Whiteboard.View.cursor_move = function(event) {
    if (Whiteboard.View.cursorDown) {
        Whiteboard.View.prevX = Whiteboard.View.currX;
        Whiteboard.View.prevY = Whiteboard.View.currY;
        Whiteboard.View.currX = event.clientX - Whiteboard.View.canvas.offsetLeft;
        Whiteboard.View.currY = event.clientY - Whiteboard.View.canvas.offsetTop;
        Whiteboard.View.draw();
    }
}; 

Whiteboard.View.cursor_down = function(event) {
    Whiteboard.View.prevX = Whiteboard.View.currX;
    Whiteboard.View.prevY = Whiteboard.View.currY;
    Whiteboard.View.currX = event.clientX - Whiteboard.View.canvas.offsetLeft;
    Whiteboard.View.currY = event.clientY - Whiteboard.View.canvas.offsetTop;

    Whiteboard.View.cursorDown = true;
}; 

Whiteboard.View.cursor_up = function(event) {
    Whiteboard.View.cursorDown = false;
}; 

Whiteboard.View.setColour = function(imageElement) {
    Whiteboard.View.controller.setColour(imageElement.id);
};

Whiteboard.View.changeName = function() {
    var input = document.getElementById("change-username");
    Whiteboard.View.controller.changeName(input.value);
    input.value = "";
};
