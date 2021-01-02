<template>
  <section
    :class="['workplace-container']"
    id="workplace"
    :style="workplaceStyle"
    @dblclick.self="disactivateAllElements"
  >
    <div v-for="(component, index) in getWorkplaceData.sections"
      :key="index"
      :id="component.id"
      :ref="component.id"
      @dblclick="disactivateSection(component)"
    >
      <component :is="'DefaultSection'"
        :section="component"
        :ref="'sections'"
      ></component>
    </div>
  </section>
</template>

<script>
import DefaultSection from '@/components/ingredients/DefaultSection.vue'

import{mapGetters, mapMutations} from 'vuex'

export default {
  name: 'Workplace',
  components:{
    DefaultSection
  },
  computed:{
    ...mapGetters(['getWorkplaceData','getSectionsLength']),
  },
  data: () => ({
    workplaceStyle:{
      width: '1920px',
      height: '1080px'
    }
  }),
  methods:{
    ...mapMutations(['setWorkplaceActive']),
    disactivateSection(selectedSection){
      // this.getWorkplaceData.sections.forEach(section => {
      //     section.isActive = false;
      // });
      this.getWorkplaceData.sections.forEach(section => {
        console.log(selectedSection.id, section.id);
      if(selectedSection.id !== section.id){

        section.isActive = false;
        section.columns.forEach(column => {
          column.isActive = false
          column.childs.forEach(item => {
            item.isActive = false;
          })
        })
      }
      });


      let sectionIndex = this.getWorkplaceData.sections.findIndex(x => x.id === selectedSection.id);
      this.getWorkplaceData.sections[sectionIndex].isActive = true
    },

    disactivateAllElements(){
      this.getWorkplaceData.sections.forEach(section => {
          section.isActive = false;
          section.columns.forEach(column => {
            column.isActive = false;
            column.childs.forEach(item =>{
              item.isActive = false
            })
          })
      });
       this.setWorkplaceActive(true);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.workplace-container{

  background: white;
  box-shadow: $mainShadow;
  margin: 80px 60px;

  p{
    font-size: 16px;
  }
}
</style>
