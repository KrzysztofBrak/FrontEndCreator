<template>
  <section :class="['default-section', {'activeSection': section.isActive}]"
    @dblclick="activateSection"
    :style="{width: this.getWorkplaceData.workplaceWidth}"
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
        <v-icon large>mdi-trash-can</v-icon>
      </v-btn>
    </v-fab-transition>
    <div :class="['columns-container']"
      :style="section.childStyle"
    >
      <div :class="['column']"
        v-for="(column, index) in getWorkplaceData.sections[currentSection].columns"
        :key="index"
        :id="column.id"
        :style="column.style"
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
    ...mapGetters(['getWorkplaceData', 'getActiveElement', 'getElementToEdit', 'getTtemClicked']),
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
      'setWorkplaceActive',
      'setElementToEdit',
      'setItemClicked'
    ]),

    activateSection(){
   //   this.section.isActive = true;
      this.setWorkplaceActive(false)
    },
    deleteSection(){
      let x = this.getWorkplaceData.sections
      let sectionToDelete = x.findIndex(x => x.isActive === true);

      this.setUpdatedArray(sectionToDelete);
      this.setElementToEdit(true);
      this.setWorkplaceActive(true);
    },

    disactivateColumn(selectedColumn){

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

        //ID of item to edit
        if(!this.getTtemClicked.includes("item")){
          console.log('CLICK column');
          this.setElementToEdit(this.getWorkplaceData.sections[this.currentSection].columns[childIndex].id)
          this.setItemClicked(this.getWorkplaceData.sections[this.currentSection].columns[childIndex].id)
        }
      }
    },

  }
}
</script>

<style scoped lang="scss">
  .default-section{
    width: 100%;
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
