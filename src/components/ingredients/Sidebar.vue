<template>
  <section :class="['editSidebar-section']">
    <div>
      <slot name="in-sidebar"></slot>
    </div>
      <!-- <div :class="['zoom-section']">
        <p>Powiekszenie:</p>
        <v-overflow-btn
          :items="items"
          dense
          v-model="selectedZoom"
        ></v-overflow-btn>
      </div> -->

  </section>
</template>

<script>
import{mapGetters, mapMutations} from 'vuex'

export default {
  name: 'editSidebar',
  data: () => ({
    items: [0.5, 0.75, 1, 1.5, 2, 2.5, 3],
    selectedZoom:''
  }),
  computed:{
    ...mapGetters(['getActualZoom']),
  },
  watch:{
    selectedZoom(){
      this.setActualZoom(this.selectedZoom)
    }
  },
  mounted(){
    this.selectedZoom = this.getActualZoom
  },
  methods:{
    ...mapMutations(['setActualZoom'])
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .editSidebar-section{
    z-index: 1;
    height: 100%;
    width: 300px;
    background: $containerBackground;
    box-shadow: $mainShadow;
    position: fixed;
    top: 50px;
    bottom: 0;
    right: 0;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    .zoom-section{
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
      p{
        margin-top: 23px;
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
    }
  }
</style>
