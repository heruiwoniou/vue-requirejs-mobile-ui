define(function() {
    var getCurCss = function(el) {
        var view;
        if (window.getComputedStyle) {
            view = el.ownerDocument.defaultView;
            if (!view || !view.opener) {
                view = window;
            }
            return view.getComputedStyle(el);
        } else {
            return el.currentStyle;
        }
    }

    return function(el) {
        do {
            var css = getCurCss(el);
            if (css.display == 'none' || css.visibility == 'hidden' || css.opacity == '0') return false;
        } while ((el = el.parentNode) && el.ownerDocument)
        return true;
    }

})