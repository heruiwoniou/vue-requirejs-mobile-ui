var fs = require('fs');
var __config__ = require('./../dist/config');
var base = {
    appDir: '../dist',
    baseUrl: "./",
    dir: '../pack',
    fileExclusionRegExp: "^(r|b)\.js|.*\.less$",
    removeCombined: true,
    optimize: "uglify",
    uglify: {
        ascii_only: true,
        beautify: true
    },
    optimizeCss: "none", //"standard",
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
        ],
        exclude: [
            'store/index',
            'router/index'
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

var spawn = require('child_process').spawn;

free = spawn('node', ['node_modules/requirejs/bin/r.js', '-o', 'build/b.js']);

// 捕获标准输出并将其打印到控制台 
free.stdout.on('data', function(data) {
    console.log('standard output:\n' + data);
});
// 捕获标准错误输出并将其打印到控制台 
free.stderr.on('data', function(data) {
    console.log('standard error output:\n' + data);
});
// 注册子进程关闭事件 
free.on('exit', function(code, signal) {
    fs.unlinkSync('build/b.js');
    console.log('child process eixt ,exit:' + code);
});