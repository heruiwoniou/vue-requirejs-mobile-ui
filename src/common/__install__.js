define([
    'vue',

    'components/Toast/index',

    'components/Page/index',
    'components/Header/index',
    'components/Contenter/index',
    'components/Footer/index',
    'components/Field/index',
    'components/Button/index',
], function(Vue, Toast) {
    var _ = [];
    Vue.$toast = Vue.prototype.$toast = Toast;
    _.slice.call(arguments, 2).forEach(function(component) {
        if (component.name) Vue.component(component.name, component);
    })
})