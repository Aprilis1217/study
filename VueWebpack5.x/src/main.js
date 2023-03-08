console.log('Hello Vue3.x Webpack5.x')

import {createApp} from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import router from './router';

const app = createApp(App)
app.use(VueRouter)
.use(router)

app.config.errorHandler = (err,vm,info)=>{}
app.config.performance = false

app.mount('#app')


