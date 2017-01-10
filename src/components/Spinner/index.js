define([
    '__component__',
    './Snake/index',
    './FadingCircle/index',
    'text!./tpl.html'
], function(component, Snake, FadingCircle, template) {
    var SPINNERS = [
        'snake',
        'fading-circle'
    ];
    var parseSpinner = function(index) {
        if ({}.toString.call(index) === '[object Number]') {
            if (SPINNERS.length <= index) {
                console.warn("'" + index + "' spinner not found, use the default spinner.");
                index = 0;
            }
            return SPINNERS[index];
        }

        if (SPINNERS.indexOf(index) === -1) {
            console.warn("'" + index + "' spinner not found, use the default spinner.");
            index = SPINNERS[0];
        }
        return index;
    };

    return component('cs-spinner', {
        template: template,
        computed: {
            spinner: function() {
                return "cs-" + parseSpinner(this.type);
            }
        },

        components: {
            CsSnake: Snake,
            CsFadingCircle: FadingCircle
        },

        props: {
            type: {
                default: 0
            },
            size: {
                type: Number,
                default: 60
            },
            color: {
                type: String,
                default: '#ccc'
            }
        }
    });
})