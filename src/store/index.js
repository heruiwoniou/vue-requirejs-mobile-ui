(function() {
    var storeModules = [
        'vue',
        'vuex',
        './transition'
    ].concat(__config__.map(function(o) {
        var func = ";define('store/modules/base/" + o.name + "',['__store__factory__','store/modules/" + o.name + "'],function(factory,storeModule){ return Object.assign(factory('" + o.path + "'), storeModule('" + o.path + "')); });";
        __config__.dynamic(func);
        return 'store/modules/base/' + o.name;
    }));

    define(storeModules, function(Vue, Vuex, transition) {
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
})();