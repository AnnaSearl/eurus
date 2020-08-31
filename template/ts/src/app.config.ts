{{#if one}}
const pages = ['pages/index/index'];
const color = '#FEFFFE';

import { AppConfig as WechatAppConfig } from 'remax/wechat';
import { AppConfig as AliAppConfig } from 'remax/ali';
import { AppConfig as ToutiaoAppConfig } from 'remax/toutiao';
import { AppConfig as WebAppConfig } from 'remax/web';

export const wechat: WechatAppConfig = {
  pages,
  window: {
    navigationBarBackgroundColor: color,
  },
};

export const ali: AliAppConfig = {
  pages,
  window: {
    defaultTitle: 'Remax One Ali',
    titleBarColor: color,
  },
};

export const toutiao: ToutiaoAppConfig = {
  pages,
  window: {
    navigationBarBackgroundColor: color,
  },
};

export const web: WebAppConfig = {
  pages,
  title: 'One Web',
};
{{else}}
import { AppConfig } from "remax/{{platform}}";

const config: AppConfig = {
  pages: ['pages/index/index'],
  window: {
    navigationBarBackgroundColor: '#FEFFFE',
  }
};

export default config;
{{/if}}
