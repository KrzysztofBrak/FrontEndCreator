<template>
    <div :class="['shapeEdit-container']">
      <h1>PRZEKSZTAŁĆ</h1>
      <div :class="['input-container']">
        <p>Szerokość (px):</p>
        <input type="number" :class="['itemWidth']">
      </div>
      <div :class="['input-container']">
        <p>Wysokość (px):</p>
        <input type="number" :class="['itemHeight']">
      </div>
      <!-- <v-text-field
        :v-model="isLocked ? lockedValue : unlockedValue"
        :append-icon="isLocked ? 'mdi-lock' : 'mdi-lock-open-variant'"
        solo
        hint="Margines"
        type="number"
        @click:append="conectInputs"
      ></v-text-field>
      <v-text-field
        :v-model="isLocked ? lockedValue : unlockedValue"
        :append-icon="isLocked ? 'mdi-lock' : 'mdi-lock-open-variant'"
        solo
        hint="Margines"
        type="number"
        @click:append="conectInputs"
      ></v-text-field> -->

    </div>
</template>

<script>
// import ColorPickerModal from '@/components/ingredients/ColorPickerModal.vue'

export default {
  name: 'shapeEdit',
  components:{

  },
  data: () => ({
    isLocked: true,
    lockedValue: 0,
    unlockedValue: 0
  }),
  methods:{
    conectInputs(){
      this.isLocked = !this.isLocked
    }
  }
}
</script>

<style scoped lang="scss">
  .shapeEdit-container{
    h1{
      font-size: 12px;
      color: gray;
      font-weight: 400;
    }
    .input-container{
      font-size: 14px;
      display:flex;
      margin: 15px 0 ;
      input{
        margin-left: 10px;
        background:#e9e9e9;
        outline: none;
        max-width: 50px;
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