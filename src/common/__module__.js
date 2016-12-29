define(['event-hub'], function(EventHub) {
    return function(name, cpt, require) {

        var data = cpt.data;
        cpt.data = function() {
            var native = data ? data() : {};
            native.transitionName = "fade";
            return native;
        }

        var created = cpt.created || function() {};
        cpt.created = function() {
            created.apply(this);
            EventHub.$on('transition', this.transition)
        }

        var methods = cpt.methods || {};
        cpt.methods = Object.assign(cpt, {
            transition: function(to, from) {
                var toDepth = to.path.split('/').length
                var fromDepth = from.path.split('/').length;
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            }
        });
        var beforeDestroy = cpt.beforeDestroy || function() {};
        cpt.beforeDestroy = function() {
            beforeDestroy.apply(this);
            EventHub.$off('transition', this.transition);
        }

        return Object.assign(cpt, {
            name: name,
            template: require('text!./tpl.html')
        });
    }
})