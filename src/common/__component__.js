define(function() {
    return function(name, cpt, require) {
        return Object.assign(cpt, { name: name, template: require('text!./tpl.html') });
    }
})