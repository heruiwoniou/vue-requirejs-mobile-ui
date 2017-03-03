define([
    'vue',

    'components/Toast/index',
    'components/MessageBox/index',
    'components/Indicator/index',
    'components/InfiniteScroll/index',

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
    'components/DateTimePicker/index',
    'components/Switch/index',
    'components/CheckList/index',
    'components/TabContainer/index',
    'components/TabContainerItem/index',
    'components/TabItem/index',
    'components/TabBar/index',
    'components/Spinner/index',
    'components/LoadMore/index',
    'components/Search/index'
], function(Vue, Toast, MessageBox, Indicator, InfiniteScroll) {
    var _ = [];
    Vue.$toast = Vue.prototype.$toast = Toast;
    Vue.$messagebox = Vue.prototype.$messagebox = MessageBox;
    Vue.$indicator = Vue.prototype.$indicator = Indicator;
    Vue.use(InfiniteScroll);
    _.slice.call(arguments, 5).forEach(function(component) {
        if (component.name) Vue.component(component.name, component);
    })
})