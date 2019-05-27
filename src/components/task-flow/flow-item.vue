<template>
  <div class="ej-flow-item" :class="'flow-'+data.type">
    <div class="left">
      <ej-popcard :img-url="data.user_img" :title="data.title">
        <template slot="img">
          <div class="circle form-group-sm"></div>
        </template>
        <template slot="action">
          <a href="javascript:" @click="email"><ej-icon icon="mail" class="icon-email"/></a>
          <a class="ml-xs text-blue" href="javascript:" @click="press" v-if="data.type==='starting'">催一下</a>
        </template>
        <template slot="main">
          <ej-info-list :data="infoList" class="mt-xs"/>
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
  import InfoList from '../info-list'

  export default {
    name: 'EjFlowItem',
    components: {
      [Icon.name]: Icon,
      [Popcard.name]: Popcard,
      [InfoList.name]: InfoList,
    },
    props: {
      data: {
        type: Object,
      },
      hasNext: {
        type: Boolean,
      },
    },
    data () {
      return {
        infoList: [
          {name: '操作人', value: this.data.user_name},
          {name: '操作时间', value: this.data.time},
        ]
      }
    },
    methods: {
      press () {
        this.$emit('press', this.data)
      },
      email () {
        this.$emit('email', this.data)
      }
    },
  }
</script>

<style lang="scss">
  .form-group-sm {
    margin-bottom: 10px;
  }

  .ej-flow-item {
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
      flex: 1;
      justify-content: center;
    }

    .icon {
      width: 20px;
      color: theme('colors.gray.light');
    }
    .icon-email{
      color: theme('colors.blue.default');
      width: 18px;
      height: 15px;
    }
  }
</style>
