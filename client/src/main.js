import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import store from './store'

Vue.config.productionTip = false

Vue.filter('short-date', function(value) {
    if (!value || typeof value !== 'string') return ''
    return value.slice(0, 10).replace(/-/g, '/')
})

new Vue({
    store,
    render: h => h(App),
}).$mount('#app')
