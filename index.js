var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function(request, response) {
    response.sendFile(__dirname + "/public/index.html");
})

app.get("/public/*", function(request, response) {
    response.sendFile(__dirname + request.path);
})

io.on("connection", function(socket) {
    console.log("A user connected.");
    socket.on("disconnect", function() {
        console.log("A user disconnected.");
    });
    socket.on("draw line", function(point_from, point_to) {
        io.emit("draw line", point_from, point_to);
    });
});

http.listen(3000, function() {
    console.log("Listening on *:3000");
});

