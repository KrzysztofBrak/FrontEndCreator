<template>
  <v-app>
    <div :class="['font']">
      <p>Czcionka</p>
      <v-overflow-btn
        editable
        :items="items"
        no-data-text="Nie znaleziono czcionki"
        dense
        v-model="selectedFont"
      ></v-overflow-btn>
    </div>
    <div :class="['size']">
      <p>Rozmiar (px)</p>
      <v-text-field
        solo
        v-model="selectedSize"
      ></v-text-field>
    </div>
    <ColorPickerModal />
  </v-app>
</template>

<script>
import ColorPickerModal from '@/components/ingredients/ColorPickerModal.vue'

export default {
  name: 'editText',
  components:{
    ColorPickerModal
  },
  data: () => ({
    items: ['Arial', 'Calibri', 'Courier', 'Verdana'],
    selectedSize:'16',
    selectedFont:'Arial'
  })
}
</script>

<style scoped lang="scss">
    .size, .font{
      display: flex;
      justify-content: space-between;
      p{
        margin: auto 0;
        &:last-of-type{
          margin-top: 20px;
        }
      }
    }
    .theme--light.v-application{
      background: $containerBackground;
      ::v-deep .v-icon{
        margin-top: -5px!important;
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
    ::v-deep #app{
      height: 200px;
    }
</style>