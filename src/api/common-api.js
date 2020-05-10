/**
 * 公共API
 */
import { store } from '../redux/store';
import { request, METHOD } from '../utils/request';
import { api } from '../config';

/**
 * 获取图片验证码URL
 * @param type
 * @param uuid
 * @returns {string}
 */
export function getValidateCodeUrl(type, uuid) {
    if (!type) {
        return '';
    }
    if (!uuid) {
        uuid = store.getState().user.uuid;
    }
    return `${api.base}/captchas/${uuid}/${type}?r=${new Date().getTime()}`;
}

/**
 * 获取站点设置
 */
export function getSiteData() {
    return request({
        url: `${api.base}/site-show`,
        method: METHOD.GET,
    });
}

/**
 * 记录浏览量【用于统计】
 */
export function recordViews(url) {
    return request({
        url: 'view',
        method: METHOD.GET,
        params: {
            url,
            uuid: store.getState().user.uuid,
        },
    });
}

/**
 * 获取地区数据
 * @param id
 */
export function getRegionsById(id=0) {
    return request({
        url: `${api.base}/regions/${id}/children`,
        method: METHOD.GET,
        message: false,
    });
}

/**
 * 文件上传
 * @type {string}
 */
export const upload = api.base + '/uploaders';
