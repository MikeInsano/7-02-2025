import { createRouter, createWebHistory } from 'vue-router'

// Se crean las rutas para la aplicación y con la propiedad META (donde podemos crear nuestras propiedades)
// le pasa un valor booleano para mostrar o no el menú en el componente AppMenu.vue
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: { menu: true, title: 'Inicio' },
  },
  {
    path: '/Users',
    name: 'Users',
    component: () => import('../views/DashboardView.vue'),
    meta: { menu: true, title: 'Usuarios' },
    // Rutas hijas para el componente DashboardView que se renderizan en el router-view
    children: [
      {
        path: 'profile/:name',
        name: 'Profile',
        component: () => import('../views/ProfileView.vue'),
        meta: { menu: false },
        props: true,
      },
    ],
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: () => import('@/views/TaskView.vue'),
    meta: { menu: true, title: 'Tareas' },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
    meta: { menu: true, title: 'Sobre nosotros' },
  },
  // Ruta para mostrar el componente 404View.vue en caso de que no se encuentre la ruta
  {
    path: '/:pathMatch(.*)',
    name: 'Not found',
    component: () => import('../views/404View.vue'),
  },
  {
    path: '/students',
    name: 'students',
    component: () => import('../views/StudentView.vue'),
    meta: { menu: true, title: 'Estudiantes' },
  },
]

// Se crea el router con las rutas definidas
// y se exporta para ser utilizado en el main.ts
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
