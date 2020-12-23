<template>
  <section :class="['editSidebar-section']">
    <ItemPosition/>
    <v-fade-transition>
      <EditText transition="fade-transition" v-show="getTextSelected"/>
    </v-fade-transition>
  </section>
</template>

<script>
import{mapGetters} from 'vuex'

import ItemPosition from '@/components/sidebarContent/itemPosition.vue'
import EditText from '@/components/sidebarContent/editText.vue'

export default {
  name: 'editSidebar',
  components:{
    ItemPosition,
    EditText
  },
  computed:{
    ...mapGetters(['getTextSelected']),
  },
  // data: () => ({
  //  items: [0.5, 0.75, 1, 1.5, 2, 2.5, 3],
  //  selectedZoom:''
  // }),
  // computed:{
  //   ...mapGetters(['getActualZoom']),
  // },
  // watch:{
  //   selectedZoom(){
  //     this.setActualZoom(this.selectedZoom)
  //   }
  // },
  // mounted(){
  //   this.selectedZoom = this.getActualZoom
  // },
  // methods:{
  //   ...mapMutations(['setActualZoom'])
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .editSidebar-section{
    z-index: 1;
    height: 100%;
    width: 300px;
    background: $containerBackground;
    box-shadow: $mainShadow;
    position: fixed;
    top: 50px;
    bottom: 0;
    right: 0;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
</style>
