define(function() {
    var toUpperCase = function(str) {
        return str.replace(/\//g, '_').toLocaleUpperCase();
    }

    return function(content, params) {
        if (params.direction > 0) {
            content.dispatch(toUpperCase(params.to) + '_IN_RIGHT');
            content.dispatch(toUpperCase(params.from) + '_OUT_LEFT');
        } else if (params.direction < 0) {
            content.dispatch(toUpperCase(params.to) + '_IN_LEFT');
            content.dispatch(toUpperCase(params.from) + '_OUT_RIGHT');
        } else {
            if (params.to == params.from && params.to == '/') {
                content.dispatch(toUpperCase(params.to) + '_FADE');
            } else if (params.to == '/') {
                content.dispatch(toUpperCase(params.to) + '_IN_TOP');
                content.dispatch(toUpperCase(params.from) + '_OUT_BOTTOM');
            } else {
                content.dispatch(toUpperCase(params.to) + '_IN_BOTTOM');
                content.dispatch(toUpperCase(params.from) + '_OUT_TOP');
            }
        }
    }
})