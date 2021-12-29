import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},

  antd: {},

  // plugins
  layout: {
    name: 'CNode.js',
    locale: false,
  },

  routes: [{ path: '/', component: '@/pages/index' }],
});
