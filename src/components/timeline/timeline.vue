<template>
  <div class="timeline-view">
    <el-timeline>
      <el-timeline-item
        v-for="(item, key) in data"
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
              <div v-show="dataStatus[key]" class="more-box">
                <div class="desc mb-xs">{{item.desc}}</div>
                <div class="mb-xs" v-for="(itemChild, index) in item.files" :key="index"><a
                  :href="itemChild.href">{{itemChild.name}}</a></div>
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

  export default {
    name: 'EjTimeline',
    components: {
      [Timeline.name]: Timeline,
      [TimelineItem.name]: TimelineItem,
    },
    props: {
      data: {
        type: Array,
      },
    },
    data () {
      return {
        dataStatus: [],
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
        return (item.desc || item.files.length)
      },
      show (item, index) {
        this.dataStatus.splice(index, 1, !this.dataStatus[index])
      },
      filterBeforeEnter (el) {
        el.style.height = 0
      },
      filterEnter (el) {
        console.log(el.scrollHeight)
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
        })
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
    .more-box{
      overflow: hidden;
      transition: all .3s ease-in-out;
    }
  }
</style>
