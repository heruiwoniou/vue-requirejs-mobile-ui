define([
    'require',
    'components/Page',
    'components/Header',
    'components/Contenter',
    'components/Footer',
    'components/Button',
    'component'
].dispose('cpt', 'tpl'), function(require, csPage, csHeader, csContenter, csFooter, csButton, component) {
    return component('cs-main', {
        components: {
            csPage: csPage,
            csHeader: csHeader,
            csContenter: csContenter,
            csFooter: csFooter,
            csButton: csButton
        }
    }, require)
})