define(['__component__', 'text!./tpl.html'], function(component, template) {
    return component('cs-tab-container-item', {
        template: template,
        props: ['id']
    })
})