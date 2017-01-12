(function() {
    var storeModules = [
        'vue',
        'vuex',
        './transition'
    ].concat(__config__.map(function(o) {
        var module = o.route.replace(/\//g, '_');
        var func = ";define('store/modules/base/" + module + "',['__store__factory__','store/modules/" + o.path + "/store'],function(factory,storeModule){ return Object.assign(factory('" + module + "'), storeModule('" + module + "')); });";
        __config__.dynamic(func);
        return 'store/modules/base/' + module;
    }));

    define(storeModules, function(Vue, Vuex, transition) {
        Vue.use(Vuex);
        var m = [].slice.call(arguments, 3);
        var modules = {};
        __config__.each(function(o, i) {
            modules[o.route.replace(/\//g, '_')] = m[i];
        });
        return new Vuex.Store({
            mutations: {},
            actions: {
                transition: transition
            },
            modules: modules
        })
    })
})();