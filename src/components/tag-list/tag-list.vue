<template>
  <div class="ej-tag-list">
    <tag-item v-for="(tag, idx) in internalTags"
              :key="tag.name"
              v-bind="tag"
              @mouseenter="$emit('tag-mouseenter', {_index: idx, ...tag})"
              @mouseleave="$emit('tag-mouseleave', {_index: idx, ...tag})"
              @score-change="change => onTagScoreChange(idx, change)"
              @remove="removeTag(idx)"/>
    <div class="add-wrap">
      <el-tooltip popper-class="tag-add-btn-popper" effect="dark" content="添加标签" placement="bottom">
        <a class="new-tag-button" @click="inputVisible = true"></a>
      </el-tooltip>
      <div v-show="inputVisible" class="new-tag-wrap">
        <el-input ref="saveTagInput"
                  v-model="inputValue"
                  placeholder="写下标签"
                  size="small"
                  class="new-tag-input"
                  @keyup.native="validate"
                  @blur="!inputTrimmed && (inputVisible = false)"/>
        <span class="error-tip">{{errorTip}}</span>
        <i class="new-tag-input-remove" @click="inputVisible = false"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import {Input, Tooltip} from 'element-ui'

  import TagItem from './tag-item.vue'

  export default {
    name: 'EjTagList',

    components: {
      [Input.name]: Input,
      [Tooltip.name]: Tooltip,
      TagItem,
    },

    model: {
      prop: 'tags',
      event: 'change',
    },

    props: {
      tags: {
        type: Array,
        default: () => [],
      },
    },

    data () {
      return {
        inputVisible: false,
        inputValue: '',
        errorTip: '',
      }
    },

    computed: {
      internalTags: {
        get () {
          return this.tags
        },
        set (val) {
          this.$emit('change', val)
        },
      },

      inputTrimmed () {
        return this.inputValue.trim()
      },
    },

    watch: {
      inputVisible (visible) {
        if (visible) {
          this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus()
          })
        } else {
          this.inputValue = ''
          this.errorTip = ''
        }
      },
    },

    methods: {
      removeTag (idx) {
        console.log('Tag to remove:', this.internalTags[idx])
        this.internalTags.splice(idx, 1)
      },

      onTagScoreChange (idx, change) {
        const tag = this.internalTags[idx]
        const newTag = {
          ...tag,
          score: tag.score + change,
          voted: change > 0 ? true : change < 0 ? false : tag.voted,
        }
        this.$set(this.internalTags, idx, newTag)

        const payload = {_index: idx, ...newTag}
        // istanbul ignore else
        if (change > 0) {
          this.$emit('tag-score-up', payload)
        } else if (change < 0) {
          this.$emit('tag-score-down', payload)
        }
      },

      validate (ev) {
        const found = this.inputTrimmed && this.internalTags.find(tag => tag.name === this.inputTrimmed)
        if (found) {
          this.errorTip = '标签已存在'
          return
        }

        this.errorTip = ''

        if (ev.key === 'Enter') {
          this.save()
        }
      },

      save () {
        if (!this.errorTip && this.inputTrimmed) {
          this.internalTags.push({
            name: this.inputTrimmed,
            score: 1,
            voted: true,
            removable: true,
          })
        }

        this.inputVisible = false
      },
    },
  }
</script>

<style lang="scss">
  .ej-tag-list .el-input__inner {
    border: none;
  }

  .el-tooltip__popper {
    &.tag-add-btn-popper {
      padding: 4px 6px;
      line-height: 1.2;
      min-width: 10px;

      &.is-dark {
        background: theme('colors.blue.lighter');
        color: theme('colors.blue.default');
        display: block;
      }

      &[x-placement^=bottom] .popper__arrow {
        top: -6px;
        border-top-width: 0;
        border-bottom-color: theme('colors.blue.lighter');
      }

      &[x-placement^=bottom] .popper__arrow::after {
        top: 1px;
        margin-left: -5px;
        border-top-width: 0;
        border-bottom-color: theme('colors.blue.lighter')
      }
    }
  }
</style>

<style lang="scss">
  .ej-tag-list {
    position: relative;
    display: inline-flex;
    margin-top: 5px;

    .error-tip {
      position: absolute;
      bottom: 4px;
      left: 26px;
      font-size: theme('fontSize.sm');
      color: theme('colors.red.default');
      transform: scale(.8);
    }

    .add-wrap {
      position: relative;
    }

    .new-tag {
      &-button {
        margin-left: 10px;
        width: 18px;
        height: 18px;
        background: url('../../assets/icons/tag-add-btn.svg') no-repeat center;
        display: inline-block;
        vertical-align: top;
        margin-top: 4px;
      }

      &-input {
        width: 180px;
        border: none;
        border-bottom: 2px solid theme('colors.blue.light');
        vertical-align: bottom;
        margin: 0 auto;
      }

      &-input-remove {
        width: 12px;
        height: 12px;
        top: 7px;
        position: absolute;
        right: 7px;
        cursor: pointer;
        background: url('../../assets/icons/tab-input-remove.svg') no-repeat center;
      }

      &-wrap {
        position: absolute;
        top: 27px;
        left: 9px;
        width: 230px;
        padding: 16px 0 20px;
        text-align: center;
        background: theme('colors.white');
        border-radius: 2px;
        box-shadow: 0 2px 4px 2px theme('colors.gray.default');
      }
    }
  }
</style>
