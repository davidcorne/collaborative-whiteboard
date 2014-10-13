var test = require("unit.js");
var Controller = require("../public/Controller");
var Shared = require("../public/Shared");
var Mocks = require("./Mocks");

describe("Controller", function() {
    it("clear", function() {
        var controller = new Controller.Controller();
        var socket = new Mocks.MockSocket();
        controller.socket = socket;
        controller.clear();
        test.assert(socket.emitted.length === 1);
        test.assert(socket.emitted[0].eventName === Shared.Events.clear_board);
        test.assert(socket.emitted[0].data === undefined);
    });

    it("users changed", function() {
        var view = new Mocks.MockView();
        var controller = new Controller.Controller(view);

        controller.usersChanged([]);
        test.assert(view.users.length === 0);

        controller.usersChanged({1: "Dave"});
        test.assert(view.users.length === 1);
        test.assert(view.users[0].userName === "Dave");
        test.assert(view.users[0].colour === "black");

        // test that it uses ID not Name
        controller.userName = "test";
        controller.userID = 5;
        controller.usersChanged({"1": "test"});
        test.assert(view.users.length === 1);
        test.assert(view.users[0].userName === "test");
        test.assert(view.users[0].colour === "black");

        controller.usersChanged({5: "test"});
        test.assert(view.users.length === 1);
        test.assert(view.users[0].userName === "test");
        test.assert(view.users[0].colour === "red");

    });
    it("emit draw line", function() {
        var controller = new Controller.Controller();
        var socket = new Mocks.MockSocket();
        controller.socket = socket;
        controller.drawLine({x: 10, y: 10}, {x: 15, y: 10});
        test.assert(socket.emitted.length === 1);
        test.assert(socket.emitted[0].eventName === Shared.Events.draw_line);
        test.assert(socket.emitted[0].data !== undefined);
        test.assert(socket.emitted[0].data.point_from.x === 10);
        test.assert(socket.emitted[0].data.point_from.y === 10);
        test.assert(socket.emitted[0].data.point_to.x === 15);
        test.assert(socket.emitted[0].data.point_to.y === 10);

        // test the default lineWidth/colour
        test.assert(socket.emitted[0].data.colour === "black");
        test.assert(socket.emitted[0].data.lineWidth === 2);

        controller.lineColour = "unknown-colour";
        controller.drawLine({x: 10, y: 10}, {x: 15, y: 10});
        test.assert(socket.emitted.length === 2);
        test.assert(socket.emitted[1].eventName === Shared.Events.draw_line);
        test.assert(socket.emitted[1].data !== undefined);
        test.assert(socket.emitted[1].data.colour === "unknown-colour");

        controller.lineWidth = 14;
        controller.drawLine({x: 10, y: 10}, {x: 15, y: 10});
        test.assert(socket.emitted.length === 3);
        test.assert(socket.emitted[2].eventName === Shared.Events.draw_line);
        test.assert(socket.emitted[2].data !== undefined);
        test.assert(socket.emitted[2].data.lineWidth === 14);

    });
});


