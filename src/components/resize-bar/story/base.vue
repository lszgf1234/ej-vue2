<template>
  <div class="demo-wrapper">
    <header
      class="demo-header bg-red"
      :style="{ height: headerHeight + 'px' }"
    >
      {{ headerHeight }}px
    </header>
    <resize-bar
      v-model="headerHeight"
      :min="120"
      :max="256"
      :size="20"
      horizontal
      class="resize-bar-self"
    >
    </resize-bar>
    <main class="demo-main flex h-64">
      <section
        class="demo-main-left bg-green"
        :style="{ width: leftWidth + 'px' }"
      >
        {{ leftWidth }}px
      </section>
      <resize-bar
        v-model="leftWidth"
        :min="96"
        :max="356"
        :size="size"
      ></resize-bar>
      <section class="demo-main-middle flex-1 bg-yellow">
        Auto
      </section>
      <resize-bar
        v-model="rightWidth"
        :min="96"
        :max="156"
        :size="size"
        reversed
      ></resize-bar>
      <section
        class="demo-main-right bg-red"
        :style="{ width: rightWidth + 'px' }"
      >
        {{ rightWidth }}px
      </section>
    </main>
    <resize-bar
      v-model="footerHeight"
      :min="96"
      :max="156"
      :size="size"
      reversed
      horizontal
    ></resize-bar>
    <footer class="demo-footer bg-green" :style="{ height: footerHeight + 'px' }">
      {{ footerHeight }}px
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      size: 4,
      headerHeight: 120,
      leftWidth: 120,
      rightWidth: 120,
      footerHeight: 96,
    }
  },
}
</script>
<style lang="scss">
/**
自定义拉伸条样式
*/
.resize-bar-self {
  width: 20px !important;
  background: blue;
}
</style>
