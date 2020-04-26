/**
 * 收货地址相关API
 */

import { request, METHOD } from '../utils/request';

/**
 * 获取收货地址列表
 * @returns {AxiosPromise}
 */
export function getAddressList() {
    return request({
        url: 'members/addresses',
        method: METHOD.GET,
        needToken: true,
    });
}

/**
 * 添加收货地址
 * @param params 地址参数
 * @returns {AxiosPromise}
 */
export function addAddress(params) {
    return request({
        url: 'members/address',
        method: METHOD.POST,
        needToken: true,
        data: params,
    });
}

/**
 * 编辑地址
 * @param id 地址ID
 * @param params 地址参数
 * @returns {AxiosPromise}
 */
export function editAddress(id, params) {
    return request({
        url: `members/address/${id}`,
        method: METHOD.PUT,
        needToken: true,
        data: params,
    });
}

/**
 * 删除收货地址
 * @param id
 */
export function deleteAddress(id) {
    return request({
        url: `members/address/${id}`,
        method: METHOD.DELETE,
        needToken: true,
    });
}

/**
 * 设置默认地址
 * @param id
 */
export function setDefaultAddress(id) {
    return request({
        url: `members/address/${id}/default`,
        method: METHOD.PUT,
        needToken: true,
    });
}

/**
 * 获取某个地址详情
 * @param id
 */
export function getAddressDetail(id) {
    return request({
        url: `members/address/${id}`,
        method: METHOD.GET,
        loading: false,
        needToken: true,
    });
}
