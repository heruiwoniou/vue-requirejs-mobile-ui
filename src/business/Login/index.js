define([
    'require',
    'components/Page',
    'components/Contenter',
    'components/Button',
    'component'
].dispose('cpt', 'tpl'), function(require, csPage, csContenter, csButton, component) {
    return component('cs-main', {
        components: {
            csPage: csPage,
            csContenter: csContenter,
            csButton: csButton
        }
    }, require)
})