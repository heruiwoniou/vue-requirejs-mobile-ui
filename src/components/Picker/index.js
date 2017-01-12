define(['__component__', './PickerSlot/index', 'text!./tpl.html'], function(component, PickerSlot, template) {
    return component('cs-picker', {
        template: template,
        componentName: 'picker',
        props: {
            slots: {
                type: Array
            },
            showToolbar: {
                type: Boolean,
                default: false
            },
            visibleItemCount: {
                type: Number,
                default: 5
            },
            valueKey: String,
            rotateEffect: {
                type: Boolean,
                default: false
            }
        },
        created: function() {
            this.$on('slotValueChange', this.slotValueChange);
            var slots = this.slots || [];
            this.values = [];
            var values = this.values;
            var valueIndexCount = 0;
            slots.forEach(function(slot) {
                if (!slot.divider) {
                    slot.valueIndex = valueIndexCount++;
                    values[slot.valueIndex] = (slot.values || [])[slot.defaultIndex || 0];
                }
            });
        },

        methods: {
            slotValueChange: function() {
                this.$emit('change', this, this.values);
            },

            getSlot: function(slotIndex) {
                var slots = this.slots || [];
                var count = 0;
                var target;
                var children = this.$children.filter(function(child) { return child.$options.name === 'picker-slot'; });

                slots.forEach(function(slot, index) {
                    if (!slot.divider) {
                        if (slotIndex === count) {
                            target = children[index];
                        }
                        count++;
                    }
                });

                return target;
            },
            getSlotValue: function(index) {
                var slot = this.getSlot(index);
                if (slot) {
                    return slot.value;
                }
                return null;
            },
            setSlotValue: function(index, value) {
                var slot = this.getSlot(index);
                if (slot) {
                    slot.currentValue = value;
                }
            },
            getSlotValues: function(index) {
                var slot = this.getSlot(index);
                if (slot) {
                    return slot.mutatingValues;
                }
                return null;
            },
            setSlotValues: function(index, values) {
                var slot = this.getSlot(index);
                if (slot) {
                    slot.mutatingValues = values;
                }
            },
            getValues: function() {
                return this.values;
            },
            setValues: function(values) {
                var slotCount = this.slotCount;
                values = values || [];
                if (slotCount !== values.length) {
                    throw new Error('values length is not equal slot count.');
                }
                values.forEach(function(value, index) {
                    this.setSlotValue(index, value);
                }.bind(this));
            }
        },

        computed: {
            values: function() {
                var slots = this.slots || [];
                var values = [];
                slots.forEach(function(slot) {
                    if (!slot.divider) values.push(slot.value);
                });

                return values;
            },
            slotCount: function() {
                var slots = this.slots || [];
                var result = 0;
                slots.forEach(function(slot) {
                    if (!slot.divider) result++;
                });
                return result;
            }
        },

        components: {
            PickerSlot: PickerSlot
        }
    });
})