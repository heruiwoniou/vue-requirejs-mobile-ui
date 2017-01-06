define(['vue'], function(Vue) {
    return function module(moduleName) {
        return {
            methods: {
                verify: function() {
                    var that = this;
                    Vue.$toast({
                        message: '操作成功',
                        iconClass: 'icon-ok'
                    });
                    window.setTimeout(function() {
                        that.$router.push('/main');
                    }, 2000);

                }
            }
        }
    }
})