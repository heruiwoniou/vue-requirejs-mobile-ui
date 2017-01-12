(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
        (global.WindDom = factory());
}(this, (function() {

    var clazz = function() {
        var trim = function(string) {
            return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
        };

        var hasClass = function(el, cls) {
            if (!el || !cls) return false;
            if (cls.indexOf(' ') != -1) throw new Error('className should not contain space.');
            if (el.classList) {
                return el.classList.contains(cls);
            } else {
                return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
            }
        };

        var addClass = function(el, cls) {
            if (!el) return;
            var curClass = el.className;
            var classes = (cls || '').split(' ');

            for (var i = 0, j = classes.length; i < j; i++) {
                var clsName = classes[i];
                if (!clsName) continue;

                if (el.classList) {
                    el.classList.add(clsName);
                } else {
                    if (!hasClass(el, clsName)) {
                        curClass += ' ' + clsName;
                    }
                }
            }
            if (!el.classList) {
                el.className = curClass;
            }
        };

        var removeClass = function(el, cls) {
            if (!el || !cls) return;
            var classes = cls.split(' ');
            var curClass = ' ' + el.className + ' ';

            for (var i = 0, j = classes.length; i < j; i++) {
                var clsName = classes[i];
                if (!clsName) continue;

                if (el.classList) {
                    el.classList.remove(clsName);
                } else {
                    if (hasClass(el, clsName)) {
                        curClass = curClass.replace(' ' + clsName + ' ', ' ');
                    }
                }
            }
            if (!el.classList) {
                el.className = trim(curClass);
            }
        };

        return {
            hasClass: hasClass,
            addClass: addClass,
            removeClass: removeClass
        };
    }();
    var event = function() {
        var bindEvent = (function() {
            if (document.addEventListener) {
                return function(element, event, handler) {
                    if (element && event && handler) {
                        element.addEventListener(event, handler, false);
                    }
                };
            } else {
                return function(element, event, handler) {
                    if (element && event && handler) {
                        element.attachEvent('on' + event, handler);
                    }
                };
            }
        })();

        var unbindEvent = (function() {
            if (document.removeEventListener) {
                return function(element, event, handler) {
                    if (element && event) {
                        element.removeEventListener(event, handler, false);
                    }
                };
            } else {
                return function(element, event, handler) {
                    if (element && event) {
                        element.detachEvent('on' + event, handler);
                    }
                };
            }
        })();

        var bindOnce = function(el, event, fn) {
            var listener = function() {
                if (fn) {
                    fn.apply(this, arguments);
                }
                unbindEvent(el, event, listener);
            };
            bindEvent(el, event, listener);
        };

        return {
            on: bindEvent,
            off: unbindEvent,
            once: bindOnce
        };
    }();
    var style = function() {
        var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
        var MOZ_HACK_REGEXP = /^moz([A-Z])/;

        function camelCase(name) {
            return name.
            replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
                return offset ? letter.toUpperCase() : letter;
            }).
            replace(MOZ_HACK_REGEXP, 'Moz$1');
        }

        var ieVersion = Number(document.documentMode);
        var getStyle = ieVersion < 9 ? function(element, styleName) {
            if (!element || !styleName) return null;
            styleName = camelCase(styleName);
            if (styleName === 'float') {
                styleName = 'styleFloat';
            }
            try {
                switch (styleName) {
                    case 'opacity':
                        try {
                            return element.filters.item('alpha').opacity / 100;
                        } catch (e) {
                            return 1.0;
                        }
                        break;
                    default:
                        return (element.style[styleName] || element.currentStyle ? element.currentStyle[styleName] : null);
                }
            } catch (e) {
                return element.style[styleName];
            }
        } : function(element, styleName) {
            if (!element || !styleName) return null;
            styleName = camelCase(styleName);
            if (styleName === 'float') {
                styleName = 'cssFloat';
            }
            try {
                var computed = document.defaultView.getComputedStyle(element, '');
                return element.style[styleName] || computed ? computed[styleName] : null;
            } catch (e) {
                return element.style[styleName];
            }
        };

        var setStyle = function(element, styleName, value) {
            if (!element || !styleName) return;

            if (typeof styleName === 'object') {
                for (var prop in styleName) {
                    if (styleName.hasOwnProperty(prop)) {
                        setStyle(element, prop, styleName[prop]);
                    }
                }
            } else {
                styleName = camelCase(styleName);
                if (styleName === 'opacity' && ieVersion < 9) {
                    element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
                } else {
                    element.style[styleName] = value;
                }
            }
        };

        return {
            getStyle: getStyle,
            setStyle: setStyle
        };
    }();
    var create = function() {
        var create = function(config, refs) {
            if (!config) return null;
            var dom, childElement;

            if (typeof config === 'string') return document.createTextNode(config);

            if (config.tag) {
                dom = document.createElement(config.tag);
                for (var prop in config) {
                    if (config.hasOwnProperty(prop)) {
                        if (prop === 'content' || prop === 'tag') continue;
                        if (prop === 'key' && refs) {
                            var key = config[prop];
                            if (key) {
                                refs[key] = dom;
                            }
                            continue;
                        }
                        dom[prop] = config[prop];
                    }
                }
                var content = config.content;
                if (content) {
                    if (typeof content === 'string') {
                        childElement = document.createTextNode(content);
                        dom.appendChild(childElement);
                    } else {
                        if (!(content instanceof Array)) {
                            content = [content];
                        }
                        for (var i = 0, j = content.length; i < j; i++) {
                            var child = content[i];
                            childElement = create(child, refs);
                            dom.appendChild(childElement);
                        }
                    }
                }

            }
            return dom;
        };

        return create;
    }();

    return {
        on: event.on,
        off: event.off,
        once: event.once,
        getStyle: style.getStyle,
        setStyle: style.setStyle,
        removeClass: clazz.removeClass,
        addClass: clazz.addClass,
        hasClass: clazz.hasClass,
        create: create
    };

})))