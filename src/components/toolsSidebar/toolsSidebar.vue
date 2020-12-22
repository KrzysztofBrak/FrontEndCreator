<template>
  <section :class="['tools-section']">
    <div :class="['top-tools-section']">
      <div :class="['button-container']"
        v-for="button in buttons"
        :key="button.alt">
        <img :src="button.img" :alt="button.alt"/>
      </div>
    </div>
    <div :class="['bottom-tools-section']">


    </div>
  </section>
</template>

<script>
import {buttons} from './content.js'

export default {
  name: 'toolsSidebar',
  data: () => ({
    buttons,
  }),
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .tools-section{
    z-index: 1;
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
      img[alt="tabela"]{
        width: 130%;
        position: relative;
        right: 5px;
      }
      &:hover{
        background: $hoverColor;
      }
    }
  }
        ::v-deep .v-input{
        max-width: 150px;
        .v-input__slot{
          background: $containerBackground!important;
          border-width: 0 0 2px 0;
          border-style: solid;
          border-radius: 0;
          border-color: rgba(0, 0, 0, 0.12);
          box-shadow: none!important;
        }
      }
</style>
