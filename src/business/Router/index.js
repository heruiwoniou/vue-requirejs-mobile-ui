define([
    'require',
    'vue',
    'vue-router',
    'business/Login',
    'business/Main',
    'business/Admin',
    'business/Teacher',
    'business/Parent'
].dispose('cpt', 'tpl'), function(require, Vue, VueRouter, Login, Main, Admin, Teacher, Parent) {
    Vue.use(VueRouter);

    var routes = [
        { path: '/', component: Login },
        { path: '/main', component: Main },
        { path: '/main/admin', component: Admin },
        { path: '/main/teacher', component: Teacher },
        { path: '/main/parent', component: Parent }
    ]

    var router = new VueRouter({
        mode: 'hash',
        routes: routes
    })

    return {
        tpl: require('text!./tpl.html'),
        router: router
    }
})