//=============================================================================
//
// This is code to be shared between the client and server.

var Shared = (typeof exports == "undefined") ? {} : exports;

Shared.Point = function(x, y) {
    this.x = x;
    this.y = y;
};

Shared.Events = {
    draw_line: "draw line",
    clear_board: "clear board",
    change_line_colour: "change line colour",
};
