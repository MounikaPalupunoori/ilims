import './assets/main.css'

import  { createApp } from 'vue';
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { plugin, defaultConfig } from '@formkit/vue';
import config from '../formkit.config';
 import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap";
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import { VDataTable } from 'vuetify/labs/VDataTable'
import VueApexCharts from "vue3-apexcharts";
const vuetify = createVuetify({
    components: {
        ...components,
        VDataTable,
      },
  directives,
})
const app = createApp(App)
app.use(createPinia())
app.use(vuetify)
app.use(VueApexCharts);
app.use(plugin,defaultConfig(config))
app.use(router)
app.mount('#app')
