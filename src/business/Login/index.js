define(['vue'], function(Vue) {
    return function module(moduleName) {
        return {
            methods: {
                verify: function() {
                    var that = this;
                    Vue.$toast({
                        message: '操作成功',
                        iconClass: 'fa fa-check'
                    });
                    that.$router.push('/Main');
                }
            }
        }
    }
})