<template>
    <div :class="['selectedItemInfo-container']">
    <div>wybrany element:<br> {{getElementToEdit}}</div>
    </div>
</template>

<script>
import{mapGetters} from 'vuex'

export default {
  name: 'selectedItemInfo',

  computed:{
    ...mapGetters(['getElementToEdit']),
  },
  data: () => ({
  }),
}
</script>

<style scoped lang="scss">

</style>