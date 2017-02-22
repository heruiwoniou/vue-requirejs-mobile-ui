(function() {
    var storeModules = [
        'vue',
        'vuex',
        'common/plugins/modulestore',
        './transition'
    ].concat(__config__.map(function(o) {
        var module = o.route.replace(/\//g, '_');
        var func = ";define('store/modules/base/" + module + "',['__store__factory__','store/modules/" + o.path + "/store'],function(factory,storeModule){ var mb = factory('" + module + "'); var m = new storeModule('" + module + "'); var c = $.extend(true,{},mb, m);  return c; });";
        __config__.dynamic(func);
        return 'store/modules/base/' + module;
    }));

    define(storeModules, function(Vue, Vuex, ModuleStore, transition) {
        Vue.use(Vuex);
        Vue.use(ModuleStore);
        var m = [].slice.call(arguments, 4);
        var modules = {};
        __config__.each(function(o, i) {
            modules[o.route.replace(/\//g, '_')] = m[i];
        });
        return new Vuex.Store({
            state: {},
            mutations: {},
            actions: {
                transition: transition
            },
            modules: modules
        })
    })
})();