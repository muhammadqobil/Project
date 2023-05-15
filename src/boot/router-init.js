import {boot} from "quasar/wrappers";

export default boot(({app, router, store, Vue})=> {
  router.beforeResolve((to, from, next) => {
    store.commit('setLoading', true);
    next();
  })

  router.beforeEach((to, from, next) => {
    store.commit('setLoading', true);
    if (store.state.user === null){
      if (to.path === '/login'){
        next();
        return;
      } else {
        next('/login');
        return;
      }
    }

    next();
  });

})
