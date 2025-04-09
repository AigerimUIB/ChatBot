import { createRouter, createWebHistory } from 'vue-router';
import Chat from '../components/ChatComponent.vue'; // Путь к компоненту чата

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Chat, // Указываем компонент, который будет отображаться по этому пути
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
