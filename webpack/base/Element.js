const mergeObject = require('../../utils/config').mergeObject;

class Element {
    constructor(model = {}) {
        this.model = model;
    }

    merge(source) {
        mergeObject(this.model, source);
        return this;
    }

    get(name) {
        return new Element(this.model[name]);
    }

    set(name, value) {
        this.model[name] = value;
        return this;
    }

    toConfig() {
        return this.model;
    }
}

module.exports = Element;
