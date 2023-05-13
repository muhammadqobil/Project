
const routes = [
  {
    path: '',
    component: () => import('layouts/BaseLayout.vue'),
    children: [
      {path: '/', name: 'home', component: () => import('pages/Home.vue')},
    ]
  },
  {
    path: '',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {path: '/login', name: 'login', component: () => import('pages/LoginPage.vue')},
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
