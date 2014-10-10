Whiteboard.App = {
};

Whiteboard.App.init = function() {
    var controller = new Whiteboard.Controller(Whiteboard.View);
    // init the drawing
    Whiteboard.View.init(controller);
    Whiteboard.View.displayCurrentColour(controller.lineColour);
    controller.startListening(io());
};
