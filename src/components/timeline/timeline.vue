<template>
  <div class="timeline-view">
    <el-timeline>
      <el-timeline-item
        v-for="(item, key) in dataList"
        :key="key"
        :color="item.color"
        :timestamp="item.timestamp"
        placement="top"
      >
        <div>
          <div class="title" v-if="!hasMore(item)">
            <span class="text">{{item.title}}</span>
          </div>
          <div :class="{active: item.show}" v-else>
            <div class="title mb-sm">
              <a class="text " href="javascript:" @click="show(item, key)">
                <span>{{item.title}}</span>
                <i class="el-icon-arrow-down icon"></i>
              </a>
            </div>
            <transition @before-enter="filterBeforeEnter" @enter="filterEnter" @leave="filterLeave">
              <div v-show="item.show" class="more-box">
                <div class="desc mb-xs">{{item.desc}}</div>
                <div class="mb-xs" v-for="(itemChild, index) in (item.files || [])" :key="index">
                  <a class="download" :href="itemChild.href">
                    <ej-icon :icon="getIcon(itemChild.type)" class="icon-file"/>
                    <span class="text">{{itemChild.name}}</span>
                    <span class="size">{{itemChild.size | sizeTo}}</span>
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
  import Vue from 'vue'
  import {Timeline, TimelineItem} from 'element-ui'

  import Icon from '../icon'
  import mixins from '../../mixins'
  import {formatDate} from '../../utils'

  const typeList = [
    {value: 1, text: '文档', icon: 'textfile'},
    {value: 2, text: '压缩文件', icon: 'folder'},
    {value: 3, text: '图片', icon: 'image'},
  ]

  export default {
    name: 'EjTimeline',
    mixins: [mixins.filters],
    components: {
      [Timeline.name]: Timeline,
      [TimelineItem.name]: TimelineItem,
      [Icon.name]: Icon,
    },
    props: {
      data: {
        type: Array,
        default: () => []
      },
    },
    data () {
      return {
        dataStatus: [],
        dataList: [],
      }
    },
    watch: {
      data () {
        this.initStatus()
      }
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
        if (this.dataStatus.length) {
          this.dataStatus = []
        }
        this.data.forEach(item => {
          this.dataStatus.push(false)
          item.show = false
          item.timestamp = formatDate(item.timestamp)
          this.dataList.push(item)
        })
      //  排序 this.dataList
      },
      getIcon (type) {
        let str;
        typeList.forEach(item => {
          if (item.value === type) {
            str = item.icon
          }
        })
        return str
      }
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
