<template>
  <section :class="['default-section', {'activeSection': section.isActive}]"
    @dblclick="activateSection"
    style=" position: relative"
  >
    <v-fab-transition>
      <v-btn
        v-show="section.isActive"
        color="rgb(71, 135, 230)"
        dark
        absolute
        top
        right
        fab
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
    <slot name="in-section"></slot>
    <p>fsdfsd</p>
  </section>
</template>

<script>

export default {
  name: 'DefaultSection',
  props:{
    section:{
      type: Object,
      required: true
    }
  },
  data: () => ({
  }),
  methods:{
    activateSection(){
      this.section.isActive = true
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .default-section{
    height: 300px;
    width: 100%;
    background: white;
    padding: 15px;
    transition: 0.3s;
    position: relative;
    &.activeSection{
      box-shadow: 0px 0px 10px 0px rgb(71, 135, 230);
      transition: 0.3s;
      z-index: 1;
    }
  }
</style>
