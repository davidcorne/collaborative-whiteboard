var Mocks = exports;

Mocks.MockListeningSocket = function() {
    this.emitted = [];
    this.emit = function(eventName, data) {
        this.emitted.push({eventName: eventName, data: data});
    };
};

Mocks.MockCanvas = function() {
    this.getContext = function(type) {
    };
    this.callbacks = {};
    this.offsetLeft = 0;
    this.offsetTop = 0;
    this.addEventListener = function(event, callback) {
        this.callbacks[event] = callback;
    };
};

Mocks.MockDownloadButton = function() {
    this.addEventListener = function(event, callback) {
    };
};

Mocks.MockController = function() {
    this.lastLineDrawn = null;
    this.drawLine = function(point_a, point_b) {
        this.lastLineDrawn = {from: point_a, to: point_b};
    };
};
Mocks.MockView = function() {
    this.users = null;
    this.drawUsers = function(users) {
        this.users = users;
    };
    this.displayCurrentPen = function(colour, width) {
    };
};
