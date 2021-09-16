<template>
  <div class="overflow-hidden" style="height: 56px">
    <ej-nav-bar-ellipsis
      :data="dataList"
      theme="dark"
      trigger="hover"
      arrow
      :default-active="defaultActive"
      @select="select"
    />
  </div>

</template>

<script>
export default {
  name: "base",
  data() {
    return {
      defaultActive: '2-1',
      dataList: [
        {
          title: 'Dashboard',
          hide: false,
          meta: {
            index: '1'
          },
          icon: 'search',
          children: [
            {
              title: '分析页',
              icon: 'search',
              meta: {
                index: '1-1'
              },
            },
          ]
        },
        {
          title: '表单页',
          hide: false,
          path: '2',
          meta: {
            index: '2'
          },
          children: [
            {
              title: '基础表单',
              hide: false,
              path: '2.1',
              meta: {
                index: '2-1'
              },
            },
            {
              title: '分步表单',
              hide: false,
              path: '2.2',
            },
            {
              title: '高级表单',
              hide: false,
              path: '2.3',
            }
          ]
        },
        {
          title: '列表页',
          hide: false,
          path: '3',
        },
        {
          title: '详情页',
          hide: false,
          disabled: true,
          path: '5',
        }
      ],
    };
  },
  methods: {
    select(item, index, indexPath, event) {
      console.log(item, index, indexPath, event)
    }
  },
}
</script>

<style lang="scss">
.adapter-wrap {
  //background: blue;
  //height: 100vh;
}
</style>
