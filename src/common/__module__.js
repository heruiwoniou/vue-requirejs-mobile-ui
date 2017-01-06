define(['vuex'], function(vuex) {
    return function(module, cpt, template) {
        var mixin = {
            computed: {
                transitionName: function() {
                    var transition = this.$store.state[module].transitionName;
                    return transition;
                }
            }
        }
        return Object.assign(cpt, {
            name: 'cs-' + module,
            template: template,
            mixins: [mixin]
        });
    }
})