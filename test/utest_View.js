var test = require("unit.js");
var View = require("../public/View");
var Mocks = require("./Mocks");

describe("View", function() {
    it("draw with mouse", function() {
        var view = new View.View(
            new Mocks.MockCanvas(), 
            new Mocks.MockButton(),
            new Mocks.MockButton()
        );
        var controller = new Mocks.MockController();
        view.controller = controller;
        
        test.assert(controller.lastLineDrawn === null);
        view.cursorDown({x: 10, y: 0});
        test.assert(controller.lastLineDrawn === null);

        view.cursorMove({x: 15, y: 0});
        test.assert(controller.lastLineDrawn !== null);
        test.assert(controller.lastLineDrawn.from.x === 10);
        test.assert(controller.lastLineDrawn.from.y === 0);
        test.assert(controller.lastLineDrawn.to.x === 15);
        test.assert(controller.lastLineDrawn.to.y === 0);

        view.cursorMove({x: 15, y: 20});
        test.assert(controller.lastLineDrawn.from.x === 15);
        test.assert(controller.lastLineDrawn.from.y === 0);
        test.assert(controller.lastLineDrawn.to.x === 15);
        test.assert(controller.lastLineDrawn.to.y === 20);

        view.cursorMove({x: 50, y: 30});
        test.assert(controller.lastLineDrawn.from.x === 15);
        test.assert(controller.lastLineDrawn.from.y === 20);
        test.assert(controller.lastLineDrawn.to.x === 50);
        test.assert(controller.lastLineDrawn.to.y === 30);
    });

});


