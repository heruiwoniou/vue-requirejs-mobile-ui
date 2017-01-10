define(['./../common', '__component__', 'text!./tpl.html'], function(common, component, template) {
    return component('cs-snake', {
        template: template,
        mixins: [common]
    });
})