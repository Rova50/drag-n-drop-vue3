import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import draggable from 'vuedraggable'

createApp(App).component('draggable', draggable).mount('#app')
