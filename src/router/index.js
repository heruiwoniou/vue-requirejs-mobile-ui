(function() {
    var businessModules = [
        'vue',
        'store/index',
        'vue-router'
    ].concat(__config__.map(function(o) {
        var func = ";define('business/base/" + o.name + "',['__module__','business/" + o.name.toUpperFirstCase() + "/index','text!business/" + o.name.toUpperFirstCase() + "/tpl.html'],function(factory,businessModule,template){ return factory('" + o.name + "', businessModule('" + o.name + "'),template)})"
        __config__.dynamic(func);
        return 'business/base/' + o.name;
    }));
    define(businessModules, function(Vue, store, VueRouter) {
        Vue.use(VueRouter);
        var m = [].slice.call(arguments, 3);
        var routes = __config__.map(function(o, i) {
            var clone = Object.assign({}, o);
            delete clone.name;
            clone.component = m[i];
            return clone;
        });

        var router = new VueRouter({
            mode: 'hash',
            routes: routes,
        })

        router.beforeEach(function(to, from, next) {
            const toDepth = to.path.split('/').length;
            const fromDepth = from.path.split('/').length;
            var direction = toDepth - fromDepth;
            store.dispatch('transition', {
                direction: direction,
                to: to.path,
                from: from.path
            });
            window.setTimeout(function() {
                next();
            })

        })

        return {
            tpl: '<router-view></router-view>',
            router: router
        }
    })
})()