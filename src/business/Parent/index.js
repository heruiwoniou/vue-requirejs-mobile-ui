define([
    '__module__', 'text!./tpl.html'
], function(module, template) {
    return module('cs-parent', {
        template: template
    })
})