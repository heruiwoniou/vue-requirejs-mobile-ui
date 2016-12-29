define([
    'require',
    'components/Page',
    'components/Header',
    'components/Contenter',
    'components/Footer',
    'components/Button',
    '__module__'
].dispose('cpt', 'tpl'), function(require, csPage, csHeader, csContenter, csFooter, csButton, module) {
    return module('cs-main', {
        components: {
            csPage: csPage,
            csHeader: csHeader,
            csContenter: csContenter,
            csFooter: csFooter,
            csButton: csButton
        }
    }, require)
})