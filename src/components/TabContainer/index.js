define(['__component__', 'wind-dom', 'text!./tpl.html'], function(component, windDom, template) {
    var once = windDom.once,
        arrayFindIndex = function(arr, predicate, ctx) {
            if (typeof Array.prototype.findIndex === 'function') {
                return arr.findIndex(predicate, ctx);
            }

            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }

            var list = Object(arr);
            var len = list.length;

            if (len === 0) {
                return -1;
            }

            for (var i = 0; i < len; i++) {
                if (predicate.call(ctx, list[i], i, list)) {
                    return i;
                }
            }

            return -1;
        };
    return component('cs-tab-container', {
        template: template,

        props: {
            value: {},
            swipeable: Boolean,
            tabbar: Boolean
        },

        data: function() {
            return {
                start: { x: 0, y: 0 },
                swiping: false,
                activeItems: [],
                pageWidth: 0,
                currentActive: this.value
            };
        },

        watch: {
            value: function(val) {
                this.currentActive = val;
            },

            currentActive: function(val, oldValue) {
                this.$emit('input', val);
                if (!this.swipeable) return;
                var lastIndex = arrayFindIndex(this.$children,
                    function(item) { return item.id === oldValue }.bind(this));
                this.swipeLeaveTransition(lastIndex);
            }
        },

        mounted: function() {
            if (!this.swipeable) return;

            this.wrap = this.$refs.wrap;
            this.pageWidth = this.wrap.clientWidth;
            this.limitWidth = this.pageWidth / 4;
        },

        methods: {
            swipeLeaveTransition: function(lastIndex) {
                lastIndex = lastIndex || 0;
                if (typeof this.index !== 'number') {
                    this.index = arrayFindIndex(this.$children,
                        function(item) { return item.id === this.currentActive }.bind(this));
                    this.swipeMove(-lastIndex * this.pageWidth);
                }

                setTimeout(function() {
                    this.wrap.classList.add('swipe-transition');
                    this.swipeMove(-this.index * this.pageWidth);

                    once(this.wrap, 'webkitTransitionEnd', function() {
                        this.wrap.classList.remove('swipe-transition');
                        this.wrap.style.webkitTransform = '';
                        this.swiping = false;
                        this.index = null;
                    }.bind(this));
                }.bind(this), 0);
            },

            swipeMove: function(offset) {
                this.wrap.style.webkitTransform = "translate3d(" + offset + "px, 0, 0)";
                this.swiping = true;
            },

            startDrag: function(evt) {
                evt = evt.changedTouches ? evt.changedTouches[0] : evt;
                this.dragging = true;
                this.start.x = evt.pageX;
                this.start.y = evt.pageY;
            },

            onDrag: function(evt) {
                if (!this.dragging) return;
                var swiping;
                var e = evt.changedTouches ? evt.changedTouches[0] : evt;
                var offsetTop = e.pageY - this.start.y;
                var offsetLeft = e.pageX - this.start.x;
                var y = Math.abs(offsetTop);
                var x = Math.abs(offsetLeft);

                swiping = !(x < 5 || (x >= 5 && y >= x * 1.73));
                if (!swiping) return;
                evt.preventDefault();

                var len = this.$children.length - 1;
                var index = arrayFindIndex(this.$children,
                    function(item) { return item.id === this.currentActive }.bind(this));
                var currentPageOffset = index * this.pageWidth;
                var offset = offsetLeft - currentPageOffset;
                var absOffset = Math.abs(offset);

                if (absOffset > len * this.pageWidth ||
                    (offset > 0 && offset < this.pageWidth)) {
                    this.swiping = false;
                    return;
                }

                this.offsetLeft = offsetLeft;
                this.index = index;
                this.swipeMove(offset);
            },

            endDrag: function() {
                if (!this.swiping) return;

                var direction = this.offsetLeft > 0 ? -1 : 1;
                var isChange = Math.abs(this.offsetLeft) > this.limitWidth;

                if (isChange) {
                    this.index += direction;
                    var child = this.$children[this.index];
                    if (child) {
                        this.currentActive = child.id;
                        return;
                    }
                }

                this.swipeLeaveTransition();
            }
        }
    })
});