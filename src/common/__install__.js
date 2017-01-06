define([
    'vue',

    'components/Toast/index',
    'components/MessageBox/index',

    'components/Page/index',
    'components/Header/index',
    'components/Contenter/index',
    'components/Footer/index',
    'components/Field/index',
    'components/Button/index',
], function(Vue, Toast, MessageBox) {
    var _ = [];
    Vue.$toast = Vue.prototype.$toast = Toast;
    Vue.$messagebox = Vue.prototype.$messagebox = MessageBox;
    _.slice.call(arguments, 3).forEach(function(component) {
        if (component.name) Vue.component(component.name, component);
    })
})