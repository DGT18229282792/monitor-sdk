import Vue from 'vue'
import App from './App.vue'
import { StatisticSDK } from '@/sdk/monitor-sdk'
Vue.prototype.StatisticSDK = new StatisticSDK('123456789')
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
