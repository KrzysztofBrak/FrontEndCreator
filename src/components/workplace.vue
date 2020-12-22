<template>
  <section
    :class="['workplace-container']"
    id="workplace"
    :style="workplaceStyle"
  >
    <p>workplace</p>
  </section>
</template>

<script>

export default {
  name: 'Workplace',
  data: () => ({
    workplaceStyle:{
      width: '1920px',
      height: '1080px'
    }
  }),

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.workplace-container{
  background: white;
  box-shadow: $mainShadow;
  height: 500px;
  margin: 60px;
  p{
    font-size: 16px;
  }
}
</style>
