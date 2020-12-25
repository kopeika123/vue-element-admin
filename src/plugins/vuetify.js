import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import ru from "vuetify/es5/locale/ru"

Vue.use(Vuetify, {
  iconfont: 'mdi',
})
export default new Vuetify ({
  lang:{
    locales: {ru},
    current: "ru"
  }
})