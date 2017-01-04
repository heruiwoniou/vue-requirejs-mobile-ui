define([
    'require',
    'vue',
    'store/index',
    'vue-router'
].concat(__config__.map(
    function(o) { return 'business/' + o.name.replace(/^[\w]/, function(m) { return m.toLocaleUpperCase() }) + '/index'; }
)), function(require, Vue, store, VueRouter) {
    Vue.use(VueRouter);

    var m = [].slice.call(arguments, 4);
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