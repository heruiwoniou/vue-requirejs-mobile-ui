define([
    'vue',

    'components/Toast/index',
    'components/MessageBox/index',
    'components/Indicator/index',

    'components/Page/index',
    'components/Header/index',
    'components/Contenter/index',
    'components/Footer/index',
    'components/Field/index',
    'components/Button/index',
    'components/Cell/index',
    'components/CellSwipe/index',
    'components/ActionSheet/index',
    'components/Popup/index',
    'components/Picker/index',
    'components/DateTimePicker/index'
], function(Vue, Toast, MessageBox, Indicator) {
    var _ = [];
    Vue.$toast = Vue.prototype.$toast = Toast;
    Vue.$messagebox = Vue.prototype.$messagebox = MessageBox;
    Vue.$indicator = Vue.prototype.$indicator = Indicator;
    _.slice.call(arguments, 4).forEach(function(component) {
        if (component.name) Vue.component(component.name, component);
    })
})