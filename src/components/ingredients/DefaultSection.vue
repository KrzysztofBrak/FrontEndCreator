<template>
  <section :class="['editSidebar-section']">
    <slot name="in-section"></slot>
  </section>
</template>

<script>
export default {
  name: 'DefaultSection',
  data: () => ({

  }),
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .editSidebar-section{
    z-index: -1;
    height: 300px;
    width: 100%;
    background: white;
    box-shadow: $mainShadow;
    position: fixed;
    top: 50px;
    bottom: 0;
    right: 0;
    padding: 15px;
  }
</style>
