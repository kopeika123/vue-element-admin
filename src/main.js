import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
import enLang from 'element-ui/lib/locale/lang/ru-RU'
import vuetify from './plugins/vuetify';
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

//import * as filters from './filters' // global filters

Vue.use(vuetify, {
  iconfont: 'mdi',
})
Vue.use(Element, {
  size: Cookies.get('size') || 'medium',
  locale: enLang
})

// register global utility filters
/*Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})*/

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  render: h => h(App)
})
Vue.directive('phone', {
  bind(el) {
    el.oninput = function(e) {
      if (!e.isTrusted) {
        return
      }

      const x = this.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/)

      if (!x[2] && x[1] !== '') {
        this.value = x[1] === '8' ? x[1] : '8' + x[1]
      } else {
        this.value = !x[3] ? x[1] + x[2] : x[1] + '(' + x[2] + ') ' + x[3] + (x[4] ? '-' + x[4] : '')
      }
    }
  },
})
