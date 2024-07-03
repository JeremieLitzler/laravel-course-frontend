import axios from 'axios';

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();

  axios.defaults.baseURL = config.public.appURL;
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Accept'] = 'application/json';
  const xsrfToken = await axios.get<string>('/sanctum/csrf-cookie', {
    baseURL: config.public.appURL,
  });
  console.log('xsrfToken', xsrfToken);

  axios.defaults.headers.common['XSRF-TOKEN'] = xsrfToken.data;
  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;
});
