Whiteboard.Controller = {
    socket: null,
    lineColour: "black",
    lineWidth: 2,
    userID: null,
    userName: null
};

Whiteboard.Controller.init = function() {
    // init the socket communication
    Whiteboard.Controller.socket = io();
    Whiteboard.Controller.socket.on(Shared.Events.draw_line, function(data) {
        Whiteboard.View.drawLineBetween(data.point_from, data.point_to, data.colour);
    });
    Whiteboard.Controller.socket.on(Shared.Events.clear_board, function() {
        Whiteboard.View.clearCanvas();
    });
    Whiteboard.Controller.socket.on(Shared.Events.change_user_id, function(data) {
        Whiteboard.Controller.userID = data.id;
    });
    Whiteboard.Controller.socket.on(Shared.Events.users_changed, function(users) {
        var userPairs = [];
        for (var userID in users) {
            var userName = users[userID];
            var colour = "black";
            if (userName === Whiteboard.Controller.userName) {
                colour = "red";
            }
            userPairs.push({userName: userName, colour: colour});
        }
        Whiteboard.View.drawUsers(userPairs);
    });
    Whiteboard.Controller.socket.on(Shared.Events.change_name, function(data) {
        Whiteboard.Controller.userName = data.userName;
    });

};

Whiteboard.Controller.drawLine = function(point_a, point_b) {
    Whiteboard.Controller.socket.emit(
        Shared.Events.draw_line, 
        {
            point_from: point_a,
            point_to: point_b,
            colour: Whiteboard.Controller.lineColour
        }
    );
};

Whiteboard.Controller.setColour = function(colour) {
    Whiteboard.Controller.lineColour = colour;
    Whiteboard.View.displayCurrentColour(colour);
};

Whiteboard.Controller.clear = function() {
    Whiteboard.Controller.socket.emit(Shared.Events.clear_board);
}

Whiteboard.Controller.changeName = function(name) {
    var data = {
        userName: name,
        userID: Whiteboard.Controller.userID
    };
    Whiteboard.Controller.socket.emit(Shared.Events.change_name, data);
};
