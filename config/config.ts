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
  hash: true,
  singular: true,

  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/',

  fastRefresh: {},
  mfsu: {},
  esbuild: {},
  webpack5: {},

  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },

  targets: {
    chrome: 79,
    firefox: false,
    safari: false,
    edge: false,
    ios: false,
  },

  externals: {
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
    antd: 'window.antd',
    dayjs: 'window.dayjs',
    '@ant-design/icons': 'window.icons',
    'markdown-it': 'window.markdownit',
    'react-markdown-editor-lite': 'window.ReactMarkdownEditorLite',
  },

  styles:
    process.env.NODE_ENV === 'development'
      ? [
          '//cdn.jsdelivr.net/npm/antd@4.x/dist/antd.css',
          '//cdn.jsdelivr.net/npm/react-markdown-editor-lite@1.x/lib/index.css',
        ]
      : [
          '//cdn.jsdelivr.net/npm/antd@4.x/dist/antd.min.css',
          '//cdn.jsdelivr.net/npm/react-markdown-editor-lite@1.x/lib/index.css',
        ],

  scripts:
    process.env.NODE_ENV === 'development'
      ? [
          '//cdn.jsdelivr.net/npm/react@17.x/umd/react.development.js',
          '//cdn.jsdelivr.net/npm/react-dom@17.x/umd/react-dom.development.js',
          '//cdn.jsdelivr.net/npm/antd@4.x/dist/antd.js',
          '//cdn.jsdelivr.net/npm/@ant-design/icons@4.x/dist/index.umd.js',
          '//cdn.jsdelivr.net/npm/dayjs@1.x/dayjs.min.js',
          '//cdn.jsdelivr.net/npm/react-markdown-editor-lite@1.x/lib/index.js',
        ]
      : [
          '//cdn.jsdelivr.net/npm/react@17.x/umd/react.production.min.js',
          '//cdn.jsdelivr.net/npm/react-dom@17.x/umd/react-dom.production.min.js',
          '//cdn.jsdelivr.net/npm/antd@4.x/dist/antd.min.js',
          '//cdn.jsdelivr.net/npm/@ant-design/icons@4.x/dist/index.umd.min.js',
          '//cdn.jsdelivr.net/npm/dayjs@1.x/dayjs.min.js',
          '//cdn.jsdelivr.net/npm/react-markdown-editor-lite@1.x/lib/index.js',
        ],

  antd: {},

  theme: {
    '@primary-color': '#1DA57A',
  },

  dva: {
    immer: true,
  },

  layout: {},

  locale: false,

  qiankun: {
    master: {
      apps: [],
    },
  },

  routes,
});
