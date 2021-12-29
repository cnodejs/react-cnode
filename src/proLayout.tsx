import React from 'react';
import { Link } from 'umi';
import {
  DefaultFooter,
  BasicLayoutProps,
  MenuDataItem,
} from '@ant-design/pro-layout';

import Brand from '@/component/Brand';
import config from '../config/basic';

const RightRender = () => (
  <div style={{ marginRight: '24px' }}>{/* <SelectLang /> */}</div>
);

const layoutConfig = (): BasicLayoutProps => {
  return {
    // common
    navTheme: 'light',
    layout: 'top',
    headerHeight: 80,
    fixedHeader: false,
    logo: (
      <Brand
        logo={config.logo}
        title={config.title}
        description={config.description}
      />
    ),
    contentWidth: 'Fluid',
    // waterMarkProps: {
    //   content: config.title,
    // },

    // heander
    menuDataRender: (menuData: MenuDataItem[]) => {
      const menus: MenuDataItem[] = [];
      const apps: MenuDataItem[] = [];
      menuData.forEach((item) => {
        if (!item.microApp) {
          menus.push(item);
          return;
        }

        apps.push({
          ...item,
          name: item.microApp,
          title: item.microApp,
        });
      });

      return [...menus, ...apps];
    },

    menuItemRender: (item) =>
      item.path && <Link to={item.path}>{item.name}</Link>,

    // right
    rightContentRender: RightRender,

    // footer
    footerRender: () => (
      <DefaultFooter
        links={false}
        copyright={`${new Date().getFullYear()} - CNodejs.org`}
      />
    ),
  };
};

export default layoutConfig;
