define([
  'vue',
  'vue-router',
  'store/index',
  'router/index',
  'emitter',
  'env-config',
  '__install__'
], function (Vue, VueRouter, store, router, Emitter, env) {
  window.Vue = Vue
  return {
    run: function () {
      Vue.config.silent = false
      Vue.config.devtools = true
      Vue.mixin(Emitter);
      Vue.mixin({
        data: function() {
          return {
            env: env
          }
        }
      });
      new Vue({el: 'body > div', store: store, template: router.tpl, router: router.router})
    }
  }
})
