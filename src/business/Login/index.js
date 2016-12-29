define([
    'require',
    'components/Page',
    'components/Contenter',
    'components/Footer',
    'components/Button',
    'components/Field',
    '__module__'
].dispose('cpt', 'tpl'), function(require, csPage, csContenter, csFooter, csButton, csField, module) {
    return module('cs-login', {
        components: {
            csPage: csPage,
            csContenter: csContenter,
            csFooter: csFooter,
            csField: csField,
            csButton: csButton
        }
    }, require)
})