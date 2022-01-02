import React from 'react';
import { Link, history } from 'umi';
import { Avatar, Tooltip, Button } from 'antd';

import {
  DefaultFooter,
  BasicLayoutProps,
  MenuDataItem,
} from '@ant-design/pro-layout';

import config from '../config/basic';
import Brand from './component/Brand';

const RightContent: React.FC<{
  user?: UserModel;
}> = (props) => {
  const user = props?.user;

  if (!user) {
    return (
      <div className="cnode-header-right">
        <Button
          type="link"
          onClick={() => {
            history.push('/auth');
          }}
        >
          登录
        </Button>
      </div>
    );
  }

  const { loginname, avatar_url } = user;
  return (
    <div className="cnode-header-right">
      <Tooltip title={loginname}>
        <Avatar shape="square" size="small" src={avatar_url} />
      </Tooltip>
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
    navTheme: 'light',
    layout: 'top',
    headerHeight: 64,
    fixedHeader: true,
    contentWidth: 'Fluid',

    logo,
    title,

    menuHeaderRender: () => {
      return <Brand title={title} description={description} logo={logo} />;
    },

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

    rightContentRender: () => {
      return <RightContent user={initialState.user} />;
    },

    footerRender: () => (
      <DefaultFooter
        links={false}
        copyright={`${new Date().getFullYear()} - CNodejs.org`}
      />
    ),

    onPageChange: () => {},
  };
};

export default layoutConfig;
