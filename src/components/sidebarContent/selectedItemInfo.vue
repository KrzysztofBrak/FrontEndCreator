<template>
    <div class="selectedItemInfo-container">
      <p>wybrany element:<br> {{getElementToEdit}}</p>
    </div>
</template>
<script>
import{mapGetters} from 'vuex'

export default {
  name: 'selectedItemInfo',

  computed:{
    ...mapGetters(['getElementToEdit']),
  }
}
</script>
<style scoped lang="scss">
.selectedItemInfo-container{
  margin: 10px;
  line-height: 1.6;
}
</style>