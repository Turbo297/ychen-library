import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5HYQD8NF83RW5gamCuttTNJhSNIIPsE4",
  authDomain: "week7-yuqing.firebaseapp.com",
  projectId: "week7-yuqing",
  storageBucket: "week7-yuqing.firebasestorage.app",
  messagingSenderId: "1079327453033",
  appId: "1:1079327453033:web:24eeb4753009b2e52517f8"
};

// Initialize Firebase
initializeApp(firebaseConfig);


const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')
