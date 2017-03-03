;
define(function() {
    var toUpperCase = function(str) {
        return str.replace(/\//g, '_').toLocaleUpperCase();
    }

    function PathPool() {
        this.pool = []
    }

    PathPool.prototype.path = function(router) {
        for (var i = this.pool.length - 1; i >= 0; i--) {
            if (this.pool[i] == router.to) {
                this.pool.splice(i);
                return true;
            }
        }
        this.pool.push(router.from);
        return false;
    }

    var pathPool = new PathPool();;

    return function(content, params) {
        if (params.direction > 0) {

            if (params.from == '/') {
                content.dispatch(toUpperCase(params.to) + '_IN_BOTTOM');
                content.dispatch(toUpperCase(params.from) + '_OUT_TOP');
            } else {
                //从高级跳至低级
                content.dispatch(toUpperCase(params.to) + '_IN_RIGHT');
                content.dispatch(toUpperCase(params.from) + '_OUT_LEFT');
            }
        } else if (params.direction < 0) {
            //从低级跳至高级
            if (params.to == '/') {
                //从低级跳至子节点
                content.dispatch(toUpperCase(params.to) + '_IN_TOP');
                content.dispatch(toUpperCase(params.from) + '_OUT_BOTTOM');
            } else {
                //其它
                if (params.from == '/') {
                    content.dispatch(toUpperCase(params.to) + '_IN_TOP');
                    content.dispatch(toUpperCase(params.from) + '_OUT_BOTTOM');
                }
                content.dispatch(toUpperCase(params.to) + '_IN_LEFT');
                content.dispatch(toUpperCase(params.from) + '_OUT_RIGHT');
            }
        } else {
            if (params.to == params.from) {
                //如果是第一次加载页面并是在根目录加载
                content.dispatch(toUpperCase(params.to) + '_FADE');
            } else if (pathPool.path(params)) {
                //如果目标页面是上次跳转过来的页面  侧进行从上往下滑
                content.dispatch(toUpperCase(params.to) + '_IN_TOP');
                content.dispatch(toUpperCase(params.from) + '_OUT_BOTTOM');
            } else {
                //同级加载从下往上滑
                content.dispatch(toUpperCase(params.to) + '_IN_BOTTOM');
                content.dispatch(toUpperCase(params.from) + '_OUT_TOP');
            }
        }
    }
})