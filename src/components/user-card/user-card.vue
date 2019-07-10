<template>
  <div class="ej-card" @mouseenter="show" @mouseleave="hide">
    <slot name="img"/>
    <div class="position">
      <div ref="position" :style="style" class="box-postcard bg-white">
        <div class="flex mb-sm">
          <div>
            <div v-if="data.userAvatar" :style="{backgroundImage: `url(${data.userAvatar})`}"
                 class="card-img card-svg"></div>
            <img v-else src="../../assets/icon-account.svg" class="card-img img-def">
          </div>
          <div class="flex-1 ml-sm item-height">
            <div class="text-blue mb-xs flex items-center">
              <span class="flex-1">{{data.name}}（{{data.position}}）</span>
              <a v-if="hasEmail" href="javascript:" @click="mail"><i class="el-icon-message text-2xl"></i></a>
            </div>
            <div class="mb-xs flex items-center item-height">
              <img src="../../assets/icons/icon-id.svg" class="icon-id">
              <span class="ml-sm">{{data.jobNumber}}</span>
            </div>
            <div class="mb-xs flex items-center item-height">
              <img src="../../assets/icons/icon-job.svg" class="icon-job">
              <span class="ml-sm">{{data.phone}}</span>
            </div>
            <div class="flex items-center item-height">
              <ej-icon icon="phone" class="icon-job"></ej-icon>
              <span class="ml-sm">{{data.telephone}}</span>
            </div>
          </div>
        </div>
        <div class="mb-xs flex items-center item-height">
          <i class="el-icon-message text-lg"></i>
          <span class="ml-sm mr-lg">{{data.email}}</span>
          <a href="javascript:" @click="copy(data.email)"><i class="el-icon-document-copy"></i></a>
        </div>
        <div class="mb-xs flex items-center item-height">
          <i class="el-icon-menu text-lg"></i>
          <span class="ml-sm">{{data.department}}</span>
        </div>
        <div class="flex items-center item-height">
          <i class="el-icon-location-information text-lg"></i>
          <span class="ml-sm">{{data.userAddress}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Clipboard from 'clipboard'

  import Message from '../../utils/message'
  import Icon from '../icon'

  export default {
    name: 'EjUserCard',

    components: {
      [Icon.name]: Icon,
    },

    props: {
      data: {
        type: Object,
        default: () => ({}),
      },
      hasEmail: {
        type: Boolean,
        default: false,
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
          visibility: init === 'init' ? 'hidden' : 'inherit',
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
      mail () {
        this.$emit('mail')
      },
      copy (text) {
        const clipboard = new Clipboard(event.target, {
          text: () => text,
        })
        clipboard.on('success', () => {
          // 成功
          Message.MessageSuccess({messageSuccessText: '复制成功'})
          clipboard.off('error')
          clipboard.off('success')
          clipboard.destroy()
        })
        clipboard.on('error', () => {
          Message.MessageError({messageSuccessText: '复制失败，请重试！'})
          clipboard.off('error')
          clipboard.off('success')
          clipboard.destroy()
        })
      },
    },
  }
</script>

<style lang="scss">
  .ej-card {
    display: inline-block;

    .position {
      position: relative;
    }

    .box-postcard {
      height: 185px;
    }

    .box-postcard {
      padding: 15px;
      position: absolute;
      width: 318px;
      top: 5px;
      z-index: 100;
      color: theme('colors.gray.darker');
      box-shadow: 0 2px 6px 3px rgba(0, 0, 0, 0.1);
    }

    .card-img, .img-def {
      width: 80px;
      height: 80px;
    }

    .card-svg {
      background-size: cover;
      background-repeat: no-repeat;
      background-position-y: center;
    }

    .icon-svg {
      fill: theme('colors.gary.darker');
      width: 15px;
      height: 15px;
    }

    .icon-mail {
      width: 20px;
      height: 16px;
      fill: theme('colors.blue.default');
    }

    .icon-copy {
      width: 12px;
      height: 16px;
      fill: theme('colors.blue.light');
    }

    .item-height {
      height: 15px;
      line-height: 15px;
    }

    .icon-job {
      width: 16px;
      height: 15px;
    }

  }
</style>
