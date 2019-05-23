<template>
  <div class="ej-flow-chart" :class="'flow-'+type">
    <div class="left">
      <div class="circle form-group-sm" v-if="!hasPopcard"></div>
      <ej-popcard :img-url="data.user_img" :title="data.user_name" v-else>
        <template slot="img">
          <div class="circle form-group-sm"></div>
        </template>
        <template slot="action">
          <slot name="action"></slot>
        </template>
        <template slot="main">
          <slot name="main"></slot>
        </template>
      </ej-popcard>
      <div class="title">{{data.title}}</div>
    </div>
    <span class="right" v-if="hasNext">
        <ej-icon icon="right" class="icon"/>
      </span>
  </div>
</template>

<script>
  import Icon from '../icon'
  import Popcard from '../popcard'

  /*
    // 支持的类型解释
    const orderTypeList = [
      {value: 'wait', text: '未开始'},
      {value: 'starting', text: '进行中'},
      {value: 'error', text: '驳回'},
      {value: 'success', text: '已完成'},
    ]
    */

  export default {
    name: 'EjFlowChart',
    components: {
      [Icon.name]: Icon,
      [Popcard.name]: Popcard,
    },
    props: {
      data: {
        type: Object,
      },
      hasNext: {
        type: Boolean,
      },
      type: {
        type: String,
        default: '',
      },
      hasPopcard: {
        type: Boolean,
        default: false,
      },
    },
  }
</script>

<style lang="scss">
  .form-group-sm {
    margin-bottom: 10px;
  }

  .ej-flow-chart {
    display: inline-flex;
    margin-bottom: 10px;

    &.flow-starting {
      .circle {
        background: theme('colors.yellow.default');
      }
    }

    &.flow-error {
      .circle {
        background: theme('colors.red.default');
      }
    }

    &.flow-success {
      .circle {
        background: theme('colors.green.default');
      }

      .icon {
        color: theme('colors.green.default');
      }
    }

    .left {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .circle {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: theme('colors.gray.light');
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .title {
      height: 17px;
      line-height: 17px;
      font-size: theme('fontSize.sm');
      color: theme('colors.gray.darker');
    }

    .right {
      height: 30px;
      display: flex;
      align-items: center;
      margin-left: 30px;
    }

    .icon {
      width: 20px;
      color: theme('colors.gray.light');
    }
  }
</style>
