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
            <div class="title form-group-sm">
              <a class="text " href="javascript:" @click="show(item, key)">
                <span>{{item.title}}</span>
                <i class="el-icon-arrow-down icon"></i>
              </a>
            </div>
            <transition @before-enter="filterBeforeEnter" @enter="filterEnter" @leave="filterLeave">
              <div v-show="item.show" class="more-box">
                <div class="desc form-group-xs">{{item.desc}}</div>
                <div class="form-group-xs" v-for="(itemChild, index) in item.files" :key="index"><a
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
        dataList: [],
      }
    },
    created () {
      for (let item of this.data) {
        item.show = false
        this.dataList.push(item)
      }
    },
    methods: {
      hasMore (item) {
        return (item.desc || item.files.length)
      },
      show (item, index) {
        item.show = !item.show
        this.dataList.splice(index, 1, item)
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
    },
  }
</script>

<style lang="scss">
  /*$color_333: #333;*/
  .timeline-view {
    .form-group {
      margin-bottom: 20px;
    }

    .form-group-sm {
      margin-bottom: 10px;
    }

    .form-group-xs {
      margin-bottom: 5px;
    }
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
