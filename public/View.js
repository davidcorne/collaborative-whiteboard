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
    this.isCursorDown = false;
    this.prevX = 0;
    this.currX = 0;
    this.prevY = 0;
    this.currY = 0;
    
    this.addMouseEvents = function() {
        var self = this;
        self.canvas.addEventListener("mousemove", function (event) {
            event.preventDefault();
            self.cursorMove(event);
        }, false);
        self.canvas.addEventListener("mousedown", function (event) {
        event.preventDefault();
            self.cursorDown(event);
        }, false);
        self.canvas.addEventListener("mouseup", function (event) {
            event.preventDefault();
        self.cursorUp(event);
        }, false);
        self.canvas.addEventListener("touchmove", function (event) {
            event.preventDefault();
            self.cursorMove(event.touches[0]);
        });
        self.canvas.addEventListener("touchstart", function (event) {
            event.preventDefault();
            self.cursorDown(event.touches[0]);
        });
        self.canvas.addEventListener("touchend", function (event) {
            event.preventDefault();
            self.cursorUp(event.touches[0]);
        });
    };
    this.addMouseEvents();

    this.displayCurrentColour = function(colour) {
        document.getElementById("current-colour").style.background = colour;
    };

    this.displayCurrentLineWidth = function(width) {
        document.getElementById("current-line-width").value = width;
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

    this.drawLineBetween = function (pointFrom, pointTo, colour, lineWidth) {
        this.context.beginPath();
        this.context.moveTo(pointFrom.x, pointFrom.y);
        this.context.lineTo(pointTo.x, pointTo.y);
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

    this.cursorMove = function(event) {
        if (this.isCursorDown) {
            this.prevX = this.currX;
            this.prevY = this.currY;
            this.currX = event.clientX - this.canvas.offsetLeft;
            this.currY = event.clientY - this.canvas.offsetTop;
            this.draw();
        }
    }; 

    this.cursorDown = function(event) {
        this.prevX = this.currX;
        this.prevY = this.currY;
        this.currX = event.clientX - this.canvas.offsetLeft;
        this.currY = event.clientY - this.canvas.offsetTop;

        this.isCursorDown = true;
    }; 

    this.cursorUp = function(event) {
        this.isCursorDown = false;
    }; 

    this.setColour = function(imageElement) {
        this.controller.setColour(imageElement.id);
    };

    this.changeName = function() {
        var input = document.getElementById("change-username");
        this.controller.changeName(input.value);
        input.value = "";
    };

    this.setLineWidth = function(range) {
        this.controller.setLineWidth(range.value);
    };

};

if (typeof exports != "undefined") {
    exports.View = Whiteboard.View;
}
