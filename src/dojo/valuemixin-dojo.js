define([
    "dojo/_base/declare"
], function (declare) {
    var ValueMixin = declare([], {
        constructor: function () {
            //NOOP constructor
        },

        execute: function (ifvalid) {
            var boundFcn = ifvalid.bind(this);
            boundFcn();
        }
    });

    return ValueMixin;
});
