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

/**
* 获取首页商品分类
* @param parent_id
*/
export function getCategory(parent_id = 0) {
  return request({
    url: `goods/categories/${parent_id}/children`,
    method: METHOD.GET
  });
}
