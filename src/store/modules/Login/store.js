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
                    $.get('/api/verify', { username: opt.username, password: opt.password }).then(function(data) {
                        if (data.state) {
                            content.commit('success', data.auth);
                            resolve();
                        } else {
                            content.commit('fail');
                            reject();
                        }
                    }, function() {
                        content.commit('fail');
                        reject("服务器错误！请联系管理员");
                    });
                })
            },
            auth: function(content) {
                return new Promise(function(resolve, reject) {
                    $.get('/api/auth', { auth: content.state.auth }).then(function(data) {
                        if (data) {
                            content.commit('success');
                            resolve(data);
                        } else {
                            content.commit('fail');
                            reject();
                        }
                    });
                });
            }
        }
    }
})