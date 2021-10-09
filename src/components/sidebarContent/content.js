const horizontalAlign = [
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
]
const verticalAlign = [
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
const justifyContent = [
    {
        img: 'mdi-arrow-collapse-horizontal',
        alt: 'collapse-horizontal',
        isActive: false,
        hideIcon: false,
        isRotating: true,
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
        hideIcon: false,
        isRotating: true,
        positionStyle:{
            justifyContent: 'space-between',
        },
        positionStyleForItems:{
            justifyContent: 'space-between',
        }
    }
]

const justifyText = [
    {
        img: 'mdi-format-align-justify',
        alt: 'justify',
        isActive: false,
        hideIcon: true,
        positionStyleForItems:{
            textAlign: 'justify',
        }

    },
    {
        img: 'mdi-format-align-left',
        alt: 'left',
        isActive: false,
        hideIcon: true,
        positionStyleForItems:{
            textAlign: 'left',
        }
    },
    {
        img: 'mdi-format-align-center',
        alt: 'center',
        isActive: false,
        hideIcon: true,
        positionStyleForItems:{
            textAlign: 'center',
        }
    },
    {
        img: 'mdi-format-align-right',
        alt: 'right',
        isActive: false,
        hideIcon: true,
        positionStyleForItems:{
            textAlign: 'right',
        }
    }
]

export {horizontalAlign, verticalAlign, justifyContent, justifyText}