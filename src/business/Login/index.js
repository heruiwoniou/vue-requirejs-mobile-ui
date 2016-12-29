define([
    'require',
    'components/Page',
    'components/Contenter',
    'components/Footer',
    'components/Button',
    'component'
].dispose('cpt', 'tpl'), function(require, csPage, csContenter, csFooter, csButton, component) {
    return component('cs-main', {
        components: {
            csPage: csPage,
            csContenter: csContenter,
            csFooter: csFooter,
            csButton: csButton
        }
    }, require)
})