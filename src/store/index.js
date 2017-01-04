define([
    'vue',
    'vuex',
    './transition'
].concat(__config__.map(function(o) { return 'store/modules/' + o.name; })), function(Vue, Vuex, transition) {
    Vue.use(Vuex);
    var m = [].slice.call(arguments, 3);
    var modules = {};
    __config__.each(function(o, i) {
        modules[o.name] = m[i];
    });
    return new Vuex.Store({
        mutations: {},
        actions: {
            transition: transition
        },
        modules: modules
    })
})