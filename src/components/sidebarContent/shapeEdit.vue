<template>
    <div :class="['shapeEdit-container']">
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
        .v-label {
       //   top: calc(75% - 9px);
        }
      }
</style>