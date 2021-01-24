<template>
  <section :class="['column-section', {'activeSection': column.isActive}]"
    @dblclick="activateColumn"
  >
    <v-fab-transition>
      <v-btn
        :class="['column-btn']"
        v-show="column.isActive"
        color="rgb(135, 230, 71)"
        dark
        absolute
        top
        right
        fab
        @click="deleteColumn"
      >
        <v-icon large>mdi-trash-can</v-icon>
      </v-btn>
    </v-fab-transition>

    <!-- display items in current column -->
    <div :class="['item-container']">
      <div :class="['item']"
        v-for="(item, index) in getWorkplaceData.sections[currentSection].columns[currentColumn].childs"
        :key="index"
        :id="item.id"
        :style="item.style"
        @dblclick="disactivateItems(), setItems(item)"
      >
      <component :is="'DefaultChildItem'"
        :id="item.id"
        :item="item"
        :ref="'items'"
      ></component>
      </div>
    </div>

  </section>
</template>

<script>
import{mapGetters, mapMutations} from 'vuex'

import DefaultChildItem from '@/components/ingredients/DefaultChildItem.vue'

export default {
  name: 'DefaultColumn',
  components:{
    DefaultChildItem
  },
  props:{
    column:{
      type: Object,
      required: true
    }
  },

  computed:{
    ...mapGetters(['getWorkplaceData','getActiveElement']),
  },

  data: () => ({
    currentSection:0,
    currentColumn:0
  }),

  mounted(){
		this.$nextTick(() => {
      //find current column:
      //to do that, first find section...
      this.currentSection = this.getWorkplaceData.sections
        .findIndex(x => x.id == this.column.id.split('-')[0])

      //then find there current column
      this.currentColumn = this.getWorkplaceData.sections[this.currentSection]
        .columns.findIndex(x => x.id == this.column.id)
		});
  },

  methods:{
    ...mapMutations([
      'setUpdatedArray',
      'setWorkplaceActive',
      'setDeleteColumn',
      'setElementToEdit',
      'setItemClicked'
    ]),

    activateColumn(){
      this.setWorkplaceActive(false);
    },
    deleteColumn(){
      this.setDeleteColumn(this.column);
      this.setElementToEdit(true);
    },


    disactivateItems(){
      this.getWorkplaceData.sections.forEach(section => {
        section.columns.forEach(column => {
          column.childs.forEach(item => {
            item.isActive = false;
          })
        })
      });
    },

    setItems(selectedItem){
      if(this.getWorkplaceData.sections[this.currentSection].columns[this.currentColumn].isActive === true){
        //get index of active item...
        let childIndex = this.getWorkplaceData.sections[this.currentSection]
          .columns[this.currentColumn].childs.findIndex(x => x.id === selectedItem.id);
        //...and set it to true
        this.getWorkplaceData.sections[this.currentSection]
          .columns[this.currentColumn].childs[childIndex].isActive = true


          //ID of element to edit:
          this.setElementToEdit(this.getWorkplaceData.sections[this.currentSection]
          .columns[this.currentColumn].childs[childIndex].id)


          this.setItemClicked(this.getWorkplaceData.sections[this.currentSection]
          .columns[this.currentColumn].childs[childIndex].id)

      }
      this.setWorkplaceActive(false);
    },
  },
}
</script>

<style scoped lang="scss">
  .column-section{
    height: 100%;
    display: flex;
    &.activeSection{
      box-shadow: 0px 0px 10px 0px rgb(135, 230, 71);
      transition: 0.3s;
      z-index: 1;
    }
  }
  .column-btn{
    right: 85px;
  }

</style>
