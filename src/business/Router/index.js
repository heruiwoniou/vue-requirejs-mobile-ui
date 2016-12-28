define([
    'require',
    'vue',
    'vue-router',
    'business/Login',
    'business/Main',
].dispose('cpt', 'tpl'), function(require, Vue, VueRouter, Login, Main) {

    var routes = [
        { path: '/', component: Login },
        { path: '/main', component: Main }
    ]

    Vue.use(VueRouter);
    return {
        tpl: require('text!./tpl.html'),
        router: new VueRouter({
            mode: 'hash',
            routes: routes
        })
    }
})