<template>
  <div :class="['home']">
    <Header/>
    <div :class="['main-container']">
      <toolsSidebar/>
      <div :class="['icon-container']">
        <img :src="require('@/assets/img/new_file.svg')"/>
      </div>
      <editText/>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import toolsSidebar from '@/components/toolsSidebar/toolsSidebar.vue'
import editText from '@/components/editSidebar/editText.vue'

export default {
  name: 'Home',
  components: {
    Header,
    toolsSidebar,
    editText
  }
}
</script>
<style scoped lang="scss">
.main-container{
  display: flex;
  .icon-container{
    margin: auto;
    width: 50%;
    height: 100%;
    margin-top: 100px;
    svg{
      margin: auto;
      display: flex;
    }
  }
}
</style>
