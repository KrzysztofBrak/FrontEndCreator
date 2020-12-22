<template>
  <div :class="['home']">
    <Header/>
    <div :class="['main-container']">
      <toolsSidebar/>


      <div v-show="!isProjectActive"
        :class="['icon-container']">
        <img :src="require('@/assets/img/new_file.svg')"/>
      </div>
      <workplace  v-show="isProjectActive"/>


      <editText/>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import toolsSidebar from '@/components/toolsSidebar/toolsSidebar.vue'
import editText from '@/components/editSidebar/editText.vue'
import workplace from '@/components/workplace.vue'

import{mapGetters} from 'vuex'
import panzoom from 'panzoom'
export default {
  name: 'Home',
  components: {
    Header,
    toolsSidebar,
    editText,
    workplace
  },
  computed:{
    ...mapGetters(['getProjectName',
      'getActualZoom'
    ]),
  },

  watch:{
    getProjectName(){
      this.isProjectActive = true
    }
  },
  data: () => ({
    isProjectActive: false,
  }),
  mounted(){
    // just grab a DOM element
    const element = document.querySelector('#workplace')

    // And pass it to panzoom
    let instance = panzoom(element, {

      // allow wheel-zoom only if altKey is down. Otherwise - ignore
      beforeWheel: function(e) {
        const shouldIgnore = !e.altKey;
        return shouldIgnore;
      },

      // allow mouse-down panning only if altKey is down. Otherwise - ignore
      beforeMouseDown: function(e) {
        const shouldIgnore = !e.altKey;
        return shouldIgnore;
      },
      maxZoom: 3,
      minZoom: 0.5,
      initialZoom: this.getActualZoom,
      zoomSpeed: 0.99,
      zoomDoubleClickSpeed: 1,
    });

    instance.on('zoom', function() {
      console.log(instance.getTransform().scale);
    });

  }
}
</script>
<style scoped lang="scss">
.main-container{
  display: flex;
  height: 100vh;
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
