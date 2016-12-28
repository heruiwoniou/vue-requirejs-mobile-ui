define(['require', 'component'].dispose('tpl'), function(require, component) {
    var scroll;
    return component('cs-container', {
        data: function() {
            return {
                count: 5
            }
        },
        mounted: function() {
            var that = this;
            $(this.$el).on('click', 'p', function() { that.count += 5; })
        },
        destoryed: function() {

        }
    }, require)
})