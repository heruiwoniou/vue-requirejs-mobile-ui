define([
    'vue',
    'vuex',

    'store/modules/login',
    'store/modules/main',
    'store/modules/admin',
    'store/modules/parent',
    'store/modules/teacher',
], function(Vue, Vuex, login, main, admin, parent, teacher) {
    Vue.use(Vuex);
    var toUpperCase = function(str) {
        return str.replace(/\//g, '_').toLocaleUpperCase();
    }
    return new Vuex.Store({
        mutations: {},
        actions: {
            transition: function(content, params) {
                if (params.direction > 0) {
                    content.dispatch(toUpperCase(params.to) + '_FROM_RIGHT');
                    //content.dispatch(toUpperCase(params.from) + '_TO_LEFT');
                } else if (params.direction < 0) {
                    content.dispatch(toUpperCase(params.to) + '_FROM_LEFT');
                    //content.dispatch(toUpperCase(params.from) + '_TO_RIGHT');
                } else {
                    content.dispatch(toUpperCase(params.to) + '_TO_FROM_BOTTOM');
                    // content.dispatch(toUpperCase(params.from) + '_TO_FROM_BOTTOM');
                }
            }
        },
        modules: {
            login: login,
            main: main,
            admin: admin,
            parent: parent,
            teacher: teacher
        }
    })
})