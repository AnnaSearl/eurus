{{#if one}}
const pages = ['pages/index/index'];

module.exports.ali = {
  pages,
  window: {
    titleBarColor: '#FEFFFE',
  },
};

module.exports.wechat = {
  pages,
  window: {
    navigationBarBackgroundColor: '#FEFFFE',
  },
};

module.exports.toutiao = {
  pages,
  window: {
    navigationBarBackgroundColor: '#FEFFFE',
  },
};

module.exports.web = {
  pages,
  title: 'Annar Web',
};
{{else}}
module.exports = {
  pages: ['pages/index/index'],
  window: {
    navigationBarBackgroundColor: '#FEFFFE'
  }
};
{{/if}}
