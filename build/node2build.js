var fs = require('fs');
var __config__ = require('./../dist/config');
var base = {
    appDir: '../dist',
    baseUrl: "./",
    dir: '../pack',
    fileExclusionRegExp: "^(r|b)\.js|.*\.less$",
    removeCombined: true,
    paths: {
        'libs': "libs",
        'vue': 'libs/vue/vue',
        'vuex': 'libs/vuex/vuex',
        'vue-router': 'libs/vue-router/vue-router',
        'jquery': "libs/jquery/jquery",
        'fastclick': "libs/fastclick/fastclick",
        '__module__': 'common/__module__',
        '__component__': 'common/__component__',
        '__install__': 'common/__install__',
        '__store__factory__': 'common/__store__factory__',
        'detector': 'common/detector',
        'calc': 'common/calculate',
        'emitter': 'common/mixins/emitter'
    },
    map: {
        '*': {
            'text': 'libs/require-text/text'
        }
    },
    modules: [{
        name: 'entrance',
        include: [
            '__module__',
            '__store__factory__',
            'libs/es6-promise/promise',
            'jquery',
            'vue',
            'vue-router',
            'detector',
            'calc',
            'fastclick',
            'libs/require-text/text',
            'store/transition'
        ]
    }]
}
base.modules[0].include = base.modules[0].include.concat(__config__.map(o => {
    return 'store/modules/' + o.name;
}));
base.modules[0].include = base.modules[0].include.concat(__config__.map(o => {
    return 'business/' + o.name.replace(/^[\w]/, function(m) { return m.toLocaleUpperCase() }) + '/index';
}));
fs.writeFileSync('build/b.js', '(' + JSON.stringify(base) + ')');