<template>
  <section :class="['default-section', {'activeSection': section.isActive}]"
    @dblclick="activateSection"
  >
    <v-fab-transition>
      <v-btn
        v-show="section.isActive"
        color="rgb(71, 135, 230)"
        dark
        absolute
        top
        right
        fab
        @click="deleteSection"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
    <div :class="['columns-container']">
      <div :class="['column']"
        v-for="(column, index) in getWorkplaceData.sections[currentSection].columns"
        :key="index"
        :id="column.id"
        @dblclick="disactivateColumn(column)"
      >
      <component :is="'DefaultColumn'"
        :column="column"
        :ref="'columns'"
      ></component>
      </div>
    </div>
  </section>
</template>

<script>
import DefaultColumn from '@/components/ingredients/DefaultColumn.vue'

import{mapGetters, mapMutations} from 'vuex'

export default {
  name: 'DefaultSection',
  components:{
    DefaultColumn
  },
  props:{
    section:{
      type: Object,
      required: true
    }
  },
  computed:{
    ...mapGetters(['getWorkplaceData', 'getActiveElement']),
  },
  data: () => ({
    currentSection: 0
  }),
  mounted(){
    this.currentSection = this.getWorkplaceData.sections.findIndex(x => x.id == this.section.id)
  },
  methods:{
    ...mapMutations([
      'setUpdatedArray',
      'setWorkplaceActive'
    ]),

    activateSection(){
   //   this.section.isActive = true;
      this.setWorkplaceActive(false)
    },
    deleteSection(){
      let x = this.getWorkplaceData.sections
      let sectionToDelete = x.findIndex(x => x.isActive === true);

      this.setUpdatedArray(sectionToDelete)
      this.setWorkplaceActive(true);
    },

    disactivateColumn(selectedColumn){
      // this.getWorkplaceData.sections.forEach(section => {
      //   section.columns.forEach(column => {
      //     column.isActive = false;
      //   })
      // });

      this.getWorkplaceData.sections.forEach(section => {
        section.columns.forEach(column => {
          column.isActive = false;
          if(selectedColumn.id !== column.id){
            column.childs.forEach(item => {
              item.isActive = false;
            })
          }
        })
      });

      if(this.getWorkplaceData.sections[this.currentSection].isActive === true){
        let childIndex = this.getWorkplaceData.sections[this.currentSection].columns
          .findIndex(x => x.id === selectedColumn.id);

        this.getWorkplaceData.sections[this.currentSection].columns[childIndex].isActive = true
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .default-section{
    height: 300px;
    width: 1920px;
    background: white;
    padding: 0px;
    transition: 0.3s;
    position: relative;
    &.activeSection{
      box-shadow: 0px 0px 10px 0px rgb(71, 135, 230);
      transition: 0.3s;
      z-index: 1;
    }
    .columns-container{
        height: 100%;
        display: flex;
      .column{
        height: 100%;
        width: 100%;
        position: relative;
      }
    }
  }
</style>
