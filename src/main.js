import {createApp} from 'vue'
import App from './App.vue'

const legalSymbols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '+', '/', '*', '=', 'Backspace', 'Enter'];

const app = createApp(App);

app.mount('#app');

export default legalSymbols;