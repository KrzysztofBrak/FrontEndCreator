<template>
  <section :class="['editSidebar-section']">
    <slot name="in-sidebar"></slot>
  </section>
</template>

<script>
export default {
  name: 'editSidebar',
  data () {
    return {
      color: 'red',
      pixels: '1200px'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .editSidebar-section{
    height: 100%;
    width: 300px;
    background: $containerBackground;
    box-shadow: $mainShadow;
    position: fixed;
    top: 50px;
    bottom: 0;
    right: 0;
    padding: 15px;
  }
</style>
