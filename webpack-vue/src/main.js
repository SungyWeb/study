import Vue from 'vue';
import App from './app.vue';

window.vm = new Vue({
	render: h => h(App)
}).$mount('#app');