define([
    'vue',

    'components/Page',
    'components/Header',
    'components/Contenter',
    'components/Footer',
    'components/Field',
    'components/Button',
].dispose('component'), function(Vue) {
    var _ = [];
    _.slice.call(arguments, 1).forEach(function(component) {
        Vue.component(component.name, component);
    })
})