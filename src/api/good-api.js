/**
 * 商品相关API
 */
import { request, METHOD } from '../utils/request';



/**
 * 获取商品详情
 * @param goods_id 商品ID
 * @returns {AxiosPromise}
 */
export function getGoods(goods_id) {
  return request({
    url: `goods/${goods_id}`,
    method: METHOD.GET,
  });
}

/**
 * 获取商品列表
 * @param params
 * @returns {AxiosPromise}
 */
export function getGoodsList(params) {
  return request({
    url: 'goods/search',
    method: METHOD.GET,
    params,
  });
}

/**
 * 获取商品选择器
 * @param params
 */
export function getGoodsSelector(params) {
  return request({
    url: 'goods/search/selector',
    method: METHOD.GET,
    params,
  });
}

/**
 * 获取商品关键字对应商品数量
 * @param keyword
 */
export function getKeywordNum(keyword) {
  return request({
    url: 'goods/search/words',
    method: METHOD.GET,
    loading: false,
    params: { keyword },
  });
}

/**
 * 获取商品sku列表
 * @param goods_id
 */
export function getGoodsSkus(goods_id) {
  return request({
    url: `goods/${goods_id}/skus`,
    method: METHOD.GET,
    loading: false,
  });
}

/**
 * 获取标签商品
 * @param seller_id 卖家id
 * @param mark      标签 hot：热卖 new：新品 recommend：推荐
 * @param num       获取个数
 */
export function getTagGoods(seller_id, mark = 'hot', num = 5) {
  return request({
    url: `goods/tags/${mark}/goods`,
    method: METHOD.GET,
    loading: false,
    params: {
      seller_id,
      mark,
      num,
    },
  });
}

/**
 * 获取标签商品数量
 * @param shop_id
 * @returns {*|*}
 */
export function getTagGoodsNum(shop_id) {
  return request({
    url: `goods/tags/${shop_id}/goods-num`,
    method: METHOD.GET,
    loading: false,
  });
}

/**
 * 获取商品分类
 * @param parent_id
 */
export function getCategory(parent_id = 0) {
  return request({
    url: `goods/categories/${parent_id}/children`,
    method: METHOD.GET,
    loading: false,
  });
}

/**
 * 查看商品是否在配送区域 1 有货 0 无货
 * @param goods_id
 * @param area_id
 */
export function getGoodsShip(goods_id, area_id) {
  return request({
    url: `goods/${goods_id}/area/${area_id}`,
    method: METHOD.GET,
  });
}

