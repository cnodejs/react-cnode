import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/',
    exact: true,
    icon: 'home',
    name: '主页',
    component: '@/page/home',
    wrappers: ['@/layout/index'],
    hideInNav: false,
    hideInMenu: false,
  },
];

export default routes;
