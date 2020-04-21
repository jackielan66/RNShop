import { request, METHOD } from '../utils/request';




export function getGoodsList(parameter = { client_type: 'WAP' }) {
  return request({
    url: 'goods/search',
    method: METHOD.GET,
    params: parameter
  })
}
