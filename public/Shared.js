//=============================================================================
//
// This is code to be shared between the client and server.

var Shared = (typeof exports == "undefined") ? {} : exports;

Shared.Point = function(x, y) {
    this.x = x;
    this.y = y;
};

Shared.Events = {
    drawLine: "draw line",
    clearBoard: "clear board",
    changeName: "change name",
    changeUserID: "change user id",
    usersChanged: "users changed"
};
