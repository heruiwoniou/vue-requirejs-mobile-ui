(function(factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(['vue', 'wind-dom'], factory) :
        (global.Popup = factory(Vue, WindDom));
})(function(Vue, WindDom) {

    var addClass = WindDom.addClass,
        removeClass = WindDom.removeClass;

    var PopupManager;

    (function() {

        var hasModal = false;

        var getModal = function() {
            if (Vue.prototype.$isServer) return;
            var modalDom = PopupManager.modalDom;
            if (modalDom) {
                hasModal = true;
            } else {
                hasModal = false;
                modalDom = document.createElement('div');
                PopupManager.modalDom = modalDom;

                modalDom.addEventListener('touchmove', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                });

                modalDom.addEventListener('click', function() {
                    PopupManager.doOnModalClick && PopupManager.doOnModalClick();
                });
            }

            return modalDom;
        };

        var instances = {};

        PopupManager = {
            zIndex: 2000,

            modalFade: true,

            getInstance: function(id) {
                return instances[id];
            },

            register: function(id, instance) {
                if (id && instance) {
                    instances[id] = instance;
                }
            },

            deregister: function(id) {
                if (id) {
                    instances[id] = null;
                    delete instances[id];
                }
            },

            nextZIndex: function() {
                return PopupManager.zIndex++;
            },

            modalStack: [],

            doOnModalClick: function() {
                var topItem = PopupManager.modalStack[PopupManager.modalStack.length - 1];
                if (!topItem) return;

                var instance = PopupManager.getInstance(topItem.id);
                if (instance && instance.closeOnClickModal) {
                    instance.close();
                }
            },

            openModal: function(id, zIndex, dom, modalClass, modalFade) {
                if (Vue.prototype.$isServer) return;
                if (!id || zIndex === undefined) return;
                this.modalFade = modalFade;

                var modalStack = this.modalStack;

                for (var i = 0, j = modalStack.length; i < j; i++) {
                    var item = modalStack[i];
                    if (item.id === id) {
                        return;
                    }
                }

                var modalDom = getModal();

                addClass(modalDom, 'v-modal');
                if (this.modalFade && !hasModal) {
                    addClass(modalDom, 'v-modal-enter');
                }
                if (modalClass) {
                    var classArr = modalClass.trim().split(/\s+/);
                    classArr.forEach(function() { addClass(modalDom, item) });
                }
                setTimeout(function() {
                    removeClass(modalDom, 'v-modal-enter');
                }, 300);

                if (dom && dom.parentNode && dom.parentNode.nodeType !== 11) {
                    dom.parentNode.appendChild(modalDom);
                } else {
                    document.body.appendChild(modalDom);
                }

                if (zIndex) {
                    modalDom.style.zIndex = zIndex;
                }
                modalDom.style.display = '';

                this.modalStack.push({ id: id, zIndex: zIndex, modalClass: modalClass });
            },

            closeModal: function(id) {
                var modalStack = this.modalStack;
                var modalDom = getModal();

                if (modalStack.length > 0) {
                    var topItem = modalStack[modalStack.length - 1];
                    if (topItem.id === id) {
                        if (topItem.modalClass) {
                            var classArr = topItem.modalClass.trim().split(/\s+/);
                            classArr.forEach(function() { removeClass(modalDom, item) });
                        }

                        modalStack.pop();
                        if (modalStack.length > 0) {
                            modalDom.style.zIndex = modalStack[modalStack.length - 1].zIndex;
                        }
                    } else {
                        for (var i = modalStack.length - 1; i >= 0; i--) {
                            if (modalStack[i].id === id) {
                                modalStack.splice(i, 1);
                                break;
                            }
                        }
                    }
                }

                if (modalStack.length === 0) {
                    if (this.modalFade) {
                        addClass(modalDom, 'v-modal-leave');
                    }
                    setTimeout(function() {
                        if (modalStack.length === 0) {
                            if (modalDom.parentNode) modalDom.parentNode.removeChild(modalDom);
                            modalDom.style.display = 'none';
                            PopupManager.modalDom = undefined;
                        }
                        removeClass(modalDom, 'v-modal-leave');
                    }, 300);
                }
            }
        };
        !Vue.prototype.$isServer && window.addEventListener('keydown', function(event) {
            if (event.keyCode === 27) { // ESC
                if (PopupManager.modalStack.length > 0) {
                    var topItem = PopupManager.modalStack[PopupManager.modalStack.length - 1];
                    if (!topItem) return;
                    var instance = PopupManager.getInstance(topItem.id);
                    if (instance.closeOnPressEscape) {
                        instance.close();
                    }
                }
            }
        });

    })();

    function merge(target) {
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
    }

    var idSeed = 1;
    var transitions = [];

    var hookTransition = function(transition) {
        if (transitions.indexOf(transition) !== -1) return;

        var getVueInstance = function(element) {
            var instance = element.__vue__;
            if (!instance) {
                var textNode = element.previousSibling;
                if (textNode.__vue__) {
                    instance = textNode.__vue__;
                }
            }
            return instance;
        };

        Vue.transition(transition, {
            afterEnter: function(el) {
                var instance = getVueInstance(el);

                if (instance) {
                    instance.doAfterOpen && instance.doAfterOpen();
                }
            },
            afterLeave: function(el) {
                var instance = getVueInstance(el);

                if (instance) {
                    instance.doAfterClose && instance.doAfterClose();
                }
            }
        });
    };

    var scrollBarWidth;
    var getScrollBarWidth = function() {
        if (Vue.prototype.$isServer) return;
        if (scrollBarWidth !== undefined) return scrollBarWidth;

        var outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.width = '100px';
        outer.style.position = 'absolute';
        outer.style.top = '-9999px';
        document.body.appendChild(outer);

        var widthNoScroll = outer.offsetWidth;
        outer.style.overflow = 'scroll';

        var inner = document.createElement('div');
        inner.style.width = '100%';
        outer.appendChild(inner);

        var widthWithScroll = inner.offsetWidth;
        outer.parentNode.removeChild(outer);

        return widthNoScroll - widthWithScroll;
    };

    var getDOM = function(dom) {
        if (dom.nodeType === 3) {
            dom = dom.nextElementSibling || dom.nextSibling;
            getDOM(dom);
        }
        return dom;
    };

    return {
        props: {
            value: {
                type: Boolean,
                default: false
            },
            transition: {
                type: String,
                default: ''
            },
            openDelay: {},
            closeDelay: {},
            zIndex: {},
            modal: {
                type: Boolean,
                default: false
            },
            modalFade: {
                type: Boolean,
                default: true
            },
            modalClass: {},
            lockScroll: {
                type: Boolean,
                default: true
            },
            closeOnPressEscape: {
                type: Boolean,
                default: false
            },
            closeOnClickModal: {
                type: Boolean,
                default: false
            }
        },

        created: function() {
            if (this.transition) {
                hookTransition(this.transition);
            }
        },

        beforeMount: function() {
            this._popupId = 'popup-' + idSeed++;
            PopupManager.register(this._popupId, this);
        },

        beforeDestroy: function() {
            PopupManager.deregister(this._popupId);
            PopupManager.closeModal(this._popupId);
            if (this.modal && this.bodyOverflow !== null && this.bodyOverflow !== 'hidden') {
                document.body.style.overflow = this.bodyOverflow;
                document.body.style.paddingRight = this.bodyPaddingRight;
            }
            this.bodyOverflow = null;
            this.bodyPaddingRight = null;
        },

        data: function() {
            return {
                opened: false,
                bodyOverflow: null,
                bodyPaddingRight: null,
                rendered: false
            };
        },

        watch: {
            value: function(val) {
                if (val) {
                    if (this._opening) return;
                    if (!this.rendered) {
                        this.rendered = true;
                        Vue.nextTick(function() {
                            this.open();
                        }.bind(this));
                    } else {
                        this.open();
                    }
                } else {
                    this.close();
                }
            }
        },

        methods: {
            open: function(options) {
                if (!this.rendered) {
                    this.rendered = true;
                    this.$emit('input', true);
                }

                var props = merge({}, this, options);

                if (this._closeTimer) {
                    clearTimeout(this._closeTimer);
                    this._closeTimer = null;
                }
                clearTimeout(this._openTimer);

                var openDelay = Number(props.openDelay);
                if (openDelay > 0) {
                    this._openTimer = setTimeout(function() {
                        this._openTimer = null;
                        this.doOpen(props);
                    }.bind(this), openDelay);
                } else {
                    this.doOpen(props);
                }
            },

            doOpen: function(props) {
                if (this.$isServer) return;
                if (this.willOpen && !this.willOpen()) return;
                if (this.opened) return;

                this._opening = true;

                // 使用 vue-popup 的组件，如果需要和父组件通信显示的状态，应该使用 value，它是一个 prop，
                // 这样在父组件中用 v-model 即可；否则可以使用 visible，它是一个 data
                this.visible = true;
                this.$emit('input', true);

                var dom = getDOM(this.$el);

                var modal = props.modal;

                var zIndex = props.zIndex;
                if (zIndex) {
                    PopupManager.zIndex = zIndex;
                }

                if (modal) {
                    if (this._closing) {
                        PopupManager.closeModal(this._popupId);
                        this._closing = false;
                    }
                    PopupManager.openModal(this._popupId, PopupManager.nextZIndex(), dom, props.modalClass, props.modalFade);
                    if (props.lockScroll) {
                        if (!this.bodyOverflow) {
                            this.bodyPaddingRight = document.body.style.paddingRight;
                            this.bodyOverflow = document.body.style.overflow;
                        }
                        scrollBarWidth = getScrollBarWidth();
                        var bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight;
                        if (scrollBarWidth > 0 && bodyHasOverflow) {
                            document.body.style.paddingRight = scrollBarWidth + 'px';
                        }
                        document.body.style.overflow = 'hidden';
                    }
                }

                if (getComputedStyle(dom).position === 'static') {
                    dom.style.position = 'absolute';
                }

                dom.style.zIndex = PopupManager.nextZIndex();
                this.opened = true;

                this.onOpen && this.onOpen();

                if (!this.transition) {
                    this.doAfterOpen();
                }
            },

            doAfterOpen: function() {
                this._opening = false;
            },

            close: function() {
                if (this.willClose && !this.willClose()) return;

                if (this._openTimer !== null) {
                    clearTimeout(this._openTimer);
                    this._openTimer = null;
                }
                clearTimeout(this._closeTimer);

                var closeDelay = Number(this.closeDelay);

                if (closeDelay > 0) {
                    this._closeTimer = setTimeout(function() {
                        this._closeTimer = null;
                        this.doClose();
                    }.bind(this), closeDelay);
                } else {
                    this.doClose();
                }
            },

            doClose: function() {

                this.visible = false;
                this.$emit('input', false);
                this._closing = true;

                this.onClose && this.onClose();

                if (this.lockScroll) {
                    setTimeout(function() {
                        if (this.modal && this.bodyOverflow !== 'hidden') {
                            document.body.style.overflow = this.bodyOverflow;
                            document.body.style.paddingRight = this.bodyPaddingRight;
                        }
                        this.bodyOverflow = null;
                        this.bodyPaddingRight = null;
                    }.bind(this), 200);
                }

                this.opened = false;

                if (!this.transition) {
                    this.doAfterClose();
                }
            },

            doAfterClose: function() {
                PopupManager.closeModal(this._popupId);
                this._closing = false;
            }
        }
    };
})