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

const textAlignButtons = [
    {
        img: 'mdi-format-align-justify',
        alt: 'justify',
        isActive: false,
        positionStyleForItems:{
            textAlign: 'justify',
        }

    },
    {
        img: 'mdi-format-align-left',
        alt: 'left',
        isActive: false,
        positionStyleForItems:{
            textAlign: 'left',
        }
    },
    {
        img: 'mdi-format-align-center',
        alt: 'center',
        isActive: false,
        positionStyleForItems:{
            textAlign: 'center',
        }
    },
    {
        img: 'mdi-format-align-right',
        alt: 'right',
        isActive: false,
        positionStyleForItems:{
            textAlign: 'right',
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
                inputName: 'Odstęp\u00A0wew.',
                type: 'text',
                class: '',
                vModel: 'padding',
                showSeparately: false,
                childs:[
                    {
                        inputName: 'mdi-border-left-variant mdi-rotate-90',
                        type: 'text',
                        class: '',
                        vModel: 'paddingTop',
                    },
                    {
                        inputName: 'mdi-border-left-variant mdi-rotate-180',
                        type: 'text',
                        class: '',
                        vModel: 'paddingRight',
                    },
                    {
                        inputName: 'mdi-border-left-variant mdi-rotate-270',
                        type: 'text',
                        class: '',
                        vModel: 'paddingBottom',
                    },
                    {
                        inputName: 'mdi-border-left-variant',
                        type: 'text',
                        class: '',
                        vModel: 'paddingLeft',
                    },
                ],
            },
            {
                inputName: 'Odstęp\u00A0zew.',
                type: 'text',
                class: '',
                vModel: 'margin',
                showSeparately: false,
                childs:[
                    {
                        inputName: 'mdi-border-left-variant mdi-rotate-90',
                        type: 'text',
                        class: '',
                        vModel: 'marginTop',
                    },
                    {
                        inputName: 'mdi-border-left-variant mdi-rotate-180',
                        type: 'text',
                        class: '',
                        vModel: 'marginRight',
                    },
                    {
                        inputName: 'mdi-border-left-variant mdi-rotate-270',
                        type: 'text',
                        class: '',
                        vModel: 'marginBottom',
                    },
                    {
                        inputName: 'mdi-border-left-variant',
                        type: 'text',
                        class: '',
                        vModel: 'marginLeft',
                    },
                ],
            },
            {
                inputName: 'Wypełnienie',
                type: 'ColorPicker',
                class: '',
                vModel: 'background',
            }
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
                inputName: 'styl',
                type: 'dropdownWithDifferentNames',
                items: [
                    {
                        name:'solid',
                        value: 'ciągłe'
                    },
                    {
                        name:'dashed',
                        value: 'kreski'
                    },
                    {
                        name:'dotted',
                        value: 'kropki'
                    },
                    {
                        name:'none',
                        value: 'brak'
                    },
                ],
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
                inputName: `zaokrąglenie\u00A0krawędzi`,
                type: 'text',
                class: '',
                vModel: 'borderRadius',
                showSeparately: false,
                childs:[
                    {
                        inputName: 'mdi-rounded-corner mdi-rotate-270',
                        type: 'text',
                        class: '',
                        vModel: 'borderTopLeftRadius',
                    },
                    {
                        inputName: 'mdi-rounded-corner',
                        type: 'text',
                        class: '',
                        vModel: 'borderTopRightRadius',
                    },
                    {
                        inputName: 'mdi-rounded-corner mdi-rotate-180',
                        type: 'text',
                        class: '',
                        vModel: 'borderBottomLeftRadius',
                    },
                    {
                        inputName: 'mdi-rounded-corner mdi-rotate-90',
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
                items: [
                    'arial',
                    'monospace',
                    'cursive',
                    'calibri',
                    'fantasy'
                ],
                class: '',
                vModel: 'font-family',
            },
            {
                inputName: 'Rozmiar',
                type: 'text',
                class: '',
                vModel: 'font-size',
            },
            {
                inputName: 'Grubość',
                type: 'dropdownWithDifferentNames',
                class: '',
                vModel: 'font-weight',
                items: [
                    {
                        name:'100',
                        value: 'light',
                        selected: 'selected'
                    },
                    {
                        name:'400',
                        value: 'regular',
                        selected: ''
                    },
                    {
                        name:'600',
                        value: 'bold',
                        selected: ""
                    }
                ]
            },
            {
                inputName: 'Interlinia',
                type: 'text',
                class: '',
                vModel: 'line-height',
            },
            {
                inputName: 'Kolor',
                type: 'ColorPicker',
                class: '',
                vModel: 'color',
            },
        ]
    },
}
export {textbuttons, sortbuttons, textAlignButtons, styleInputs}