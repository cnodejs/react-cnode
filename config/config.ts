import config from './basic';
import routes from './routes';

import { defineConfig } from 'umi';

export default defineConfig({
  singular: true,
  fastRefresh: {},
  mfsu: {},

  nodeModulesTransform: {
    type: 'none',
  },

  antd: {},

  theme: {
    '@primary-color': '#1DA57A',
  },

  dva: {
    immer: true,
  },

  layout: {
    name: config.title,
  },

  qiankun: {
    master: {
      apps: [],
    },
  },

  routes,
});
