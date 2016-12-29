define(['require', '__component__'].dispose('tpl'), function(require, component) {
    return component('cs-header', {
        props: {
            title: String
        }
    }, require)
})