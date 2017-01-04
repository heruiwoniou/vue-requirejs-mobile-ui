define([
    'require',
    'components/Toast',
    '__module__'
].dispose('component', 'tpl'), function(require, Toast, module) {
    return module('cs-login', {
        methods: {
            verify: function() {
                var that = this;
                Toast({
                    message: '操作成功',
                    iconClass: 'icon-ok'
                }).then(function() {
                    that.$router.push('/main');
                })
            }
        }
    }, require)
})