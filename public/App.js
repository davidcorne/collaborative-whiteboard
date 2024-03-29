Whiteboard.App = {
};

Whiteboard.App.init = function() {
    Whiteboard.App.view = new Whiteboard.View(
        document.getElementById("whiteboard"),
        document.getElementById("download-button"),
        document.getElementById("clear-button")
    );
    Whiteboard.App.controller = new Whiteboard.Controller(Whiteboard.App.view);
    Whiteboard.App.view.controller = Whiteboard.App.controller;
    Whiteboard.App.controller.startListening(io());
};
