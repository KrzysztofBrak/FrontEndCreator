<template>
    <div :class="['shapeEdit-container']">
      <h1>PRZEKSZTAŁĆ</h1>
      <div :class="['input-container']">
        <p>Szerokość:</p>
        <input type="text" :class="['itemWidth']" v-model="style.width" v-on:change="updateStyle">
      </div>
      <div :class="['input-container']">
        <p>Wysokość:</p>
        <input type="text" :class="['itemHeight']" v-model="style.height" v-on:change="updateStyle">
      </div>
      <div :class="['input-container']">
        <p>Wypełnienie:</p>
        <ColorPickerModal />
      </div>
      <div :class="['input-container']">
        <p>Krawędź:</p>
        <ColorPickerModal />
      </div>


    </div>
</template>

<script>
import{mapGetters} from 'vuex'
import ColorPickerModal from '@/components/ingredients/ColorPickerModal.vue'

export default {
  name: 'shapeEdit',

  components:{
    ColorPickerModal
  },

  computed:{
    ...mapGetters([
      'getElementToEdit',
      'getWorkplaceData'
    ]),
  },
  data: () => ({
    sectionIndex: -1,
    style:{
      width: 0,
      height:0
    }
  }),

  mounted(){
      this.sectionIndex = this.getWorkplaceData.sections.findIndex(x => x.id === this.getElementToEdit);

      this.style.height = this.getWorkplaceData.sections[this.sectionIndex].style.height;
      this.style.width = this.getWorkplaceData.sections[this.sectionIndex].style.width;
  },

  methods:{
    updateStyle(){
      //merge old object with the new one
      this.getWorkplaceData.sections[this.sectionIndex].style = {
        ...this.getWorkplaceData.sections[this.sectionIndex].style,
        ...this.style}
    }
  }
}
</script>

<style scoped lang="scss">
  .shapeEdit-container{
    h1{
      font-size: 12px;
      color: gray;
      font-weight: 400;
    }
    .input-container{
      font-size: 14px;
      display:flex;
      margin: 15px 0 ;
      input{
        margin-left: 10px;
        background:#e9e9e9;
        outline: none;
        max-width: 50px;
      }
    }
  }
      ::v-deep .v-input{
        max-width: 150px;
        .v-input__slot{
          border-width: 0 0 2px 0;
          border-style: solid;
          border-radius: 0;
          border-color: rgba(0, 0, 0, 0.12);
          box-shadow: none!important;
        }
      }
</style>