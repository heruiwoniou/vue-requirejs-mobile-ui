define([
    'require',
    'components/Toast',
    '__module__'
].dispose('component', 'tpl'), function(require, Toast, module) {
    return module('cs-login', {
        methods: {
            verify: function() {
                Toast({
                    message: '操作成功',
                    iconClass: 'icon icon-success'
                });
            }
        }
    }, require)
})