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
    socket.emit(Shared.Events.changeUserID, {id: nextUserID});
    socket.emit(Shared.Events.changeName, {userName: users[nextUserID]});
    // The users have changed
    io.emit(Shared.Events.usersChanged, users);
    
    socket.userID = nextUserID;
    
    nextUserID += 1;
    
    // Set up the events.
    socket.on("disconnect", function() {
        numberOfUsers -= 1;
        console.log(
            socket.userID + " disconnected, there are " + numberOfUsers + " users."
        );
        delete users[socket.userID];
        io.emit(Shared.Events.usersChanged, users);
    });
    socket.on(Shared.Events.drawLine, function(data) {
        io.emit(Shared.Events.drawLine, data);
        lines.push(data);
    });
    socket.on(Shared.Events.clearBoard, function() {
        io.emit(Shared.Events.clearBoard);
        lines = [];
    });
    socket.on(Shared.Events.changeName, function(data) {
        users[data.userID] = data.userName;
        socket.emit(Shared.Events.changeName, data);
        io.emit(Shared.Events.usersChanged, users);
    });

    // Now draw all the existing lines.
    var index = 0;
    for (index = 0; index < lines.length; index++) {
        socket.emit(Shared.Events.drawLine, lines[index]);
    }
});

http.listen(3000, function() {
    console.log("Listening on *:3000");
});

