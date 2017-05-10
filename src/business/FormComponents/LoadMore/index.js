define(function() {
    return function module(moduleName) {
        return {
            data: function() {
                return {
                    list:10,
                    loadingBottom:false
                }
            },
            methods: {
               loadBottom:function(){
                   setTimeout(function(){
                       this.list+=5;
                        this.$refs.loadmorebottom.onBottomLoaded();
                   }.bind(this),2000);
                   
               }
            }
        }
    }
})