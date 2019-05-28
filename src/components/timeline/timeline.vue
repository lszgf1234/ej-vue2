<template>
  <div class="timeline-view">
    <el-timeline>
      <el-timeline-item v-for="(item, key) in dataList"
                        :key="key"
                        :color="item.color"
                        :timestamp="item.timestamp"
                        placement="top">
        <div>
          <div v-if="!hasMore(item)" class="title">
            <span class="text">{{item.title}}</span>
          </div>
          <div v-else :class="{active: item.show}">
            <div class="title">
              <a href="javascript:" class="text" @click="show(item, key)">
                <span>{{item.title}}</span>
                <i class="el-icon-arrow-down icon"></i>
              </a>
            </div>
            <transition @before-enter="filterBeforeEnter" @enter="filterEnter" @leave="filterLeave">
              <div v-show="item.show" class="more-box">
                <div class="desc mb-xs">{{item.desc}}</div>
                <div v-for="(itemChild, index) in (item.files || [])" :key="index" class="mb-xs">
                  <a :href="itemChild.href" class="download">
                    <ej-icon :icon="getIcon(itemChild.type)" class="icon-file"/>
                    <span class="text">{{itemChild.name}}</span>
                    <span class="size">{{sizeTo(itemChild.size)}}</span>
                  </a>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
  import {Timeline, TimelineItem} from 'element-ui'

  import {formatDate, sizeTo} from '../../utils'
  import Icon from '../icon'

  // TODO: 这里需要和具体业务设计同步
  const typeList = [
    {value: 1, text: '文档', icon: 'textfile'},
    {value: 2, text: '压缩文件', icon: 'folder'},
    {value: 3, text: '图片', icon: 'image'},
  ]

  export default {
    name: 'EjTimeline',

    components: {
      [Timeline.name]: Timeline,
      [TimelineItem.name]: TimelineItem,
      [Icon.name]: Icon,
    },

    props: {
      data: {
        type: Array,
        default: () => [],
      },
      descending: {
        type: Boolean,
        default: false,
      },
    },

    data () {
      return {
        dataList: [],
      }
    },

    watch: {
      data () {
        this.initStatus()
      },
      descending () {
        this.initStatus()
      },
    },

    created () {
      this.initStatus()
    },

    methods: {
      hasMore (item) {
        return (item.desc || (item.files || []).length)
      },

      show (item, index) {
        item.show = !item.show
        this.$set(this.dataList, index, item)
      },

      filterBeforeEnter (el) {
        el.style.height = 0
      },

      filterEnter (el) {
        el.style.height = el.scrollHeight !== 0 ? el.scrollHeight + 'px' : 0
      },

      filterLeave (el) {
        el.style.height = 0
      },

      initStatus () {
        if (this.dataList.length) {
          this.dataList = []
        }
        this.data.forEach(item => {
          item.show = false
          item.timestamp = formatDate(item.timestamp)
          this.dataList.push(item)
        })
        this.dataList.sort((a, b) => {
          return !this.descending ? (new Date(a.timestamp) - new Date(b.timestamp)) : (new Date(b.timestamp) - new Date(a.timestamp))
        })
      },

      getIcon (type) {
        let str
        typeList.forEach(item => {
          if (item.value === type) {
            str = item.icon
          }
        })
        return str
      },

      sizeTo (val) {
        return sizeTo(val)
      },
    },
  }
</script>

<style lang="scss">
  .timeline-view {
    .icon {
      margin-left: 5px;
    }

    a, a:hover, a:active {
      color: theme('colors.gray.darkest');
    }

    .icon {
      transition: all .1s ease-in-out;
    }

    .active {
      .icon {
        transform: rotate(180deg);
      }
    }

    .more-box {
      overflow: hidden;
      transition: all .3s ease-in-out;
    }

    .download {
      display: inline-flex;
      align-items: center;
      color: theme('colors.blue.default');

      .text {
        margin: 0 10px 0 5px;
      }

      .icon-file {
        width: 12px;
        height: 12px;
        color: theme('colors.gray.default');
      }
    }

    .download:hover, .download:active {
      color: theme('colors.blue.default');
      text-decoration: underline;
    }
  }
</style>

<style lang="scss">
  .timeline-view {
    .el-timeline-item__wrapper {
      top: 0;
    }

    .el-timeline-item__timestamp.is-top {
      padding-top: 0;
    }
  }
</style>
