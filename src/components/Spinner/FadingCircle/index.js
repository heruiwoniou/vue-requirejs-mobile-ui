define(['./../common', '__component__', 'text!./tpl.html'], function(common, component, template) {
    return component('cs-fading-circle', {
        template: template,
        mixins: [common],
        created: function() {
            this.styleNode = document.createElement('style');
            var css = ".circle-color-" + this._uid + " > div::before { background-color: " + this.spinnerColor + "}; }";

            this.styleNode.type = 'text/css';
            this.styleNode.rel = 'stylesheet';
            this.styleNode.title = 'fading circle style';
            document.getElementsByTagName('head')[0].appendChild(this.styleNode);
            this.styleNode.appendChild(document.createTextNode(css));
        },

        destroyed: function() {
            if (this.styleNode) {
                this.styleNode.parentNode.removeChild(this.styleNode);
            }
        }
    });
})