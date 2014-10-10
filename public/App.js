Whiteboard.App = {
};

Whiteboard.App.init = function() {
    Whiteboard.App.view = 
        new Whiteboard.View(document.getElementsByTagName("canvas")[0]);
    Whiteboard.App.controller = new Whiteboard.Controller(Whiteboard.App.view);
    Whiteboard.App.view.controller = Whiteboard.App.controller;
    Whiteboard.App.view.displayCurrentColour(
        Whiteboard.App.controller.lineColour
    );
    Whiteboard.App.controller.startListening(io());
};
