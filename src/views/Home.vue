<template>
  <div class="home">
    <Header/>
    <div :class="['icon-container']">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#989797" width="20%" height="20%"><path d="M0 0h24v24H0z" fill="none"/><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zm-3-7V3.5L18.5 9H13z"/></svg>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'

export default {
  name: 'Home',
  components: {
    Header
  }
}
</script>
<style scoped lang="scss">
.icon-container{
  margin: auto;
  width: 100%;
  height: 100%;
  margin-top: 100px;
svg{
  margin: auto;
  display: flex;
}
}
</style>
