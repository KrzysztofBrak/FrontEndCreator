<template>
  <div :class="['main-container']">
    <div :class="['color-container']">
      <div :class="['color-button']">
        <v-btn
          :class="['button']"
          color="secondary"
          @click="modalIsOpened = !modalIsOpened"
          :style="{background: color}"
        >
        </v-btn>
      </div>
    </div>
    <v-app>
    <v-fade-transition>
      <v-color-picker v-show="modalIsOpened"
        :class="['color-picker']"
        show-swatches
        mode="hexa"
        v-model="color"
        swatches-max-height="200px"
      ></v-color-picker>
    </v-fade-transition>
    </v-app>
    <div v-show="modalIsOpened===true"
      :class="['overlay']" @click.self="closeModal"
    >
    </div>
  </div>
</template>

<script>
export default {
  name: 'editSidebar',
  props:{
    inputName:{
      type: String,
      default: ''
    },
    selectedColor:{
      type: String,
      default: '#FFFFFF00'
    }
  },
  computed:{
    color: {
      get () {
        return this.selectedColor
      },
      set (v) {
        const colorInfo = {
          color: v,
          label: this.inputName
        }
        this.$emit('selected', colorInfo)
        this.hexa = v
      },
    },
  },
  data: () => ({
    modalIsOpened: false,
    hexa: '',
  }),
  mounted(){
    this.hexa = this.selectedColor
  },
  methods:{
    closeModal(){
      this.modalIsOpened = false;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .overlay{
      position: fixed;
      z-index: 22;
      padding-top: 100px;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
    }
      .main-container{
        display: block;
        width: 100%;
        margin-left: 10px;
        .color-container{
          .color-button{
            display: flex;
            justify-content: space-between;
            .button{
              width: 100%;
              height: 16px;
            }
          }
        }
        .color-picker{
          z-index: 23;
          position: absolute;
          left: -120px;
          top: 58px;
          width: 316px;
          max-width: 310px!important;
          padding: 5px;
          box-shadow: $mainShadow;
        }
      }
      ::v-deep .v-application--wrap{
        min-height: fit-content!important;
      }
</style>
