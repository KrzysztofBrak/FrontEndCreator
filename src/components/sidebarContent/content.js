const textbuttons = [
    {
        img: require('@/assets/img/textEditButtons/align_horizontal_left.svg'),
        alt: 'left'
    },
    {
        img: require('@/assets/img/textEditButtons/align_horizontal_center.svg'),
        alt: 'center'
    },
    {
        img: require('@/assets/img/textEditButtons/align_horizontal_right.svg'),
        alt: 'right'
    },
    {
        img: require('@/assets/img/textEditButtons/align_vertical_top.svg'),
        alt: 'top'
    },
    {
        img: require('@/assets/img/textEditButtons/align_vertical_center.svg'),
        alt: 'middle'
    },
    {
        img: require('@/assets/img/textEditButtons/align_vertical_bottom.svg'),
        alt: 'bottom'
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
                showSeparately: 'false',
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
export {textbuttons, styleInputs}