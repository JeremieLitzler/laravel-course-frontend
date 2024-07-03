import axios from 'axios';

export default defineNuxtPlugin(async (nuxtApp) => {
  axios.defaults.baseURL = 'https://laravel-backend-vueschool.madebyjeremie.fr';
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Accept'] = 'application/json';
  axios.defaults.withCredentials = true;

  // thanks to https://github.com/axios/axios/issues/6047#issuecomment-1786785122
  axios.interceptors.request.use((config) => {
    const token = decodeURIComponent(
      document.cookie.replace('XSRF-TOKEN=', '')
    );
    axios.defaults.headers['X-XSRF-TOKEN'] = token;

    return config;
  });

  await axios.get('/sanctum/csrf-cookie');
});
