<template>
  <section :class="['tools-section']">
    <div :class="['button-container']"
      v-for="button in buttons"
      :key="button.alt">
      <img :src="button.img" :alt="button.alt"/>
    </div>
  </section>
</template>

<script>
import {buttons} from './content.js'

export default {
  name: 'toolsSidebar',
  data: () => ({
    buttons
  }),
    mounted(){
    console.log(this.buttons)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .tools-section{
    height: 100%;
    width: 50px;
    background: $containerBackground;
    box-shadow: $mainShadow;
    position: fixed;
    top: 50px;
    bottom: 0;
    .button-container{
      padding: 10px;
      cursor: pointer;
      img{
        width: 100%;
      }
      &:hover{
        background: $hoverColor;
      }
    }
  }
</style>
