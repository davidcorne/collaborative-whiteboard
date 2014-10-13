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
});


