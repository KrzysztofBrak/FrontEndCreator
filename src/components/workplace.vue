<template>
  <section
    :class="['workplace-container']"
    id="workplace"
    :style="workplaceStyle"
  >
    <div v-for="(component, index) in getSectionsArray"
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

import{mapGetters} from 'vuex'

export default {
  name: 'Workplace',
  components:{
    DefaultSection
  },
  computed:{
    ...mapGetters(['getSectionsArray']),
  },
  data: () => ({
    workplaceStyle:{
      width: '1920px',
      height: '1080px'
    }
  }),
  methods:{
    disactivateSection(section){
      this.getSectionsArray.forEach((element, index) => {
        if(Number(section.id.split('_')[1]) !== index){
          element.isActive = false;
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.workplace-container{
  background: white;
  box-shadow: $mainShadow;
  margin: 60px;
  p{
    font-size: 16px;
  }
}
</style>
