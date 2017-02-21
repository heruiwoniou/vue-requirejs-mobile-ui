define(function() {
    return function module(moduleName) {
        return {
            data: function() {
                return {
                    active: 'tab-container1',
                    list: [
                        1, 2, 3, 4, 5, 6
                    ],
                    loading: false,
                    loadingBottom: false,
                    topStatus: '',
                    bottomStatus: '',
                }
            },
            computed: {
                //反转列表
                rlist: function() {
                    var arr = [];
                    for (var i = 0; i < this.list.length; i++) {
                        arr.unshift(this.list[i]);
                    }
                    return arr;
                },
            },
            methods: {
                loadMore: function() {
                    this.loading = true;
                    setTimeout(function() {
                        var last = this.list[this.list.length - 1];
                        for (var i = 1; i <= 2; i++) {
                            this.list.push(last + i);
                        }
                        this.loading = false;
                    }.bind(this), 2500);
                },
                loadTop: function() {
                    setTimeout(function() {
                        var last = this.list[this.list.length - 1];
                        for (var i = 1; i <= 2; i++) {
                            this.list.push(last + i);
                        }
                        this.$refs.loadmoretop.onTopLoaded();
                    }.bind(this), 2500);
                },

                loadBottom: function() {
                    setTimeout(function() {
                        var last = this.list[this.list.length - 1];
                        for (var i = 1; i <= 2; i++) {
                            this.list.push(last + i);
                        }
                        this.$refs.loadmorebottom.onBottomLoaded();
                    }.bind(this), 2500);
                },

            }
        }
    }
})