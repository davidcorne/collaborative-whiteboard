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

io.on("connection", function(socket) {
    numberOfUsers += 1;
    console.log("A user connected, there are " + numberOfUsers + " users.");
    socket.on("disconnect", function() {
        numberOfUsers -= 1;
        console.log(
            "A user disconnected, there are " + numberOfUsers + " users."
        );
    });
    socket.on(Shared.Events.draw_line, function(data) {
        io.emit(Shared.Events.draw_line, data);
        lines.push(data);
    });
    socket.on(Shared.Events.clear_board, function() {
        io.emit(Shared.Events.clear_board);
        lines = [];
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

