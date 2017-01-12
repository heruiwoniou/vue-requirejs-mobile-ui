define(function(types) {
    var types = {
        TOP_LAYER: 'TOP_LAYER',
        BOTTOM_LAYER: 'BOTTOM_LAYER',

        SLIDE_LEFT: 'SLIDE_LEFT',
        SLIDE_RIGHT: 'SLIDE_RIGHT',
        SLIDE_BOTTOM: 'SLIDE_BOTTOM',
        SLIDE_TOP: 'SLIDE_TOP',
        FADE: 'FADE',
    }

    function ModuleStore(module) {
        module = module.toLocaleUpperCase() + '_';
        this.state = {
            transitionName: 'fade',
            topLayer: false
        };
        //mutations
        this.mutations = {};

        this.mutations[module + types.TOP_LAYER] = function(state) {
            state.topLayer = true;
        }

        this.mutations[module + types.BOTTOM_LAYER] = function(state) {
            state.topLayer = false;
        }

        this.mutations[module + types.SLIDE_LEFT] = function(state) {
            state.transitionName = "slide-left";
        };
        this.mutations[module + types.SLIDE_RIGHT] = function(state) {
            state.transitionName = "slide-right";
        };
        this.mutations[module + types.SLIDE_BOTTOM] = function(state) {
            state.transitionName = "slide-bottom";
        };
        this.mutations[module + types.SLIDE_TOP] = function(state) {
            state.transitionName = "slide-top";
        };
        this.mutations[module + types.FADE] = function(state) {
            state.transitionName = "fade";
        };
        //actions
        this.actions = {};
        this.actions[module + 'OUT_LEFT'] = function(content) {
            content.commit(module + types.SLIDE_LEFT);
            content.commit(module + types.BOTTOM_LAYER);
        };
        this.actions[module + 'IN_LEFT'] = function(content) {
            content.commit(module + types.SLIDE_LEFT);
            content.commit(module + types.BOTTOM_LAYER);
        };
        this.actions[module + 'OUT_RIGHT'] = function(content) {
            content.commit(module + types.SLIDE_RIGHT);
            content.commit(module + types.TOP_LAYER);
        };
        this.actions[module + 'IN_RIGHT'] = function(content) {
            content.commit(module + types.SLIDE_RIGHT);
            content.commit(module + types.TOP_LAYER);
        };
        this.actions[module + 'OUT_BOTTOM'] = function(content) {
            content.commit(module + types.SLIDE_BOTTOM);
            content.commit(module + types.BOTTOM_LAYER);
        };
        this.actions[module + 'IN_BOTTOM'] = function(content) {
            content.commit(module + types.SLIDE_BOTTOM);
            content.commit(module + types.TOP_LAYER);
        };
        this.actions[module + 'OUT_TOP'] = function(content) {
            content.commit(module + types.SLIDE_TOP);
            content.commit(module + types.TOP_LAYER);
        };
        this.actions[module + 'IN_TOP'] = function(content) {
            content.commit(module + types.SLIDE_TOP);
            content.commit(module + types.TOP_LAYER);
        };
        this.actions[module + 'FADE'] = function(content) {
            content.commit(module + types.FADE);
            content.commit(module + types.TOP_LAYER);
        };
    };
    return function(modue) { return new ModuleStore(modue); }
})