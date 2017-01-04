define(['__component__', 'text!./tpl.html'], function(component, template) {
    return component('cs-header', {
        template: template,
        props: {
            title: String
        }
    })
})