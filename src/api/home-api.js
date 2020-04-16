import { request, METHOD } from '../utils/request';



export function getFocusPictures(parameter = { client_type: 'WAP' }) {
    return request({
        url: 'focus-pictures',
        method: METHOD.GET,
        params: parameter
    })
}

/**
 * 获取导航列表
 */
export function getSiteMenu(parameter = { client_type: 'MOBILE' }) {
    return request({
      url: 'pages/site-navigations',
      method: METHOD.GET,
      params: parameter
    });
  }
