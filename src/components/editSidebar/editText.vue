<template>
  <Sidebar :class="['editSidebar-section']">
    <template #in-sidebar>
      <div  :class="['align-text-container']">
        <div  :class="['align-text-button']"
          v-for="button in textbuttons"
          :key="button.alt">
          <img :src="button.img" :alt="button.alt"/>
        </div>
      </div>
      <v-overflow-btn
  editable
></v-overflow-btn>
    </template>
  </Sidebar>
</template>

<script>
import Sidebar from '@/components/ingredients/Sidebar.vue'

import {textbuttons} from './content.js'
export default {
  name: 'editText',
  components:{
    Sidebar
  },
  data: () => ({
    textbuttons
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .align-text-container{
      margin: 10px;
      display: flex;
      justify-content: space-between;
      .align-text-button{
        cursor: pointer;
        padding: 10px;
        &:hover{
          background: $hoverColor;
        }
      }
    }
</style>
