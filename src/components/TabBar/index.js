define(['__component__', 'text!./tpl.html'], function(component, template) {
    return component('cs-tabbar', {
        template: template,
        props: {
            fixed: Boolean,
            value: {}
        }
    })
})