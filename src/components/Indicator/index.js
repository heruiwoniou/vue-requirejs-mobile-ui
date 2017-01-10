define(['vue', 'components/Spinner/index', '__component__', 'text!./tpl.html'], function(Vue, Spinner, component, template) {
    var Indicator = Vue.extend({
        name: 'cs-indicator',
        template: template,
        data: function() {
            return {
                visible: false
            };
        },
        components: {
            Spinner: Spinner
        },
        computed: {
            convertedSpinnerType: function() {
                switch (this.spinnerType) {
                    case 'fading-circle':
                        return 1;
                    default:
                        return 0;
                }
            }
        },

        props: {
            text: String,
            spinnerType: {
                type: String,
                default: 'snake'
            }
        }
    })

    var instance;

    return {
        open: function(options) {
            options = options || {};
            if (!instance) {
                instance = new Indicator({
                    el: document.createElement('div')
                });
            }
            if (instance.visible) return;
            instance.text = typeof options === 'string' ? options : options.text || '';
            instance.spinnerType = options.spinnerType || 'snake';
            document.body.appendChild(instance.$el);

            Vue.nextTick(function() {
                instance.visible = true;
            });
        },

        close: function() {
            if (instance) {
                instance.visible = false;
            }
        }
    };
})