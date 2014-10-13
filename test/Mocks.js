var Mocks = exports;

Mocks.MockSocket = function() {
    this.emitted = [];
    this.emit = function(eventName, data) {
        this.emitted.push({eventName: eventName, data: data});
    };
};

Mocks.MockCanvas = function() {
    this.getContext = function(type) {
    };
};

Mocks.MockView = function() {
    this.users = null;
    this.drawUsers = function(users) {
        this.users = users;
    };
};
