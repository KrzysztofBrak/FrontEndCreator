<template>
  <section :class="['editSidebar-section']">
    <v-fade-transition>
      <selectedItemInfo transition="fade-transition"/>
    </v-fade-transition>
    <ItemPosition/>
    <v-fade-transition>
      <EditText transition="fade-transition" v-show="getTextSelected"/>
    </v-fade-transition>

    <v-fade-transition>
      <shapeEdit transition="fade-transition" />
    </v-fade-transition>
  </section>
</template>

<script>
import{mapGetters} from 'vuex'

import ItemPosition from '@/components/sidebarContent/itemPosition.vue'
import EditText from '@/components/sidebarContent/editText.vue'
import shapeEdit from '@/components/sidebarContent/shapeEdit.vue'
import selectedItemInfo from '@/components/sidebarContent/selectedItemInfo.vue'

export default {
  name: 'Sidebar',
  components:{
    ItemPosition,
    EditText,
    shapeEdit,
    selectedItemInfo
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
    flex-direction: column;
    .divider{
      margin: 10px 0;
    }
  }
</style>
