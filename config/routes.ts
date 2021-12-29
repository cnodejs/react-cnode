import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/',
    exact: true,
    icon: 'home',
    name: 'Home',
    title: '主页',
    component: '@/page/home',
    // access: 'canReadCommon',
    hideInNav: false,
    hideInMenu: false,
  },
];

export default routes;
