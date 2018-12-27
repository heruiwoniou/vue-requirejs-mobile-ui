define(function() {
    return function storeModule(module) {
        this.state = {
            sign: true,
            auth: ''
        }
        this.getters = {
            isLogin: function(state) {
                return state.sign;
            }
        }
        this.mutations = {
            success: function(state, param) {
                state.sign = true;
                state.auth = param ? param : state.auth;
            },
            fail: function(state) {
                state.sign = false;
                state.auth = '';
            }
        }
        this.actions = {
            verify: function(content, opt) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function(){
                        content.commit('success', 'apitokenstr');
                        resolve();
                    })
                })
            },
            auth: function(content) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function(){
                        content.commit('success');
                        resolve();
                    })
                });
            }
        }
    }
})