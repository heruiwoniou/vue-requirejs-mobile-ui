define([
    'vue',

    'components/Toast',

    'components/Page',
    'components/Header',
    'components/Contenter',
    'components/Footer',
    'components/Field',
    'components/Button',
].dispose('component'), function(Vue, Toast) {
    var _ = [];
    Vue.$toast = Vue.prototype.$toast = Toast;
    _.slice.call(arguments, 2).forEach(function(component) {
        if (component.name) Vue.component(component.name, component);
    })
})