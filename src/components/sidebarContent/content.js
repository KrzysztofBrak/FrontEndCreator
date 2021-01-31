const textbuttons = [
    {
        img: 'mdi-align-horizontal-left',
        alt: 'left',
        isActive: false,
        positionStyle:{
            justifyContent: 'flex-start',
            flexDirection: 'row'
        },
        positionStyleForItems:{
            alignItems: 'flex-start'
        }
    },
    {
        img: 'mdi-align-horizontal-center',
        alt: 'center',
        isActive: false,
        positionStyle:{
            justifyContent: 'center',
            flexDirection: 'row'
        },
        positionStyleForItems:{
            alignItems: 'center'
        }
    },
    {
        img: 'mdi-align-horizontal-right',
        alt: 'right',
        isActive: false,
        positionStyle:{
            justifyContent: 'flex-end',
            flexDirection: 'row'
        },
        positionStyleForItems:{
            alignItems: 'flex-end'
        }
    },
    {
        img: 'mdi-align-vertical-top',
        alt: 'top',
        isActive: false,
        positionStyle:{
            alignItems: 'flex-start'
        },
        positionStyleForItems:{
            justifyContent: 'flex-start',
            flexDirection: 'column'
        }
    },
    {
        img: 'mdi-align-vertical-center',
        alt: 'middle',
        isActive: false,
        positionStyle:{
            alignItems: 'center'
        },
        positionStyleForItems:{
            justifyContent: 'center',
            flexDirection: 'column'
        }
    },
    {
        img: 'mdi-align-vertical-bottom',
        alt: 'bottom',
        isActive: false,
        positionStyle:{
            alignItems: 'flex-end'
        },
        positionStyleForItems:{
            justifyContent: 'flex-end',
            flexDirection: 'column'
        }
    }
]
const sortbuttons = [
    {
        img: 'mdi-arrow-collapse-horizontal',
        alt: 'collapse-horizontal',
        isActive: false,
        positionStyle:{
            justifyContent: 'space-around',
        },
        positionStyleForItems:{
            justifyContent: 'space-around',
        }

    },
    {
        img: 'mdi-arrow-expand-horizontal',
        alt: 'expand-horizontal',
        isActive: false,
        positionStyle:{
            justifyContent: 'space-between',
        },
        positionStyleForItems:{
            justifyContent: 'space-between',
        }
    }
]

const styleInputs = {
    shape:{
        name: 'Przekształć:',
        isOpen: true,
        inputs: [
            {
                inputName: 'Szerokość',
                type: 'text',
                class: 'inputWidth',
                vModel: 'width',
            },
            {
                inputName: 'Wysokość',
                type: 'text',
                class: 'inputHeight',
                vModel: 'height',
            },
            {
                inputName: 'Wypełnienie',
                type: 'ColorPicker',
                class: '',
                vModel: 'background',
            },
            {
                inputName: 'Cień',
                type: 'ColorPicker',
                class: '',
                vModel: 'boxShadow',
            },
        ]
    },
    borders:{
        name: 'Krawędzie:',
        isOpen: true,
        inputs: [
            {
                inputName: 'Kolor',
                type: 'ColorPicker',
                class: '',
                vModel: 'borderColor',
            },
            {
                inputName: 'styl:',
                type: 'dropdown',
                class: '',
                vModel: 'borderStyle',
            },
            {
                inputName: 'grubość',
                type: 'text',
                class: '',
                vModel: 'borderWidth',
            },
            {
                inputName: 'zaokrąglenie krawędzi',
                showSeparately: false,
                type: 'text',
                class: '',
                vModel: 'borderRadius',
                childs:[
                    {
                        inputName: 'top-left',
                        type: 'text',
                        class: '',
                        vModel: 'borderTopLeftRadius',
                    },
                    {
                        inputName: 'top-right',
                        type: 'text',
                        class: '',
                        vModel: 'borderTopRightRadius',
                    },
                    {
                        inputName: 'bottom-left',
                        type: 'text',
                        class: '',
                        vModel: 'borderBottomLeftRadius',
                    },
                    {
                        inputName: 'bottom-right',
                        type: 'text',
                        class: '',
                        vModel: 'borderBottomRightRadius',
                    },
                ],
            },
        ]
    },
    text:{
        name: 'Tekst:',
        isOpen: true,
        inputs: [
            {
                inputName: 'Czcionka',
                type: 'dropdown',
                class: '',
                vModel: 'font-family',
            },
            {
                inputName: 'Kolor',
                type: 'ColorPicker',
                class: '',
                vModel: 'color',
            },
            {
                inputName: 'Rozmiar',
                type: 'text',
                class: '',
                vModel: 'font-size',
            },
            {
                inputName: 'Grubość',
                type: 'text',
                class: '',
                vModel: 'font-weight',
            },
            {
                inputName: 'Cień',
                type: 'ColorPicker',
                class: '',
                vModel: 'box-shadow',
            },
        ]
    },
}
export {textbuttons, sortbuttons, styleInputs}