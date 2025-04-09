import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

// Импортируем компоненты
import ChatComponent from './components/ChatComponent.vue';

// Определяем маршруты
const routes = [
  {
    path: '/',
    name: 'Home',
    component: ChatComponent, // Указываем компонент для маршрута
  },
];

// Создаем router с историей
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

createApp(App)
  .use(router) // Используем маршруты
  .mount('#app');
