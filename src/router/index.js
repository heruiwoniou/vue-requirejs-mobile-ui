(function() {
    var businessModules = [
        'vue',
        'store/index',
        'vue-router'
    ].concat(__config__.map(function(o) {
        var module = o.route.replace(/\//g, '_');
        var func = ";define('business/base/" + module + "',['__module__','business/" + o.path + "/index','text!business/" + o.path + "/tpl.html'],function(factory,businessModule,template){ return factory('" + module + "', businessModule('" + module + "'),template)})"
        __config__.dynamic(func);
        return 'business/base/' + module;
    }));
    define(businessModules, function(Vue, store, VueRouter) {
        Vue.use(VueRouter);
        var m = [].slice.call(arguments, 3);
        var routes = __config__.map(function(o, i) {
            var clone = Object.assign({}, o);
            delete clone.name;
            clone.path = clone.route;
            delete clone.route;
            clone.component = m[i];
            return clone;
        });

        var router = new VueRouter({
            mode: 'hash',
            routes: routes,
        })

        router.beforeEach(function(to, from, next) {
            if (to.path == '/') {
                window.setTimeout(function() {
                    next();
                })
                return;
            }
            store.dispatch('auth').then(function() {
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
            }, function() {
                Vue.$toast({
                    message: '验证信息已失效，请重新登陆',
                    iconClass: 'fa fa-close'
                });
                window.setTimeout(function() {
                    next({ path: '/' });
                })
            });
        })

        return {
            tpl: '<router-view></router-view>',
            router: router
        }
    })
})()