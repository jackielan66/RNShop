import axios from 'axios'
import { api } from '../../config';


// 创建 axios 实例
const service = axios.create({
    timeout: api.timeout,
    baseURL: api.buyer,
});


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

// request interceptor
service.interceptors.request.use(config => {
    //   const token = Vue.ls.get(ACCESS_TOKEN)
    //   if (token) {
    //     config.headers['Access-Token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
    //   }
    return config
}, err)

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
