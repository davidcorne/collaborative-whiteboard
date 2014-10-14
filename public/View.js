// if imported by node, initialise Whiteboard
if (typeof exports != "undefined") {
    var Whiteboard = require("./Whiteboard");;
    var Shared = require("./Shared");
}

Whiteboard.View = function(canvas, downloadButton, clearButton) {
    this.controller = null;
    this.downloadButton = downloadButton;
    this.clearButton = clearButton;
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
        self.downloadButton.addEventListener("click", function(event) {
            self.save();
        });
        self.clearButton.addEventListener("click", function(event) {
            self.clear();
        });
    };
    this.addMouseEvents();

    this.displayCurrentPen = function(lineColour, lineWidth) {
        var context = 
            document.getElementById("current-colour").getContext("2d");
        context.clearRect(0, 0, 40, 40);
        this.drawLineOnContext(
            context, 
            new Shared.Point(10, 20),
            new Shared.Point(30, 20),
            lineColour,
            lineWidth
        );
        // set the pen width slider's value
        var slider = document.getElementById("current-line-width");
        slider.value = lineWidth;
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

    this.save = function(event) {
        var dataURL = this.canvas.toDataURL("image/png");
        this.downloadButton.href = dataURL;
    };

    this.drawUsers = function(usersPairs) {
        var ul = document.getElementById("current-users");
        // clear the current users tag.
        ul.innerHTML = "";
        for (var i = 0; i < usersPairs.length; ++i) {
            var li = document.createElement("li");
            if (usersPairs[i].currentUser) {
                li.style.color = "red";
            }
            li.appendChild(document.createTextNode(usersPairs[i].userName));
            ul.appendChild(li);
        }
    };

    this.drawLineBetween = function(pointFrom, pointTo, colour, lineWidth) {
        this.drawLineOnContext(
            this.context, 
            pointFrom, 
            pointTo, 
            colour, 
            lineWidth
        );
    };

    this.drawLineOnContext = function(
        context, 
        pointFrom,
        pointTo,
        colour,
        lineWidth) 
    {
        context.beginPath();
        context.moveTo(pointFrom.x, pointFrom.y);
        context.lineTo(pointTo.x, pointTo.y);
        context.strokeStyle = colour;
        context.lineWidth = lineWidth;
        context.stroke();
        context.closePath();
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
