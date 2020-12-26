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
    disactivateSection(section){
      this.getWorkplaceData.sections.forEach((element) => {
          element.isActive = false;
      });
      let y = this.getWorkplaceData.sections.findIndex(x => x.id === section.id);
      this.getWorkplaceData.sections[y].isActive = true
    },

    disactivateAllElements(){
      this.getWorkplaceData.sections.forEach(element => {
          element.isActive = false;
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
