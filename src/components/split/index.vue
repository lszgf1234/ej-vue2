<template>
  <div :class="splitClassName" ref="split-box" >

    <div class="ej-split-left" :style="styleComputed">
      <slot name="left" />
    </div>

    <div class="split-line" 
      draggable="true" 
      @dragstart="handleDragSplitLineStart"
      @dragend="handleDragSplitLineEnd"
      @drag="handleDragSplitLine"
      @dragover="ev => ev.preventDefault()">
      <slot name="split-line">
        <div class="split-line-default">
          <span>
            <i :class="{'el-icon-caret-right': mode === 'horizontal', 'el-icon-caret-bottom': mode === 'vertical'}"></i>
          </span>
        </div>
      </slot>
    </div>

    <div class="ej-split-right">
      <slot name="right" />
    </div>

  </div>
</template>

<script>
  import {throttle} from 'lodash-es'

  // 空图片替换幽灵快照
  const voidEl = document.createElement('img')
  voidEl.src = require('./assets/void.png')

  export default {
    name: 'EjSplit',

    props: {
      mode: {
        type: String,
        default: () => 'horizontal'
      },

      split: {
        type: String | Number,
        default: () => 0.5,
      },

      min: {
        type: Number,
        default: () => 50,
      },

      max: {
        type: Number,
        default: () => 50,
      },
    },

    data() {
      return {
        splitTrans: this.split,
      }
    },

    computed: {
      styleComputed() {
        const mode = this.mode

        // 转义split
        let splitTrans = this.splitTrans
        splitTrans = typeof splitTrans === 'number' ? `${splitTrans * 100}%` : splitTrans
        
        let sty = mode === 'vertical' ? {
          height: splitTrans
        } : {
          width: splitTrans
        }

        return sty
      },

      splitClassName() {
        return {
          'ej-split': true, 
          'ej-split-vertical': this.mode === 'vertical',
          'ej-split-horizontal': this.mode === 'horizontal',
        }
      }
    },

    methods: {
      // 开始拖动
      handleDragSplitLineStart(ev) {
        ev.dataTransfer.setDragImage(voidEl, 0, 0)
        
        this.$emit('move-start')
      },

      // 结束拖动
      handleDragSplitLineEnd(ev) {
        this.$emit('move-end')
      },

      // 开始移动
      handleDragSplitLine(ev) {
        const mode = this.mode
        const boxDOM = this.$refs['split-box']

        // 最大宽高
        const {offsetWidth, offsetHeight} = boxDOM
        // 当前位置
        const newPosX = ev.clientX - boxDOM.offsetLeft
        const newPosY = ev.clientY - boxDOM.offsetTop
        // 阈值
        const min = this.min, max = this.max

        // 判断边距
        if(newPosX > offsetWidth - max || newPosY > offsetHeight - max || newPosX < min || newPosY < min) return
        
        this.splitTrans = `${mode === 'vertical' ? newPosY : newPosX}px`
        this.$emit('moving', ev)
      },

    },
  }
</script>

<style lang="scss">
  .ej-split{
    @apply flex;
    height: 100%;

    >*{
      @apply overflow-auto flex-shrink-0;

      &.ej-split-right{
        @apply flex-grow;
      }
    }

    // 分割线
    .split-line{
      @apply relative overflow-visible;

      .split-line-default{
        background: #dcdee2;

        span{
          @apply absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          background: #d0e2ff;
          border-radius: 2px;
          box-shadow: 0px 0px 4px 0px rgba(214,237,255,0.5); 
          color: #0C64EB;
          text-align: center;
          font-size: 6px;
        }
      }
    }

    // horizontal样式
    &.ej-split-horizontal{
      
      >.ej-split-right{
        width: 0;
      }

      // 分割线
      >.split-line{
        cursor: col-resize;
        height: 100%;

        >.split-line-default{
          width: 1px;
          height: 100%;

          >span{
            width: 10px;
            height: 45px;
            line-height: 45px;
          }
        }
      }
    }

    // vertical样式
    &.ej-split-vertical{
      @apply flex-col;

      >.ej-split-right{
        height: 0;
      }

      // 分割线
      >.split-line{
        cursor: row-resize;

        >.split-line-default{
          width: 100%;
          height: 1px;

          >span{
            width: 45px;
            height: 10px;
            line-height: 10px;
          }
        }
      }
    }
  }
</style>