import { showLoading, hideLoading, showToast, getStorageSync } from 'remax/ali';
import to from './to';
import sync from './sync';
import { BASE_API_URL, AGENT_ID } from '../config';
import get from 'lodash-es/get';
import { Obj } from '@/types/common';

export interface HttpRequestProps {
  url: string;
  method: string;
  headers: object;
  data?: string | null;
  dataType?: string;
  success?: (res: any) => void;
  fail?: (res: any) => void;
}

export interface RequestProps {
  api?: string;
  method?: string;
  loading?: boolean;
  data?: Obj;
  header?: Obj;
  url: string;
}

const httpRequest = (options: HttpRequestProps) => {
  return new Promise((resolve) => {
    dd.httpRequest({
      dataType: 'json',
      success: function(res: any) {
        resolve(res)
      },
      fail: function(res: any) {
        resolve(res)
      },
      ...options,
    })
  })
};

const request = async (params: RequestProps) => {
  const options = {
    api: BASE_API_URL,
    method: 'GET',
    loading: true,
    data: {},
    ...params,
  }
  options.method = options.method.toUpperCase();
  if (options.loading) {
    await to(showLoading());
  }
  const url = options.api + options.url;
  const [err, res] = await to(httpRequest({
    url,
    data: options.method === 'GET' ? null : JSON.stringify(options.data),
    method: options.method,
    headers: {
      "Content-Type": "application/json",
      "User-Info-Id": getStorageSync({key: 'userInfoId'}).data || "******",
      "Agent-Id": AGENT_ID,
      ...options.header,
    },
  }));
  if (options.loading) {
    hideLoading();
    // await to(sync(hideLoading)); // 不用这个，因为hideLoading没有success和fail这两个回调函数
  }
  if (err) {
    await showToast({
      type: 'none',
      content: '请求发送失败',
      duration: 2000,
    });
    return;
  }
  let result = null;
  const { status, data } = res;
  const code = get(data, 'code');

  if (status !== 200) {
    try {
      await showToast({
        type: 'none',
        content: '服务异常：' + JSON.stringify(data),
        duration: 2000,
      });
    } catch (error) {
      await showToast({
        type: 'none',
        content: '解析字符串失败，错误：' + JSON.stringify(error),
        duration: 2000,
      });
    }
  }
  if (status === 200 && code !== 8000) {
    await showToast({
      type: 'none',
      content: get(data, 'msg'),
      duration: 2000,
    });
  }
  if (status === 200 && code === 8000) {
    result = data.result || {};
  }
  return result;
}

export default request;

