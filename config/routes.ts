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
        component: '@/page/topic',
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
        component: '@/page/topic/create',
        access: 'canPostTopic',
      },
      {
        path: '/topic/:id',
        exact: true,
        component: '@/page/topic/detail',
      },
    ],
  },

  { component: '@/page/404' },
];

export default routes;
