define([
    'require',
    'vue',
    'store/index',
    'vue-router'
].concat(__config__.__get__strings__()).dispose('component', 'tpl'), function(require, Vue, store, VueRouter) {
    Vue.use(VueRouter);

    var routes = __config__.__set__modules__([].slice.call(arguments, 4));

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
        next();
    })

    return {
        tpl: require('text!./tpl.html'),
        router: router
    }
})