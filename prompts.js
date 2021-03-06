module.exports = [
  {
    name: `addLogin`,
    type: 'confirm',
    message: '¿Añadir plantilla de login al inicio del proyecto?',
    default: true
  },
  {
    name: `addMenu`,
    type: 'confirm',
    message: '¿Añadir el menú lateral de navegación?',
    default: true
  },
  {
    name: `headerOptions`,
    type: 'checkbox',
    message: '¿Qué plugins quieres preinstalar en la cabecera?',   
    choices: [
      {
        name: `alertas`,
        default: false
      },
      {
        name: `multisuits`,
        default: false
      },
      {
        name: `logoCliente`,
        default: true
      },
      {
        name: `configMenu`,
        default: true
      },
      {
        name: 'optionsMenu',
        default: false
      },
      {
        name: 'userMenu',
        default: true
      }
    ]
  },
  {
    name: `examplePage`,
    type: 'confirm',
    message: '¿Quieres ver en la página principal un ejemplo de los componentes disponibles?',
    default: false
  }/* ,
  {
    name: `helpTour`,
    type: 'confirm',
    message: '¿Quieres instalar un tour de ayuda para comenzar?',
    default: false
  } */
]
