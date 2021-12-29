import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';

export async function getInitialState() {
  return {
    currentUser: 'Suyi',
  };
}

export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings };
}): BasicLayoutProps => {
  return {
    // rightContentRender: () => <RightContent />,
    // footerRender: () => <Footer />,
    onPageChange: () => {
      // const { currentUser } = initialState;
      // const { location } = history;
      // 如果没有登录，重定向到 login
      // if (!currentUser && location.pathname !== '/user/login') {
      //   history.push('/user/login');
      // }
    },
    // menuHeaderRender: undefined,
    rightContentRender: () => {
      return (
        <div>
          <Avatar shape="square" size="small" icon={<UserOutlined />} />
        </div>
      );
    },

    layout: 'top',
    navTheme: 'light',
    headerHeight: 64,
  };
};
