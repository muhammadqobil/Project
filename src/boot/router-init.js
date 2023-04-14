// import {boot} from "quasar/wrappers";
//
// import {setPath} from "src/store/mutations";
//
// export default ({app, router, store, Vue}) => {
//   router.beforeResolve((to, from, next) => {
//     console.log(1)
//     store.commit('setLoading', true);
//     next();
//   })
//
//   router.beforeEach((to, from, next) => {
//     store.commit('setLoading', true);
//
//     if (store.state.user === null){
//       if (to.path === '/login' || to.path.startsWith("/vgdo-main/tech-revision/card") || to.path.startsWith("/vgdo-main/prophylaxis-act/card")){
//         next();
//         return;
//       } else {
//         setPath(store.state, to.path);
//         next('/login');
//         return;
//       }
//     }
//
//     next();
//   });
//
//   router.afterEach((to, from) => {
//     store.commit('setCurrentRouteName', to.name ? to.name : '');
//     store.commit('setCurrentRouteCategoryName', to.matched[0] ? to.matched[0].name : '');
//     setTimeout(() => {
//       store.commit('setLoading', false);
//     }, 0)
//   });
//   router.onReady(() => {
//     store.commit('setLoading', true);
//   });
// }
