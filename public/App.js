Whiteboard.App = {

};

Whiteboard.App.init = function() {
    // init the controller.
    Whiteboard.Controller.init();

    // init the drawing
    Whiteboard.View.init(Whiteboard.Controller)
    Whiteboard.View.displayCurrentColour(Whiteboard.Controller.lineColour);
};
