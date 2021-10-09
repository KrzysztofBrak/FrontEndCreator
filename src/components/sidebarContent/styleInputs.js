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
                type: 'dropdown',
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
                    {
                        name:'arial',
                        value: 'arial'
                    },
                    {
                        name:'monospace',
                        value: 'monospace'
                    },
                    {
                        name:'cursive',
                        value: 'cursive'
                    },
                    {
                        name:'calibri',
                        value: 'calibri'
                    },
                    {
                        name:'fantasy',
                        value: 'fantasy'
                    },
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
                type: 'dropdown',
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
export {styleInputs}