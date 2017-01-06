define(['vue', 'text!./tpl.html'], function(Vue, template) {
    var ToastConstructor = Vue.extend({
        template: template,
        props: {
            message: String,
            className: {
                type: String,
                default: ''
            },
            position: {
                type: String,
                default: 'middle'
            },
            iconClass: {
                type: String,
                default: ''
            }
        },
        data: function() {
            return {
                visible: false
            };
        },
        computed: {
            customClass: function() {
                var classes = [];
                switch (this.position) {
                    case 'top':
                        classes.push('is-placetop');
                        break;
                    case 'bottom':
                        classes.push('is-placebottom');
                        break;
                    default:
                        classes.push('is-placemiddle');
                }
                classes.push(this.className);

                return classes.join(' ');
            }
        }
    });


    var toastPool = [];

    var getAnInstance = function() {
        if (toastPool.length > 0) {
            var instance = toastPool[0];
            toastPool.splice(0, 1);
            return instance;
        }
        return new ToastConstructor({
            el: document.createElement('div')
        });
    };

    var returnAnInstance = function(instance) {
        if (instance) {
            toastPool.push(instance);
        }
    };

    var removeDom = function(event) {
        if (event.target.parentNode) {
            event.target.parentNode.removeChild(event.target);
        }
    };

    ToastConstructor.prototype.close = function() {
        this.visible = false;
        this.$el.addEventListener('transitionend', removeDom);
        this.closed = true;
        returnAnInstance(this);
    };

    var Toast = function(options) {
        options = options || {};
        var duration = options.duration || 2000;
        var instance = getAnInstance();
        instance.closed = false;
        clearTimeout(instance.timer);
        instance.message = typeof options === 'string' ? options : options.message;
        instance.position = options.position || 'middle';
        instance.className = options.className || '';
        instance.iconClass = options.iconClass || '';

        document.body.appendChild(instance.$el);
        Vue.nextTick(function() {
            instance.visible = true;
            instance.$el.removeEventListener('transitionend', removeDom);
            ~duration && (instance.timer = setTimeout(function() {
                if (instance.closed) return;
                instance.close()
            }, duration));
        });
    };

    return Toast
})