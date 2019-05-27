<template>
  <div class="ej-info-list clearfix">
    <ul v-if="!isVertical" class="h-list">
      <li class="info-item" v-for="(item, key) in dataList" :key="key" :style="{width: width}">
        <div class="info-detail">
          <span class="label">{{item.name}}</span>
          <span>：</span>
          <slot v-if="item.slotName" :name="item.slotName" :item="item">
            <span class="text">{{item.value}}</span>
          </slot>
          <slot name="item" v-else :item="item">
            <span class="text" >{{item.value}}</span>
          </slot>
        </div>
      </li>
    </ul>
    <ul class="v-list" v-else>
      <li class="info-item" v-for="(item, key) in dataList" :key="key" :style="{width: width}">
        <div v-for="(itemChild, keyChild) in item" :key="keyChild">
          <div class="info-detail">
            <span class="label">{{itemChild.name}}</span>
            <span>：</span>
            <slot v-if="itemChild.slotName" :name="itemChild.slotName" :item="itemChild">
              <span class="text">{{itemChild.value}}</span>
            </slot>
            <slot name="item" v-else :item="itemChild">
              <span class="text" >{{itemChild.value}}</span>
            </slot>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

  /*
  * 默认时 横排 单栏
  * */
  export default {
    name: 'EjInfoList',
    props: {
      data: {
        type: Array,
      },
      columns: {
        type: [Number, null],
        default: 1,
      },
      isVertical: {
        type: Boolean,
        default: () => false,
      },
    },
    data () {
      return {
        dataList: [],
        width: '100%',
      }
    },
    watch: {
      columns () {
        this.init()
      },
      isVertical () {
        this.init()
      },
    },
    created () {
      this.init()
    },
    methods: {
      init () {
        this.dataList.length && (this.dataList = [])
        if (this.isVertical) {
          console.log(2222)
          // 如果为竖排 ,分组，设置每组宽度
          this.width = `${100 / this.columns}%`
          let data = this.data
          let size = Math.ceil(data.length / this.columns)
          for (let page = 1; page <= this.columns; page++) {
            this.dataList.push(data.slice((page - 1) * size, page * size))
          }
        } else {
          // 如果为横排 设置每个宽度
          this.dataList = this.data
          this.width = `${100 / this.columns}%`
        }
      },
    },
  }
</script>

<style lang="scss">
  .ej-info-list {
    * {
      box-sizing: border-box;
    }

    ul {
      margin: 0;
      padding: 0;
    }

    .h-list, .v-list {
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
    }

    .v-list.info-item, .info-detail{
      padding-bottom: 5px;
    }

    .hasline{
      border-right:1px solid #ddd ;
    }

    .info-detail {
      display: flex;
      span {
        line-height: 20px;
      }

      .label {
        line-height: 20px;
        overflow: hidden;
        text-align: justify;
      }
    }
  }
</style>
