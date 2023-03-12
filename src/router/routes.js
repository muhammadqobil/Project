
const routes = [
  {
    path: '/',
    component: () => import('pages/LoginPage'),
    children: [
      {
        path: '/login',
        component: () => import('pages/LoginPage'),
      },
      { path: '', component: () => import('pages/IndexPage.vue') }
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
