define(['vue', 'vuex'], function(Vue, Vuex) {
    return function module(moduleName) {
        return {
            data: function() {
                return {
                    username: '',
                    password: ''
                }
            },
            methods: Object.assign(
                Vuex.mapActions([
                    'verify'
                ]), {
                    sign: function() {
                        var that = this;
                        this.verify({ username: this.username, password: this.password }).then(function() {
                            that.$router.push('/Main');
                        }, function(mes) {
                            Vue.$toast({
                                message: mes || '帐号或者密码错误',
                                iconClass: 'fa fa-close'
                            });
                        });
                    }
                })
        }
    }
})