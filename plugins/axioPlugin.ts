import axios from 'axios';

export default defineNuxtPlugin(async (nuxtApp) => {
  axios.defaults.baseURL = 'https://laravel-backend-vueschool.madebyjeremie.fr';
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Accept'] = 'application/json';
  axios.defaults.withCredentials = true;

  await axios.get('/sanctum/csrf-cookie');

  // thanks to https://github.com/axios/axios/issues/6047#issuecomment-1786785122
  axios.interceptors.request.use((config) => {
    console.log('interceptors > request', document.cookie);
    console.log('interceptors > request', document.cookie.split(';'));

    const token = decodeURIComponent(
      document.cookie.replace('XSRF-TOKEN=', '')
    );
    axios.defaults.headers['X-XSRF-TOKEN'] = token;

    return config;
  });
});
