<template>
    <div :class="['selectedItemInfo-container']">
    <p>wybrany element:<br> {{getElementToEdit}}</p>
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