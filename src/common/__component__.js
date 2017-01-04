define(function() {
    return function(name, cpt) {
        return Object.assign(cpt, { name: name });
    }
})