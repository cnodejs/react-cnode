import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/auth',
    exact: true,
    layout: false,
    component: '@/page/auth',
  },
  {
    path: '/',
    exact: false,
    component: '@/layout/index',
    routes: [
      {
        path: '/',
        exact: true,
        icon: 'home',
        name: '主页',
        description:
          'CNode 社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究。',
        component: '@/page/topic',
      },
      {
        path: '/my/messages',
        exact: true,
        icon: 'message',
        title: '未读消息',
        access: 'canReadMessage',
        component: '@/page/message',
      },
      {
        path: '/about',
        exact: true,
        icon: 'info',
        name: '关于我们',
        component: '@/page/about',
      },
      {
        path: '/links',
        exact: true,
        icon: 'link',
        name: '友情链接',
        component: '@/page/links',
      },
      {
        path: '/api',
        exact: true,
        icon: 'api',
        name: 'API',
        component: '@/page/api',
      },
      {
        path: '/topic/create',
        exact: true,
        title: '新建话题',
        component: '@/page/topic/edit',
        access: 'canPostTopic',
      },
      {
        path: '/topic/:id',
        exact: true,
        component: '@/page/topic/detail',
      },
      {
        path: '/topic/:id/edit',
        exact: true,
        component: '@/page/topic/edit',
      },
      {
        path: '/user/:loginname',
        exact: true,
        component: '@/page/user/',
      },
    ],
  },

  { component: '@/page/404' },
];

export default routes;
