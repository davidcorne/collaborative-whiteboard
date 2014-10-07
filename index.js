var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function(request, response) {
    response.sendFile(__dirname + "/public/index.html");
})

app.get("/public/*", function(request, response) {
    response.sendFile(__dirname + request.path);
})

var numberOfUsers = 0;
var lines = [];

io.on("connection", function(socket) {
    numberOfUsers += 1;
    console.log("A user connected, there are " + numberOfUsers + " users.");
    socket.on("disconnect", function() {
        numberOfUsers -= 1;
        console.log(
            "A user disconnected, there are " + numberOfUsers + " users."
        );
    });
    socket.on("draw line", function(data) {
        io.emit("draw line", data);
        lines.push(data);
    });
    socket.on("clear board", function() {
        io.emit("clear board");
        lines = [];
    });
    // Now draw all the existing lines.
    var index = 0;
    for (index = 0; index < lines.length; index++) {
        socket.emit("draw line", lines[index]);
    }
});

http.listen(3000, function() {
    console.log("Listening on *:3000");
});

