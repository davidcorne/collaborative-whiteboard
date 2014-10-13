// if imported by node, initialise Whiteboard
if (typeof exports != "undefined") {
    var Whiteboard = {};
    var Shared = require("./Shared");
}

Whiteboard.View = function(canvas) {
    this.controller = null;
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.cursorDown = false;
    this.prevX = 0;
    this.currX = 0;
    this.prevY = 0;
    this.currY = 0;
    
    this.addMouseEvents = function() {
        var self = this;
        self.canvas.addEventListener("mousemove", function (event) {
            event.preventDefault();
            self.cursor_move(event);
        }, false);
        self.canvas.addEventListener("mousedown", function (event) {
        event.preventDefault();
            self.cursor_down(event);
        }, false);
        self.canvas.addEventListener("mouseup", function (event) {
            event.preventDefault();
        self.cursor_up(event);
        }, false);
        self.canvas.addEventListener("touchmove", function (event) {
            event.preventDefault();
            self.cursor_move(event.touches[0]);
        });
        self.canvas.addEventListener("touchstart", function (event) {
            event.preventDefault();
            self.cursor_down(event.touches[0]);
        });
        self.canvas.addEventListener("touchend", function (event) {
            event.preventDefault();
            self.cursor_up(event.touches[0]);
        });
    };
    this.addMouseEvents();

    this.displayCurrentColour = function (colour) {
        document.getElementById("current-colour").style.background = colour;
    };

    this.clearCanvas = function() {
        this.context.clearRect(
            0, 
            0, 
            this.width, 
            this.height
        );
    }

    this.clear = function() {
        this.controller.clear()
    };

    this.drawUsers = function(usersPairs) {
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

    this.drawLineBetween = function (point_from, point_to, colour, lineWidth) {
        this.context.beginPath();
        this.context.moveTo(point_from.x, point_from.y);
        this.context.lineTo(point_to.x, point_to.y);
        this.context.strokeStyle = colour;
        this.context.lineWidth = lineWidth;
        this.context.stroke();
        this.context.closePath();
        
    };

    this.draw = function () {
        this.controller.drawLine(
            new Shared.Point(this.prevX, this.prevY),
            new Shared.Point(this.currX, this.currY)
        );
    };

    this.cursor_move = function(event) {
        if (this.cursorDown) {
            this.prevX = this.currX;
            this.prevY = this.currY;
            this.currX = event.clientX - this.canvas.offsetLeft;
            this.currY = event.clientY - this.canvas.offsetTop;
            this.draw();
        }
    }; 

    this.cursor_down = function(event) {
        this.prevX = this.currX;
        this.prevY = this.currY;
        this.currX = event.clientX - this.canvas.offsetLeft;
        this.currY = event.clientY - this.canvas.offsetTop;

        this.cursorDown = true;
    }; 

    this.cursor_up = function(event) {
        this.cursorDown = false;
    }; 

    this.setColour = function(imageElement) {
        this.controller.setColour(imageElement.id);
    };

    this.changeName = function() {
        var input = document.getElementById("change-username");
        this.controller.changeName(input.value);
        input.value = "";
    };

};

if (typeof exports != "undefined") {
    exports.View = Whiteboard.View;
}
