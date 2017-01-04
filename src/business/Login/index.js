define([
    'vue', '__module__', 'text!./tpl.html'
], function(Vue, module, template) {
    return module('cs-login', {
        template: template,
        methods: {
            verify: function() {
                var that = this;
                Vue.$toast({
                    message: '操作成功',
                    iconClass: 'icon-ok'
                }).then(function() {
                    that.$router.push('/main');
                })
            }
        }
    })
})