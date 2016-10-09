define([
    "dojo/_base/declare",
    "valuemixin"
], function (declare, ValueBase) {
    var NullValue = declare([ValueBase], {
        constructor: function () {
            //NOOP constructor
            this.inherited(arguments);
        },

        execute: function (ifvalid, ifnvalid) {
            ifnvalid();
        }
    });

    return NullValue;
});
