import { boot } from 'quasar/wrappers'
import Axios from 'axios'
import {cfghttp} from '../utils/constants'

const axios = Axios.create({
  baseURL: cfghttp.BASE_URL,
  timeout: cfghttp.BASE_TIMEOUT,
  withCredentials:true
})
export default boot(({ app , store, router }) => {
  axios.interceptors.response.use(response => {
    store.commit("decrementAjaxRequestsCnt");
    return response
  }, error => {
    store.commit("decrementAjaxRequestsCnt");
    if (!error.response) {
      return Promise.reject({
        errorCode: -200,
        errorDescription: "",
        errorMessage: app.i18n.global.t("http.base_error")
      });
    }
    if (!error.response.data) {
      return Promise.reject({
        errorCode: -200,
        errorDescription: "",
        errorMessage: app.i18n.global.t("http.base_error")
      });
    }
    if (error.response.status === 401) {
      store.commit('clearUserSession');
      router.push('/login');
      return Promise.reject({
        errorCode: 401,
        errorDescription: "",
        errorMessage: app.i18n.global.t("http.session_timeout")
      });
    }
    console.log('403',error.response);
    if (error.response.status === 403) {
      store.commit('clearUserSession');
      router.push('/login');
      return Promise.reject({
        errorCode: 403,
        errorDescription: "",
        errorMessage: app.i18n.global.t("http.session_timeout")
      });
    }
    return Promise.reject({
      errorCode: error.response.data.ERROR.code,
      errorDescription: error.response.data.ERROR.description,
      errorMessage: error.response.data.ERROR.message
    });

  })

  axios.interceptors.request.use(function (request) {
      if (store.state.user !== null) {
        request.headers.Authorization = `Bearer ${store.state.user.token}`;
      }
      store.commit("incrementAjaxRequestsCnt");
      return request;
    },
    function (error) {
      return Promise.reject(error);
    })
  app.config.globalProperties.$axios = axios;
})
