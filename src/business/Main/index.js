define([
    '__module__', 'text!./tpl.html'
], function(module, template) {
    return module('cs-main', {
        template: template
    })
})