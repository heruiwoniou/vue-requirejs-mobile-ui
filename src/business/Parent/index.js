define([
    'require',
    'components/Page',
    'components/Header',
    'components/Button',
    '__module__'
].dispose('cpt', 'tpl'), function(require, csPage, csHeader, csButton, module) {
    return module('cs-teacher', {
        components: {
            csPage: csPage,
            csHeader: csHeader,
            csButton: csButton
        }
    }, require)
})