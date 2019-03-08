import request from '@/utils/request';
import { stringify } from 'qs';

// 登录
export async function userLogin(params) {
  return request('/sysUser/login', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 登出
export async function userLogout(params) {
  return request(`/sysUser/logout?${stringify(params)}`);
}
