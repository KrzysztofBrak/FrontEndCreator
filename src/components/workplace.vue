<template>
  <section
    :class="['workplace-container']"
    id="workplace"
    :style="{width: this.getWorkplaceData.workplaceWidth}"
    @dblclick.self="disactivateAllElements"
  >
    <div v-for="(component, index) in getWorkplaceData.sections"
      :key="index"
      :id="component.id"
      :ref="component.id"
      @dblclick="disactivateSection(component), setSection(component)"
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
    ...mapGetters(['getWorkplaceData','getSectionsLength', 'getActiveElement', 'getElementToEdit', 'getTtemClicked']),
  },

  data: () => ({

  }),

  methods:{
    ...mapMutations(['setWorkplaceActive', 'setElementToEdit', 'setItemClicked']),

    disactivateSection(selectedSection){
      this.getWorkplaceData.sections.forEach(section => {
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
    },
    setSection(selectedSection){
      let sectionIndex = this.getWorkplaceData.sections.findIndex(x => x.id === selectedSection.id);
      this.getWorkplaceData.sections[sectionIndex].isActive = true

      //zapobiega event bubblingowi
      if(!this.getTtemClicked.includes("col")){
        console.log('CLICK section');
        //save ID of item to edit
        this.setElementToEdit(this.getWorkplaceData.sections[sectionIndex].id)
        this.setItemClicked(this.getWorkplaceData.sections[sectionIndex].id)
      }
      this.setItemClicked('')

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
      this.setElementToEdit('workplace')
      this.setWorkplaceActive(true);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.workplace-container{
  height: 1080px;
  background: white;
  box-shadow: $mainShadow;
  margin: 80px 60px;

  p{
    font-size: 16px;
  }
}
</style>
