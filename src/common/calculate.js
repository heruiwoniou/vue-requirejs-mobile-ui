define(function() {
    var __scale__ = 320 / 750;
    return {
        toRem: function(number) {
            return (number * __scale__ / 12) + 'rem';
        }
    }
})