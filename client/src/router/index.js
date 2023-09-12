import { createRouter, createWebHistory } from 'vue-router';

import InitPage from '../views/InitPage.vue';
import Mono from '../views/Mono.vue';
import Custom from '../views/Custom.vue';
import Favourite from '../views/Favourite.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: InitPage
  },
  {
    path: '/mono',
    name: 'Mono',
    component: Mono
  },
  {
    path: '/custom',
    name: 'Custom',
    component: Custom
  },
  {
    path: '/favourite',
    name: 'Favourite',
    component: Favourite
  }
  // Other routes...
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;