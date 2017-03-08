var fs = require('fs');
var cp = require('child_process');
var __config__ = require('./../dist/config');
var fromdir = (process.argv.length >= 3 ? process.argv[2] ? process.argv[2] : '' : 'dist');
var todir = (process.argv.length >= 4 ? process.argv[3] ? process.argv[3] : '' : 'pack')
var base = {
    appDir: '../' + fromdir,
    baseUrl: "./",
    dir: '../' + todir,
    //fileExclusionRegExp: "^*\.less$",
    removeCombined: true,
    optimize: "uglify2",
    uglify: {
        ascii_only: true,
        beautify: true,
        preserveComments: false
    },
    uglify2: {
        output: {
            ascii_only: true,
            beautify: false,
            comments: false
        }
    },
    optimizeCss: "standard", //"standard",
    paths: {
        'libs': "libs",
        'vue': 'libs/vue/vue',
        'vuex': 'libs/vuex/vuex',
        'vue-router': 'libs/vue-router/vue-router',
        'vue-popup': 'libs/vue-popup/index',
        'jquery': "libs/jquery/jquery",
        'fastclick': "libs/fastclick/fastclick",
        'wind-dom': 'libs/wind-dom/index',
        '__module__': 'common/__module__',
        '__component__': 'common/__component__',
        '__install__': 'common/__install__',
        '__store__factory__': 'common/__store__factory__',
        'detector': 'common/detector',
        'calc': 'common/calculate',
        'emitter': 'common/mixins/emitter',
        'clickoutside': 'common/utils/clickoutside',
        'isvisible': 'common/utils/isvisible',
        'install': 'components/install'
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

function filter(arr, fun) {
    var arr = []
    arr.forEach(o => {
        if (fun(o)) {
            arr.push(o);
        }
    });
    return arr;
}
base.modules[0].include = base.modules[0].include.concat(filter(__config__, o => o.store).map(o => {
    return 'store/modules/' + o.path + '/store';
}));
base.modules[0].include = base.modules[0].include.concat(__config__.map(o => {
    return 'business/' + o.path + '/index';
}));

base.modules[0].include = base.modules[0].include.concat(__config__.map(o => {
    return 'libs/require-text/text!business/' + o.path + '/tpl.html';
}))

fs.writeFileSync('build/b.js', '(' + JSON.stringify(base) + ')');

var spawn = cp.spawn;
var exec = cp.exec;

node2build = spawn('node', ['node_modules/requirejs/bin/r.js', '-o', 'build/b.js']);

node2build.stdout.on('data', function(data) {
    console.log("" + data);
});
node2build.stderr.on('data', function(data) {
    console.log("" + data);
});
node2build.on('exit', function(code, signal) {
    fs.unlinkSync('build/b.js');
    //合并代码
    var entrance = fs.readFileSync(todir + '/entrance.js', 'utf-8');
    var router = fs.readFileSync(todir + '/router/index.js', 'utf-8');
    router = router.replace(/(define\()(t,function)/, '$1\"router/index\",$2');
    var store = fs.readFileSync(todir + '/store/index.js', 'utf-8');
    store = store.replace(/(define\()(e,function)/, '$1\"store/index\",$2');
    entrance = entrance.replace(/(define\("application")/, router + store + '$1');
    var config = fs.readFileSync(todir + '/config.js', 'utf-8');
    entrance = config + entrance;
    exec('rm -rf ' + todir + '/store');
    exec('rm -rf ' + todir + '/router');
    exec('rm ' + todir + '/build.txt');
    exec('rm ' + todir + '/config.js');
    fs.writeFileSync(todir + '/entrance.js', entrance);

    //处理html
    var html = fs.readFileSync(todir + '/index.html', 'utf-8');
    html = html.replace('\r\n<script src="config.js"></script>', "");
    fs.writeFileSync(todir + '/index.html', html)
    console.log(`打包完成 (返回码 : ${code})`);
});