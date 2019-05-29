<template>
  <div class="ej-search-conditions">
    <dl class="ej-search-conditions__item flex">
      <dt class="ej-search-conditions__title text-gray-darkest">已选条件</dt>
      <search-tag :options="searchList" @close="toggleActive"/>
    </dl>

    <dl v-for="(item, index) in conditionsList"
        :key="index"
        class="ej-search-conditions__item flex">
      <dt class="ej-search-conditions__title text-gray-darkest">{{item.label}}</dt>

      <component  v-if="item.isTemplate"
                  :is="item.isTemplate"
                  v-model="item.model"
                  :options="item.valueList"
                  :conditions-key="item.value"
                  @cascaderChange="cascaderChange"
                  @toggle="toggleActive"
      />
    </dl>
  </div>
</template>

<script>
  import SearchTag from './search-tag'
  import CascaderItem from './cascader-item'
  import ConditionsItem from './conditions-item'

  const CascaderOptions = [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }]

  export default {
    name: 'EjSearchConditions',

    components: {
      SearchTag,
    },

    data () {
      return {
        conditionsList: [],
      }
    },

    props: {
      options: {
        type: Array,
        default: () => ([])
      },
      cascaderKeys: {
        type: Array,
        default: () => ([])
      },
    },

    computed: {
      // 搜索列表
      searchList () {
        let arr = [];
        this.conditionsList.forEach(item => {
          // model 默认为单选
          if (item.model && item.model.length) {
            arr.push({
              pValue: item.value,
              pLabel: item.label,
              value: item.model.join(','),
              label: item.labels.join('/ ')
            })
          } else {
            // 查找选中的条件
            arr.push(...item.valueList.filter(citem => {
                return citem.active === true
              }).map(citem => {
                // 增加父级信息
                return Object.assign(citem, {
                  pValue: item.value,
                  pLabel: item.label,
                })
              })
            )
          }
        })
        return arr
      },
    },

    methods: {
      // 处理父级传下来的参数
      handlerOptions (options = []) {
        this.conditionsList =  options.map(item => {
          console.log(this.cascaderKeys.indexOf(item.value))
          return Object.assign(item, {
            // CascaderItem 联级选择器
            // ConditionsItem 默认
            isTemplate: this.cascaderKeys.indexOf(item.value) !== -1 ? CascaderItem : ConditionsItem
          })
        })
        
      },
      // 联级选择器
      cascaderChange (conditionsKey, val, labels) {
        let cascaderOptions = this.findConditionItem(this.conditionsList, conditionsKey)
        cascaderOptions.model = val;
        cascaderOptions.labels = labels;
      },
      
      // 切换选中状态
      toggleActive (conditionsKey, itemKey) {
        let itemList = this.findConditionItem(this.conditionsList, conditionsKey)
        // model 取消事件 置空
        if (itemList.model && itemList.model.length) {
          this.$set(itemList, 'model', [])
          this.$set(itemList, 'labels', [])
        }
        // 切换状态
        let itemObj = this.findConditionItem(itemList.valueList, itemKey)
        if (itemObj) {
          this.$set(itemObj, 'active', !itemObj.active)
        }
      },

      // 根据key寻找item
      findConditionItem (list = [], key) {
        return list.find(item => {
          return item.value === key
        })
      },
    },

    watch: {
      options: {
        handler (newVal) {
          this.handlerOptions(newVal)
        },
        deep: true,
        immediate: true
      },

      searchList (newVal) {
        this.$emit('change', newVal)
      }
    }
  }
</script>

<style lang="scss">
  @import './variables.scss';
  .ej-search-conditions {
    &__title {
      white-space: nowrap;
      line-height: $search-conditions-height;
      margin-right: $search-conditions-height;
    }

    &__item {
      margin-bottom: 10px;
    }
  }
</style>
