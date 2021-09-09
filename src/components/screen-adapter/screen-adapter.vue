<template>
  <div
    class="ScreenAdapter"
    :style="style"
  >
    <slot />
  </div>
</template>
<script>
function debounce (fn, t) {
  const delay = t || 500
  let timer
  return function() {
    const args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    // eslint-disable-next-line @typescript-eslint
    const context = this
    timer = setTimeout(() => {
      timer = null
      fn.apply(context, args)
    }, delay)
  }
}

export default {
  name: 'ScreenAdapter',
  //参数注入
  props: {
    width: {
      type: Number,
      default: 1920,
    },
    height: {
      type: Number,
      default: 1080,
    },
    delay: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      style: {
        width: this.width + 'px',
        height: this.height + 'px',
        transform: 'scale(1) translate(-50%, -50%)'
      }
    }
  },
  mounted() {
    this.setScale()
    window.addEventListener('resize', this.setScaleDebounce)
  },
  destroyed() {
    window.removeEventListener('resize', this.setScaleDebounce)
  },
  methods: {
    // 获取放大缩小比例
    getScale() {
      // 实际宽度 除以 设计宽度
      // 实际高度 除以 设计高度
      const w = window.innerWidth / this.width
      const h = window.innerHeight / this.height
      return w < h ? w : h
    },
    // 设置比例
    setScale() {
      this.style.transform = 'scale(' + this.getScale() + ') translate(-50%, -50%)'
      console.log('任你千变万化,我都不会影响性能')
    },
    // 去抖
    setScaleDebounce: debounce(function (){
      this.setScale()
    })
  }
}
</script>
<style lang="scss" scoped>
.ScreenAdapter {
  transform-origin: 0 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transition: 0.3s;
  background: red;
}
</style>
