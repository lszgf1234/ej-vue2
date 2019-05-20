<template>
  <dl class="ej-info-list flex-wrap" :class="{flex: columns$ > 1}">
    <div v-for="(it, idx) of data"
         :key="idx"
         class="ej-info-item flex-auto flex items-center"
         :style="{width: columnWidth}">
      <dt class="ej-info-item__name flex-none clearfix">
        <span class="label float-left">{{it.name}}</span>
        <span class="separator float-left">{{separator}}</span>
      </dt>
      <dd class="ej-info-item__value flex-none">{{it.value}}</dd>
    </div>
    <div v-for="n of spaces" class="flex-auto" :style="{width: columnWidth}"></div>
  </dl>
</template>

<script>
  export default {
    name: 'EjInfoList',

    props: {
      data: {
        type: Array,
        require: true,
      },
      columns: {
        type: [Number, String],
        default: 1,
        validator: val => +val >= 1,
      },
      separator: {
        type: String,
        default: '：',
      },
    },

    computed: {
      columns$ () {
        return +this.columns
      },
      columnWidth () {
        return this.columns$ > 1 ? 100 / this.columns$ + '%' : undefined
      },
      spaces () {
        return this.columns$ > 1
          ? this.columns$ - (this.data.length % this.columns$ || this.columns$)
          : 0
      },
    },

    watch: {
      separator (val) {
        console.log(`"${val}"`)
      },
    },
  }
</script>
