var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var Shared = require("./public/Shared");

app.get("/", function(request, response) {
    response.sendFile(__dirname + "/public/index.html");
})

app.get("/public/*", function(request, response) {
    response.sendFile(__dirname + request.path);
})

var numberOfUsers = 0;
var lines = [];
var nextUserID = 1;
var users = {};

io.on("connection", function(socket) {
    numberOfUsers += 1;
    users[nextUserID] = "User " + nextUserID;
    console.log("A user connected given id " + nextUserID + ", there are " + numberOfUsers + " users.");
    // Set the id on the new user.
    socket.emit(Shared.Events.change_user_id, {id: nextUserID});
    socket.emit(Shared.Events.change_name, {userName: users[nextUserID]});
    // The users have changed
    io.emit(Shared.Events.users_changed, users);
    
    socket.userID = nextUserID;
    
    nextUserID += 1;
    
    // Set up the events.
    socket.on("disconnect", function() {
        numberOfUsers -= 1;
        console.log(
            socket.userID + " disconnected, there are " + numberOfUsers + " users."
        );
        delete users[socket.userID];
        io.emit(Shared.Events.users_changed, users);
    });
    socket.on(Shared.Events.draw_line, function(data) {
        io.emit(Shared.Events.draw_line, data);
        lines.push(data);
    });
    socket.on(Shared.Events.clear_board, function() {
        io.emit(Shared.Events.clear_board);
        lines = [];
    });
    socket.on(Shared.Events.change_name, function(data) {
        users[data.userID] = data.userName;
        socket.emit(Shared.Events.change_name, data);
        io.emit(Shared.Events.users_changed, users);
    });

    // Now draw all the existing lines.
    var index = 0;
    for (index = 0; index < lines.length; index++) {
        socket.emit(Shared.Events.draw_line, lines[index]);
    }
});

http.listen(3000, function() {
    console.log("Listening on *:3000");
});

