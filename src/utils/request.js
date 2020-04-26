import axios from 'axios'
import { api } from '@/config';
import { store } from '../redux/store';
// import {
//     messageActions,
//     userActions,
//     tokenActions,
//     cartActions,
// } from '../redux/actions';
import qs from 'qs';

// 创建 axios 实例
const service = axios.create({
    timeout: api.timeout,
    baseURL: api.buyer,
});

// request interceptor
service.interceptors.request.use(config => {
    const { needToken } = config;
    const { token, user } = store.getState();
    // 获取访问Token
    let accessToken = token.access_token;
    // console.log(token, "token interceptors===")
    if (accessToken && needToken) {
        //去掉生产模式
        config.headers.Authorization = accessToken;
        // console.log('携带token:' + accessToken);
    }
    return config
}, err)


// request拦截器
// service.interceptors.request.use(async config => {
//     // console.log('请求：' + config.url);
//     const { needToken } = config;
//     // 如果是put/post请求，用qs.stringify序列化参数
//     const is_put_post = config.method === 'put' || config.method === 'post';
//     const is_json = config.headers['Content-Type'] === 'application/json';
//     if (is_put_post && is_json) {
//         config.data = JSON.stringify(config.data);
//     }
//     if (is_put_post && !is_json && config.url !== upload) {
//         config.data = qs.stringify(config.data, { arrayFormat: 'repeat' });
//     }
//     const { token, user } = store.getState();
//     // uuid
//     config.headers.uuid = user.uuid;
//     // referer
//     config.headers.Referer = api.web_domain;
//     // 获取访问Token
//     let accessToken = token.access_token;
//     if (accessToken && needToken) {
//         //去掉生产模式
//         config.headers.Authorization = accessToken;
//         // console.log('携带token:' + accessToken);
//     }
//     return config;
// });


const err = (error) => {
    if (error.response) {
        // const data = error.response.data
        // const token = Vue.ls.get(ACCESS_TOKEN)
        // if (error.response.status === 403) {
        //   notification.error({
        //     message: 'Forbidden',
        //     description: data.message
        //   })
        // }
        // if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
        //   notification.error({
        //     message: 'Unauthorized',
        //     description: 'Authorization verification failed'
        //   })
        //   if (token) {
        //     store.dispatch('Logout').then(() => {
        //       setTimeout(() => {
        //         window.location.reload()
        //       }, 1500)
        //     })
        //   }
        // }
    }
    return Promise.reject(error)
}


// response interceptor
service.interceptors.response.use((response) => {
    return response.data
}, err)



// installer.install(Vue)
export const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

export {
    service as request
}
