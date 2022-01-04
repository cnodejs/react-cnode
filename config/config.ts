import routes from './routes';

import { defineConfig } from 'umi';

export default defineConfig({
  // cnodejs.org
  favicon: '/images/favicon.ico',
  metas: [
    {
      name: 'keywords',
      content: 'nodejs, node, express, connect, socket.io',
    },
    {
      name: 'referrer',
      content: 'always',
    },
    {
      name: 'author',
      content: 'EDP@TaoBao',
    },
    {
      name: 'wb:webmaster',
      content: '617be6bd946c6b96',
    },
    {
      name: 'wb:webmaster',
      content: '617be6bd946c6b96',
    },
  ],
  links: [
    {
      type: 'image/x-icon',
      rel: 'icon',
      href: '//static2.cnodejs.org/public/images/cnode_icon_32.png',
    },
    {
      title: 'RSS',
      type: 'application/rss+xml',
      rel: 'alternate',
      href: 'https://cnodejs.org/rss',
    },
  ],

  // umi.js
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

  layout: {},

  qiankun: {
    master: {
      apps: [],
    },
  },

  routes,
});
