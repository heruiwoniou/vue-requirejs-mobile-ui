define(function() {
    var componentURL = /^(components|business)\/[A-Z][^\/]+$/g;
    var _ = [];
    var push = _.push;
    var map = _.map;
    var each = _.forEach;
    var dispose = {
        cpt: function() {
            return map.call(this, function(module) {
                return module.replace(componentURL, function(m) { return m + '/index' })
            })
        },
        tpl: function() {
            push.call(this, 'text!./tpl.html')
            return this;
        }
    }

    Array.prototype.dispose = function() {
        var that = this;
        each.call(arguments, function(key) {
            var method;
            (method = dispose[key]) ? (that = method.call(that)) : undefined;
        })
        return that;
    }

    Object.defineProperties ?
        Object.defineProperties(Array.prototype, {
            dispose: {
                enumerable: false
            }
        }) : undefined;

    if (typeof Object.assign != 'function') {
        Object.assign = function(target) {
            'use strict';
            if (target == null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            target = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source != null) {
                    for (var key in source) {
                        if (Object.prototype.hasOwnProperty.call(source, key)) {
                            target[key] = source[key];
                        }
                    }
                }
            }
            return target;
        };
        Object.defineProperties ?
            Object.defineProperties(Object, {
                assign: {
                    enumerable: false
                }
            }) : undefined
    }


})