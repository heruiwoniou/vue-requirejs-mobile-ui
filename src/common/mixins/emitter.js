define(function() {
    function broadcast(eventName, params) {
        this.$children.forEach(function(child) {
            if (child.$emit.apply(child, [eventName].concat(params)) !== false) {
                broadcast.apply(child, [eventName].concat(params));
            }
        });
    }
    return {
        methods: {
            dispatch: function(eventName, params) {
                var parent = this.$parent;
                while (parent) {
                    if (parent.$emit.apply(parent, [eventName].concat(params)) !== false) {
                        parent = parent.$parent;
                    } else break;
                }
            },
            broadcast: function(eventName, params) {
                broadcast.call(this, eventName, params);
            }
        }
    };
})