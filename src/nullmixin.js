class ValueBase {
    constructor() {
        
    }
}

var ValueMixin = superclass => class extends superclass {
    execute(handler) {
        var boundHandler = handler.bind(this);
        boundHandler();
    }
}

class NullValue extends ValueMixin(ValueBase) {
    constructor() {
        super();
    }

    execute(ifnotnull, ifnull) {
        ifnull();
    }
}
