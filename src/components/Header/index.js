define(['require', 'component'].dispose('tpl'), function(require, component) {
    return component('cs-header', {
        props: {
            title: String
        }
    }, require)
})