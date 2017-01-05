var fs = require('fs');
var __config__ = require('./../dist/config');
var base = {
    appDir: '../' + (process.argv.length >= 3 ? process.argv[2] ? process.argv[2] : '' : 'dist'),
    baseUrl: "./",
    dir: '../' + (process.argv.length >= 4 ? process.argv[3] ? process.argv[3] : '' : 'pack'),
    //fileExclusionRegExp: "^*\.less$",
    removeCombined: true,
    optimize: "uglify",
    uglify: {
        ascii_only: true,
        beautify: true
    },
    optimizeCss: "standard", //"standard",
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
    return 'business/' + o.name.toUpperFirstCase() + '/index';
}));
fs.writeFileSync('build/b.js', '(' + JSON.stringify(base) + ')');

var spawn = require('child_process').spawn;

node2build = spawn('node', ['node_modules/requirejs/bin/r.js', '-o', 'build/b.js']);

node2build.stdout.on('data', function(data) {
    console.log("" + data);
});
node2build.stderr.on('data', function(data) {
    console.log("" + data);
});
node2build.on('exit', function(code, signal) {
    fs.unlinkSync('build/b.js');
    console.log(`打包完成 (返回码 : ${code})`);
});