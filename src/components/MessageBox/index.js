define(['vue', 'vue-popup', 'text!./tpl.html'], function(Vue, Popup, template) {
    var CONFIRM_TEXT = '确定';
    var CANCEL_TEXT = '取消';
    var MessageBoxConstructor = Vue.extend({
        template: template,
        mixins: [Popup],
        props: {
            modal: {
                default: true
            },
            showClose: {
                type: Boolean,
                default: true
            },
            lockScroll: {
                type: Boolean,
                default: false
            },
            closeOnClickModal: {
                default: true
            },
            closeOnPressEscape: {
                default: true
            },
            inputType: {
                type: String,
                default: 'text'
            }
        },

        computed: {
            confirmButtonClasses: function() {
                var classes = 'cs-msgbox-btn cs-msgbox-confirm ' + this.confirmButtonClass;
                if (this.confirmButtonHighlight) {
                    classes += ' cs-msgbox-confirm-highlight';
                }
                return classes;
            },
            cancelButtonClasses: function() {
                var classes = 'cs-msgbox-btn cs-msgbox-cancel ' + this.cancelButtonClass;
                if (this.cancelButtonHighlight) {
                    classes += ' cs-msgbox-cancel-highlight';
                }
                return classes;
            }
        },

        methods: {
            doClose: function() {
                this.value = false;
                this._closing = true;

                this.onClose && this.onClose();

                setTimeout(function() {
                    if (this.modal && this.bodyOverflow !== 'hidden') {
                        document.body.style.overflow = this.bodyOverflow;
                        document.body.style.paddingRight = this.bodyPaddingRight;
                    }
                    this.bodyOverflow = null;
                    this.bodyPaddingRight = null;
                }.bind(this), 200);
                this.opened = false;

                if (!this.transition) {
                    this.doAfterClose();
                }
            },
            afterLeave: function() {
                this.callback(this.__action__);
            },
            handleAction: function(action) {
                if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
                    return;
                }
                var callback = this.callback;
                this.value = false;
                this.__action__ = action;
            },

            validate: function() {
                if (this.$type === 'prompt') {
                    var inputPattern = this.inputPattern;
                    if (inputPattern && !inputPattern.test(this.inputValue || '')) {
                        this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!';
                        this.$refs.input.classList.add('invalid');
                        return false;
                    }
                    var inputValidator = this.inputValidator;
                    if (typeof inputValidator === 'function') {
                        var validateResult = inputValidator(this.inputValue);
                        if (validateResult === false) {
                            this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!';
                            this.$refs.input.classList.add('invalid');
                            return false;
                        }
                        if (typeof validateResult === 'string') {
                            this.editorErrorMessage = validateResult;
                            return false;
                        }
                    }
                }
                this.editorErrorMessage = '';
                this.$refs.input.classList.remove('invalid');
                return true;
            },

            handleInputType: function(val) {
                if (val === 'range' || !this.$refs.input) return;
                this.$refs.input.type = val;
            }
        },

        watch: {
            inputValue: function() {
                if (this.$type === 'prompt') {
                    this.validate();
                }
            },

            value: function(val) {
                this.handleInputType(this.inputType);
                if (val && this.$type === 'prompt') {
                    setTimeout(function() {
                        if (this.$refs.input) {
                            this.$refs.input.focus();
                        }
                    }.bind(this), 500);
                }
            },

            inputType: function(val) {
                this.handleInputType(val);
            }
        },

        data: function() {
            return {
                title: '',
                message: '',
                type: '',
                showInput: false,
                inputValue: null,
                inputPlaceholder: '',
                inputPattern: null,
                inputValidator: null,
                inputErrorMessage: '',
                showConfirmButton: true,
                showCancelButton: false,
                confirmButtonText: CONFIRM_TEXT,
                cancelButtonText: CANCEL_TEXT,
                confirmButtonClass: '',
                confirmButtonDisabled: false,
                cancelButtonClass: '',
                editorErrorMessage: null,
                callback: null,

                __action__: ''
            };
        }
    });

    var defaults = {
        title: '提示',
        message: '',
        type: '',
        showInput: false,
        showClose: true,
        modalFade: true,
        lockScroll: false,
        closeOnClickModal: true,
        inputValue: null,
        inputPlaceholder: '',
        inputPattern: null,
        inputValidator: null,
        inputErrorMessage: '',
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonPosition: 'right',
        confirmButtonHighlight: false,
        cancelButtonHighlight: false,
        confirmButtonText: CONFIRM_TEXT,
        cancelButtonText: CANCEL_TEXT,
        confirmButtonClass: '',
        cancelButtonClass: ''
    };

    var merge = function(target) {
        for (var i = 1, j = arguments.length; i < j; i++) {
            var source = arguments[i];
            for (var prop in source) {
                if (source.hasOwnProperty(prop)) {
                    var value = source[prop];
                    if (value !== undefined) {
                        target[prop] = value;
                    }
                }
            }
        }
        return target;
    };

    var currentMsg, instance;
    var msgQueue = [];

    var defaultCallback = function(action) {
        if (currentMsg) {
            var callback = currentMsg.callback;
            if (typeof callback === 'function') {
                if (instance.showInput) {
                    callback(instance.inputValue, action);
                } else {
                    callback(action);
                }
            }
            if (currentMsg.resolve) {
                var $type = currentMsg.options.$type;
                if ($type === 'confirm' || $type === 'prompt') {
                    if (action === 'confirm') {
                        if (instance.showInput) {
                            currentMsg.resolve({ value: instance.inputValue, action: action });
                        } else {
                            currentMsg.resolve(action);
                        }
                    } else if (action === 'cancel' && currentMsg.reject) {
                        currentMsg.reject(action);
                    }
                } else {
                    currentMsg.resolve(action);
                }
            }
        }
    };

    var initInstance = function() {
        instance = new MessageBoxConstructor({
            el: document.createElement('div')
        });

        instance.callback = defaultCallback;
    };

    var showNextMsg = function() {
        if (!instance) {
            initInstance();
        }

        if (!instance.value || instance.closeTimer) {
            if (msgQueue.length > 0) {
                currentMsg = msgQueue.shift();

                var options = currentMsg.options;
                for (var prop in options) {
                    if (options.hasOwnProperty(prop)) {
                        instance[prop] = options[prop];
                    }
                }
                if (options.callback === undefined) {
                    instance.callback = defaultCallback;
                }
                ['modal', 'showClose', 'closeOnClickModal', 'closeOnPressEscape'].forEach(function(prop) {
                    if (instance[prop] === undefined) {
                        instance[prop] = true;
                    }
                });
                document.body.appendChild(instance.$el);

                Vue.nextTick(function() {
                    instance.value = true;
                });
            }
        }
    };

    var MessageBox = function(options, callback) {
        if (typeof options === 'string') {
            options = {
                title: options
            };
            if (arguments[1]) {
                options.message = arguments[1];
            }
            if (arguments[2]) {
                options.type = arguments[2];
            }
        } else if (options.callback && !callback) {
            callback = options.callback;
        }
        if (!options.$type) options.$type = '';
        if (typeof Promise !== 'undefined') {
            return new Promise(function(resolve, reject) { // eslint-disable-line
                msgQueue.push({
                    options: merge({}, defaults, MessageBox.defaults || {}, options),
                    callback: callback,
                    resolve: resolve,
                    reject: reject
                });

                showNextMsg();
            });
        } else {
            msgQueue.push({
                options: merge({}, defaults, MessageBox.defaults || {}, options),
                callback: callback
            });

            showNextMsg();
        }
    };

    MessageBox.setDefaults = function(defaults) {
        MessageBox.defaults = defaults;
    };

    MessageBox.alert = function(message, title, options) {
        if (typeof title === 'object') {
            options = title;
            title = '';
        }
        return MessageBox(merge({
            title: title,
            message: message,
            $type: 'alert',
            closeOnPressEscape: false,
            closeOnClickModal: false
        }, options));
    };

    MessageBox.confirm = function(message, title, options) {
        if (typeof title === 'object') {
            options = title;
            title = '';
        }
        return MessageBox(merge({
            title: title,
            message: message,
            $type: 'confirm',
            showCancelButton: true
        }, options));
    };

    MessageBox.prompt = function(message, title, options) {
        if (typeof title === 'object') {
            options = title;
            title = '';
        }
        return MessageBox(merge({
            title: title,
            message: message,
            showCancelButton: true,
            showInput: true,
            $type: 'prompt'
        }, options));
    };

    MessageBox.close = function() {
        instance.value = false;
        msgQueue = [];
        currentMsg = null;
    };

    return MessageBox;

})