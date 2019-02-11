;
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? module.exports = factory()
    : (global.__config__ = factory())
})(this, function () {
  var __config__ = {
    // 规则说明
    /**
         * route : 路由名称
         * *path: 模块路径
         * *store: 开启了store(必须有相应的store文件)
         * *sync: 未指定的业务模块将会做为异步加载
         */
    modules: [
      {
        route: '/',
        path: 'Login',
        store: true,
        sync: true
      }, {
        route: '/Main',
        path: 'Main',
        sync: true
      }, {
        route: '/Main/JSComponents',
        path: 'JSComponents',
        sync: true
      }, {
        route: '/Main/JSComponents/Toast',
        path: 'JSComponents/Toast'
      }, {
        route: '/Main/JSComponents/Indicator',
        path: 'JSComponents/Indicator'
      }, {
        route: '/Main/JSComponents/MessageBox',
        path: 'JSComponents/MessageBox'
      }, {
        route: '/Main/JSComponents/ActionSheet',
        path: 'JSComponents/ActionSheet'
      }, {
        route: '/Main/JSComponents/Picker',
        path: 'JSComponents/Picker'
      }, {
        route: '/Main/JSComponents/DateTimePicker',
        path: 'JSComponents/DateTimePicker'
      }, {
        route: '/Main/JSComponents/Popup',
        path: 'JSComponents/Popup'
      }, {
        route: '/Main/CSSComponents',
        path: 'CSSComponents',
        sync: true
      }, {
        route: '/Main/FormComponents',
        path: 'FormComponents',
        sync: true
      }, {
        route: '/Main/FormComponents/Switch',
        path: 'FormComponents/Switch'
      }, {
        route: '/Main/FormComponents/CheckList',
        path: 'FormComponents/CheckList'
      }, {
        route: '/Main/FormComponents/Tab',
        path: 'FormComponents/Tab'
      }, {
        route: '/Main/FormComponents/LoadMore',
        path: 'FormComponents/LoadMore'
      }, {
        route: '/Main/FormComponents/Field',
        path: 'FormComponents/Field'
      }
    ],
    map: function (dispose) {
      return this
        .modules
        .map(dispose)
    },
    each: function (dispose) {
      return this
        .modules
        .forEach(dispose)
    },
    dynamic: function (store) {
      (new Function(store)).apply(window)
    }
  }

  /* 以下为 ES5 补充方法 及公用方法*/
  var firstChart = /^[\w]/
  /**设置字符串手字母大写 */
  String.prototype.toUpperFirstCase = function () {
    return this.replace(firstChart, function (m) {
      return m.toLocaleUpperCase()
    })
  }

  if (typeof Object.assign !== 'function') {
    Object.assign = function (target) {
      'use strict'
      if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object')
      }

      target = Object(target)
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index]
        if (source != null) {
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key]
            }
          }
        }
      }
      return target
    };
    Object.defineProperties
      ? Object.defineProperties(Object, {
        assign: {
          enumerable: false
        }
      })
      : undefined
  }

  return __config__
})
