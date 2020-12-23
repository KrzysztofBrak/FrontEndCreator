<template>
  <div :class="['main-container']">
    <div :class="['color-container']">
      <div :class="['color-button']">
        <p>Kolor:</p>
        <v-btn
          :class="['button']"
          color="secondary"
          @click="modalIsOpened = !modalIsOpened"
        >
        </v-btn>
      </div>
    </div>
    <v-fade-transition>
      <v-color-picker v-show="modalIsOpened"
        :class="['color-picker']"
        show-swatches
        mode="hexa"
        swatches-max-height="200px"
      ></v-color-picker>
    </v-fade-transition>
  </div>
</template>

<script>
export default {
  name: 'editSidebar',
  data: () => ({
    modalIsOpened: false
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
    position: relative;
    right: 193px;
    bottom: 40px;
    width: 316px;
    max-width: 310px!important;
    padding: 5px;
    box-shadow: $mainShadow;
  }
}
</style>
