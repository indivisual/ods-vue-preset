const { EOL } = require('os')

module.exports = (api, options) => {
  api.extendPackage({
    author: 'Carlos Prat',
    dependencies: {
      '@onesait/onesait-ds': '^0.1.79',
      'reset-css': '^2.2.1',
      'axios': '^0.17.1',
      'sass-resources-loader': '^2.0.1',
      'vue-i18n': '^8.0.0'
    }
  })

  // api.injectImports(api.entryFile, 'Vue.use(ODS)')

  api.injectImports(api.entryFile, [
    "import ODS from '@onesait/onesait-ds' // eslint-disable-line",
    "import i18n from './lang/i18n.js' // eslint-disable-line",
    "import { closest } from './utils/ie' // eslint-disable-line",
    "import { truncate, formatDate } from './utils/filters' // eslint-disable-line \n",
    "import 'reset-css/reset.css'",
    "import '@onesait/onesait-ds/lib/theme-onesait/index.css'",
    "import '@/assets/scss/main.scss'"
  ])

  if (options.helpTour) {
    api.extendPackage({
      dependencies: {
        'vue-tour': '^1.1.0'
      }
    })

    api.injectImports(api.entryFile, [
      "import VueTour from 'vue-tour' // eslint-disable-line"
    ])
  }

  api.onCreateComplete(() => {
    const entryFile = api.resolve(api.entryFile)
    const fs = require('fs')
    const contentMain = fs.readFileSync(entryFile, { encoding: 'utf-8' })
    const lines = contentMain.split(/\r?\n/g)
    const imports = lines.findIndex(line => line.match(/store/))
    lines[imports] = `import store from './store/store.js'`
    const renderIndex = lines.findIndex(line => line.match(/new Vue/))
    if (options.helpTour) {
      lines[renderIndex] = `
        require('vue-tour/dist/vue-tour.css')${EOL}
        Vue.use(VueTour)${EOL}${EOL}
        closest()${EOL}
        Vue.filter('truncate', truncate)
        Vue.filter('formatDate', formatDate)${EOL}${EOL}
        Vue.use(ODS)${EOL}${EOL}
        ${lines[renderIndex]}
        i18n,`
    } else {
      lines[renderIndex] = `
        closest()${EOL}
        Vue.filter('truncate', truncate)
        Vue.filter('formatDate', formatDate)${EOL}${EOL}
        Vue.use(ODS)${EOL}${EOL}
        ${lines[renderIndex]}
        i18n,`
    }

    fs.writeFileSync(entryFile, lines.join(EOL), { encoding: 'utf-8' })
    const storeFile = api.resolve('src/store.js')
    fs.unlink(storeFile, (err) => {
      if (err) {
        console.log('err:', err)
      }
    })
  })

  api.render('./template/basic', {
    ...options
  })

  if (options.examplePage) {
    api.render('./template/example')
  }

  if (options.addMenu) {
    api.render('./template/nav-sidebar')
  }

  if (options.addLogin) {
    api.render('./template/login')
  }
}
