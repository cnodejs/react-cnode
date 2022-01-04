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

  analytics: {
    ga: 'UA-41753901-5',
  },

  // umi.js
  singular: true,

  fastRefresh: {},

  mfsu: {},

  externals: {
    react: 'window.React',
    'react-dom': 'ReactDOM',
    antd: 'antd',
    dayjs: 'dayjs',
  },

  styles:
    process.env.NODE_ENV === 'development'
      ? ['//unpkg.com/antd@4.x/dist/antd.css']
      : ['//unpkg.com/antd@4.x/dist/antd.min.css'],

  scripts:
    process.env.NODE_ENV === 'development'
      ? [
          '//unpkg.com/react@17.x/umd/react.development.js',
          '//unpkg.com/react-dom@17.x/umd/react-dom.development.js',
          '//unpkg.com/antd@4.x/dist/antd.js',
          '//unpkg.com/dayjs@1.x/dayjs.min.js',
        ]
      : [
          '//unpkg.com/react@17.x/umd/react.production.min.js',
          '//unpkg.com/react-dom@17.x/umd/react-dom.production.min.js',
          '//unpkg.com/antd@4.x/dist/antd.min.js',
          '//unpkg.com/dayjs@1.x/dayjs.min.js',
        ],

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
