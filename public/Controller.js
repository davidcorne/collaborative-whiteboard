// if imported by node, initialise Whiteboard
if (typeof exports != "undefined") {
    var Whiteboard = {};
    var Shared = require("./Shared");
}

Whiteboard.Controller = function(view) {
    this.view = view;
    this.lineColour = "black";
    this.lineWidth = 2;
    this.userID = null;
    this.userName = null;
    this.socket = null;
    
    this.startListening = function(socket) {
        var self = this;
        self.socket = socket
        self.socket.on(Shared.Events.drawLine, function(data) {
            self.view.drawLineBetween(
                data.pointFrom, 
                data.pointTo, 
                data.colour,
                data.lineWidth
            );
        });
        self.socket.on(Shared.Events.clearBoard, function() {
            self.view.clearCanvas();
        });
        self.socket.on(Shared.Events.changeUserID, function(data) {
            self.userID = data.id;
        });
        self.socket.on(Shared.Events.usersChanged, function(users) {
            self.usersChanged(users);
        });
        self.socket.on(Shared.Events.changeName, function(data) {
            self.userName = data.userName;
        });
    }

    this.usersChanged = function(users) {
        var userPairs = [];
        for (var userID in users) {
            var colour = "black";
            if (userID == this.userID) {
                colour = "red";
            }
            userPairs.push({userName: users[userID], colour: colour});
        }
        this.view.drawUsers(userPairs);
    };
    this.drawLine = function(pointA, pointB) {
        this.socket.emit(
            Shared.Events.drawLine, 
            {
                pointFrom: pointA,
                pointTo: pointB,
                colour: this.lineColour,
                lineWidth: this.lineWidth
            }
        );
    };

    this.setColour = function(colour) {
        this.lineColour = colour;
        this.view.displayCurrentColour(colour);
    };

    this.clear = function() {
        this.socket.emit(Shared.Events.clearBoard);
    }

    this.changeName = function(name) {
        var data = {
            userName: name,
            userID: this.userID
        };
        this.socket.emit(Shared.Events.changeName, data);
    };
};

if (typeof exports != "undefined") {
    exports.Controller = Whiteboard.Controller;
}
