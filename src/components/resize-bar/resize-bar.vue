<template>
  <div
    :class="{
      'resize-bar': true,
      'resize-bar-horizontal': horizontal,
      'resize-bar-vertical': horizontal === false
    }"
    :style="{
      width: horizontal ? '100%' : size + 'px',
      height: horizontal ? size + 'px' : '100%'
    }"
    @mousedown="handleMouseDown"
  >
    <slot>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'ResizeBar',
  model: {
    prop: 'value',
    event: 'resize'
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 1920
    },
    size: {
      type: Number,
      default: 8
    },
    horizontal: {
      type: Boolean,
      default: false
    },
    reversed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isMouseDown: false,
      startPosition: {
        x: 0,
        y: 0
      },
      startValue: 0
    };
  },
  mounted() {
    // 对body监听mousemove mouseup 事件
    document.body.addEventListener('mousemove', this.handleMouseMove);
    document.body.addEventListener('mouseup', this.handleMouseUp);
  },
  destroyed() {
    document.body.removeEventListener('mousemove', this.handleMouseMove);
    document.body.removeEventListener('mouseup', this.handleMouseUp);
  },
  methods: {
    handleMouseMove(e) {
      if (this.isMouseDown) {
        const currentValue = this.horizontal ? e.pageY : e.pageX;
        const startValue = this.horizontal ? this.startPosition.y : this.startPosition.x;
        const value = this.reversed ?
          this.startValue + (startValue - currentValue) :
          this.startValue + (currentValue - startValue);

        if (value >= this.min && value <= this.max) {
          this.$emit('resize', value);
        } else if (value < this.min) {
          this.$emit('resize', this.min);
        } else if (value > this.max) {
          this.$emit('resize', this.max);
        }
      }
    },
    handleMouseDown(e) {
      if (!this.isMouseDown) {
        this.startValue = this.value;
        this.isMouseDown = true;
        this.$set(this.startPosition, 'x', e.pageX);
        this.$set(this.startPosition, 'y', e.pageY);
      }
    },
    handleMouseUp(e) {
      this.isMouseDown = false;
    }
  }
};
</script>
<style lang="scss">
.resize-bar {
  user-select: none;


  &-inner {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    transition: box-shadow .28s;
    box-shadow: 3.1px 2.6px 5.6px .4px rgba(8, 16, 20, .08);

    &:hover {
      box-shadow: 3.1px 2.6px 5.6px .4px rgba(8, 16, 20, .08);
    }

    &::before {
      content: "";
      display: block;
      border: 0 #999 solid;
      background: #999;
      background-clip: content-box;
    }
  }
}

.resize-bar-horizontal {
  display: block;
  cursor: row-resize;
  width: 100%;
  height: 8px;

  .resize-bar-inner {
    flex-direction: column;

    &::before {
      width: 16px;
      height: 1px;
      padding: 2.5px 0;
      border-top-width: 1px;
      border-bottom-width: 1px;
    }
  }
}

.resize-bar-vertical {
  display: inline-block;
  cursor: col-resize;
  width: 8px;
  height: 100%;
}

</style>
