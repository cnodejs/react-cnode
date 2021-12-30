import React from 'react';
import { Link } from 'umi';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import {
  DefaultFooter,
  BasicLayoutProps,
  MenuDataItem,
} from '@ant-design/pro-layout';

import { InitialState } from './app';

import config from '../config/basic';
import Brand from './component/Brand';

const RightContent: React.FC<any> = () => {
  return (
    <div className="cnode-header-right">
      <Avatar shape="square" size="small" icon={<UserOutlined />} />
    </div>
  );
};

const layoutConfig = ({
  initialState,
}: {
  initialState: InitialState;
}): BasicLayoutProps => {
  const { title, logo, description } = config;
  return {
    // common
    navTheme: 'light',
    layout: 'top',
    headerHeight: 80,
    fixedHeader: false,
    contentWidth: 'Fluid',

    logo,
    title,

    // waterMarkProps: {
    //   content: config.title,
    // },

    menuHeaderRender: () => {
      return <Brand title={title} description={description} logo={logo} />;
    },

    // heander
    menuDataRender: (menuData: MenuDataItem[]) => {
      let menus: MenuDataItem[] = [];
      const apps: MenuDataItem[] = [];
      menuData.forEach((item) => {
        if (item.path === '/' && item.exact !== true) {
          menus = menus.concat(item.children);
          return;
        }

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
    rightContentRender: () => {
      return <RightContent />;
    },

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
