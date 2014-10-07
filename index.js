var app = require("express")();
var http = require("http").Server(app);

app.get("/", function(request, response) {
    response.sendFile(__dirname + "/public/index.html");
})

http.listen(3000, function() {
    console.log("Listening on *:3000");
});

