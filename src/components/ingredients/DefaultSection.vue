<template>
  <section :class="['default-section', {'activeSection': section.isActive}]"
  @click="activateSection"
  >
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
      console.log("ACTIVATEEEE")
      this.section.isActive = true
    }
  },
  mounted(){
    console.log(this.section);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .default-section{
    height: 300px;
    width: 100%;

    padding: 15px;

    &.activeSection{
      border: 1px solid rgba(71,98,230,1);
      box-shadow: 0px 0px 10px 0px rgba(71,98,230,1);
    }
  }
</style>
