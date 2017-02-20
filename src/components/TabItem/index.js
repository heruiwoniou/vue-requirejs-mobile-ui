define(['__component__', 'text!./tpl.html'], function(component, template) {
    return component('cs-tab-item', {
        template: template,
        props: ['id']
    })
})