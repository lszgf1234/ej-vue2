<template>
  <div class="common-popcard" @mouseenter="show" @mouseleave="hide">
    <slot name="img"/>
    <div class="position">
      <div ref="position" :style="style" class="box-postcard bg-white">
        <div class="item item-title">
          <span v-if="imgUrl" :style="{backgroundImage: `url(${imgUrl})`}" class="card-img" ></span>
          <img v-else src="../../assets/icon-account.svg" class="card-img img-def">
          <a :href="href" class="user-name">{{title}}</a>
          <slot name="action"/>
        </div>
        <slot name="main"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'EjPopcard',

    props: {
      imgUrl: {
        type: String,
      },
      href: {
        type: String,
        default: 'javascript:',
      },
      title: {
        type: String,
      },
      width: {
        type: Number,
        default: 272,
      },
    },

    data () {
      return {
        style: {visibility: 'hidden'},
        timer: null,
      }
    },

    mounted () {
      this.setPosition('init')
    },

    methods: {
      show () {
        /*
        * 起点
        * 左下角
        * 右侧展示 默认
        *   默认，左右都展示不开
        *   x + width > clientWidth
        * 左侧展示
        *   右侧展示不开时
        *
        * 下侧展示
        *   默认
        * 上侧展示
        *   下册展示不开
        *
        * */
        if (this.timer) {
          window.clearTimeout(this.timer)
          this.timer = null
        }
        this.setPosition()
      },
      hide () {
        this.timer = window.setTimeout(() => {
          this.style.visibility = 'hidden'
          window.clearTimeout(this.timer)
          this.timer = null
        }, 300)
      },
      setPosition (init) {
        let style = {
          width: `${this.width}px`,
          visibility: init === 'init' ? 'hidden' : 'unset',
        }
        let elOffsets = this.$el.getBoundingClientRect()
        let documentElement = document.documentElement
        if (elOffsets.x + this.width > documentElement.clientWidth) {
          style.right = 0
        } else {
          style.left = 0
        }

        let positionOffsets = this.$refs.position.getBoundingClientRect()
        if (positionOffsets.height + elOffsets.y + elOffsets.height > documentElement.clientHeight) {
          style.top = `${-(elOffsets.height + positionOffsets.height)}px`
        } else {
          style.top = 0
        }

        this.style = style
      },
    },
  }
</script>

<style lang="scss">
  .common-popcard {
    display: inline-block;

    .position {
      position: relative;
    }

    .box-postcard {
      padding: 10px 20px;
      position: absolute;
      top: 0;
      width: 0;
      z-index: 100;
      color: #666;
      box-shadow: 0 2px 6px 3px rgba(0, 0, 0, 0.1);
    }

    .item {
      padding: 5px 0;
      height: 20px;
      display: flex;
      align-items: center;
    }

    .card-img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-size: cover;
    }

    .img-def {
      width: 16px;
    }

    .user-name {
      font-size: 14px;
      color: #477de9;
      margin-left: 5px;
      flex: 1;
    }
  }
</style>
