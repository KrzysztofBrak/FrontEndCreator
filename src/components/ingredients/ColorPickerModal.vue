<template>
  <div :class="['main-container']">
    <div :class="['color-container']">
      <div :class="['color-button']">
        <v-btn
          :class="['button']"
          color="secondary"
          @click="modalIsOpened = !modalIsOpened"
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
        swatches-max-height="200px"
      ></v-color-picker>
    </v-fade-transition>

    </v-app>
<div v-show="modalIsOpened===true" :class="['overlay']" @click.self="closeModal">
  </div>
  </div>
</template>

<script>
export default {
  name: 'editSidebar',
  data: () => ({
    modalIsOpened: false
  }),
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
        .color-container{
          .color-button{
            display: flex;
            justify-content: space-between;
            .button{
              max-width: 150px;
              width: 100%;
              height: 26px;
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
