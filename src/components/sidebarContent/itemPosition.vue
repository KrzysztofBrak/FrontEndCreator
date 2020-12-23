<template>
  <div  :class="['align-text-container']">
    <div  :class="['align-text-button']"
      v-for="button in textbuttons"
      :key="button.alt">
      <img :src="button.img" :alt="button.alt"/>
    </div>
  </div>
</template>

<script>
import {textbuttons} from './content.js'

export default {
  name: 'itemPosition',
  data: () => ({
    textbuttons
  }),
}
</script>

<style scoped lang="scss">
    .align-text-container{
      margin: 10px;
      display: flex;
      justify-content: space-between;
      .align-text-button{
        cursor: pointer;
        &:hover{
          background: $hoverColor;
        }
      }
    }
</style>