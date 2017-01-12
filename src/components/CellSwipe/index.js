define(['__component__', './../Cell/index', './clickoutside', 'wind-dom', 'text!./tpl.html'], function(component, csCell, Clickoutside, WindDom, template) {
    var once = WindDom.once;
    return component('cs-cell-swipe', {
        template: template,
        components: { csCell: csCell },
        directives: { Clickoutside: Clickoutside },

        props: {
            to: String,
            left: Array,
            right: Array,
            icon: String,
            title: String,
            label: String,
            isLink: Boolean,
            value: {}
        },

        data: function() {
            return {
                start: { x: 0, y: 0 }
            };
        },

        mounted: function() {
            this.wrap = this.$refs.cell.$el.querySelector('.cs-cell-wrapper');
            this.leftElm = this.$refs.left;
            this.rightElm = this.$refs.right;
            this.leftWrapElm = this.leftElm.parentNode;
            this.rightWrapElm = this.rightElm.parentNode;
            this.leftWidth = this.leftElm.getBoundingClientRect().width;
            this.rightWidth = this.rightElm.getBoundingClientRect().width;

            this.leftDefaultTransform = this.translate3d(-this.leftWidth - 1);
            this.rightDefaultTransform = this.translate3d(this.rightWidth);

            this.rightWrapElm.style.webkitTransform = this.rightDefaultTransform;
            this.leftWrapElm.style.webkitTransform = this.leftDefaultTransform;
        },

        methods: {
            translate3d: function(offset) {
                return "translate3d(" + offset + "px, 0, 0)";
            },

            swipeMove: function(offset) {
                offset = offset || 0;
                this.wrap.style.webkitTransform = this.translate3d(offset);
                this.rightWrapElm.style.webkitTransform = this.translate3d(this.rightWidth + offset);
                this.leftWrapElm.style.webkitTransform = this.translate3d(-this.leftWidth + offset);
                this.swiping = true;
            },

            swipeLeaveTransition: function(direction) {
                setTimeout(function() {
                    this.swipeLeave = true;

                    // left
                    if (direction > 0 && -this.offsetLeft > this.rightWidth * 0.4) {
                        this.swipeMove(-this.rightWidth);
                        this.swiping = false;
                        this.opened = true;
                        return;
                        // right
                    } else if (direction < 0 && this.offsetLeft > this.leftWidth * 0.4) {
                        this.swipeMove(this.leftWidth);
                        this.swiping = false;
                        this.opened = true;
                        return;
                    }

                    this.swipeMove(0);
                    once(this.wrap, 'webkitTransitionEnd', function() {
                        this.wrap.style.webkitTransform = '';
                        this.rightWrapElm.style.webkitTransform = this.rightDefaultTransform;
                        this.leftWrapElm.style.webkitTransform = this.leftDefaultTransform;
                        this.swipeLeave = false;
                        this.swiping = false;
                    }.bind(this));
                }.bind(this), 0);
            },

            startDrag: function(evt) {
                evt = evt.changedTouches ? evt.changedTouches[0] : evt;
                this.dragging = true;
                this.start.x = evt.pageX;
                this.start.y = evt.pageY;
            },

            onDrag: function(evt) {
                if (this.opened) {
                    !this.swiping && this.swipeMove(0);
                    this.opened = false;
                    return;
                }
                if (!this.dragging) return;
                var swiping;
                var e = evt.changedTouches ? evt.changedTouches[0] : evt;
                var offsetTop = e.pageY - this.start.y;
                var offsetLeft = this.offsetLeft = e.pageX - this.start.x;

                if ((offsetLeft < 0 && -offsetLeft > this.rightWidth) ||
                    (offsetLeft > 0 && offsetLeft > this.leftWidth) ||
                    (offsetLeft > 0 && !this.leftWidth) ||
                    (offsetLeft < 0 && !this.rightWidth)) {
                    return;
                }

                var y = Math.abs(offsetTop);
                var x = Math.abs(offsetLeft);

                swiping = !(x < 5 || (x >= 5 && y >= x * 1.73));
                if (!swiping) return;
                evt.preventDefault();

                this.swipeMove(offsetLeft);
            },

            endDrag: function() {
                if (!this.swiping) return;
                this.swipeLeaveTransition(this.offsetLeft > 0 ? -1 : 1);
            }
        }
    })
})