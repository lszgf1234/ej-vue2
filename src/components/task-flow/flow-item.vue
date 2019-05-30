<template>
  <div class="ej-flow-item" :class="'flow-'+data.type">
    <div class="left">
      <ej-popcard :img-url="data.user_img" :title="data.title">
        <template slot="img">
          <div class="circle mb-sm">
            <ej-icon v-if="data.type === 'error'" icon="close" class="circle-icon"/>
            <ej-icon v-else-if="data.type === 'starting'" icon="more" class="circle-icon"/>
            <ej-icon v-else icon="check" class="circle-icon"/>
          </div>
        </template>
        <template slot="action">
          <a v-if="data.type === 'starting'"
             href="javascript:"
             class="ml-xs text-blue"
             @click="press">催一下</a>
        </template>
        <template slot="main">
          <ej-info-list :data="infoList" class="mt-xs">
            <template slot="name" slot-scope="row">
              <div class="name-self">
                <span class="name-self-text">{{row.item.value}}</span>
                <a v-if="row.item.user_id" href="javascript:" @click="email">
                  <ej-icon icon="mail" class="icon-email"/>
                </a>
              </div>
            </template>
          </ej-info-list>
        </template>
      </ej-popcard>
      <div class="title">{{data.title}}</div>
    </div>
    <span v-if="hasNext" class="right">
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
          {name: '操作人', value: this.data.user_name, slotName: 'name'},
          {name: '操作时间', value: this.data.time},
        ],
      }
    },

    methods: {
      press () {
        this.$emit('press', this.data)
      },
      email () {
        this.$emit('email', this.data)
      },
    },
  }
</script>

<style lang="scss">
  .ej-flow-item {
    display: inline-flex;
    margin-bottom: 10px;

    &.flow-starting {
      .circle {
        border-color: theme('colors.yellow.default');
        .circle-icon{
          background: theme('colors.yellow.default');
        }
      }
    }

    &.flow-error {
      .circle {
        border-color: theme('colors.red.default');
        .circle-icon{
          background: theme('colors.red.default');
        }
      }
    }

    &.flow-success {
      .circle {
        border-color: theme('colors.blue.default');
        .circle-icon{
          background: theme('colors.blue.default');
        }
      }

      .icon {
        color: theme('colors.blue.default');
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
      border: 2px solid theme('colors.gray.light');
      padding: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      .circle-icon{
        background: theme('colors.gray.light');
        width: 100%;
        height: 100%;
        border-radius: 50%;
        padding: 5px;
        color: theme('colors.white');
      }
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

    .icon-email {
      color: theme('colors.blue.default');
      width: 18px;
      height: 15px;
    }

    .name-self {
      display: flex;
      flex: 1;
      align-items: center;

      .name-self-text {
        flex: 1;
      }
    }

    .common-popcard .user-name {
      cursor: inherit;
      color: theme('colors.gray.darkest');
    }
  }
</style>
