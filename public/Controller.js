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
        self.socket.on(Shared.Events.draw_line, function(data) {
            self.view.drawLineBetween(
                data.point_from, 
                data.point_to, 
                data.colour,
                data.lineWidth
            );
        });
        self.socket.on(Shared.Events.clear_board, function() {
            self.view.clearCanvas();
        });
        self.socket.on(Shared.Events.change_user_id, function(data) {
            self.userID = data.id;
        });
        self.socket.on(Shared.Events.users_changed, function(users) {
            self.usersChanged(users);
        });
        self.socket.on(Shared.Events.change_name, function(data) {
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
    this.drawLine = function(point_a, point_b) {
        this.socket.emit(
            Shared.Events.draw_line, 
            {
                point_from: point_a,
                point_to: point_b,
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
        this.socket.emit(Shared.Events.clear_board);
    }

    this.changeName = function(name) {
        var data = {
            userName: name,
            userID: this.userID
        };
        this.socket.emit(Shared.Events.change_name, data);
    };
};

if (typeof exports != "undefined") {
    exports.Controller = Whiteboard.Controller;
}
