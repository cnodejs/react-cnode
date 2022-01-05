import React from 'react';
import ProCard from '@ant-design/pro-card';

import { IRoute, Link } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { Affix, Button, Space, BackTop } from 'antd';
import { UpCircleOutlined } from '@ant-design/icons';

import UserInfo from './component/UserInfo';
import AppQrcode from './component/AppQrcode';

const getCurrentRoute = (route: IRoute, path: string): IRoute | undefined => {
  let target;

  if (route.exact && route.path === path) {
    return route;
  }

  if (!route.routes) {
    return;
  }

  for (const _route of route.routes) {
    target = getCurrentRoute(_route, path);
    if (target) {
      break;
    }
  }

  return target;
};

const BREADCRUMB_NAME_MAP = {
  user: '用户',
  topic: '话题',
};

const Layout: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const { route, location } = props;
  const currentRoute = getCurrentRoute(route, location.pathname);

  let headerConfig: any = {
    title: currentRoute?.title || currentRoute?.name,
  };

  const detailRegx = /\/(topic|user)\/(.*)/g;

  if (location.pathname.match(detailRegx)) {
    const paths = location.pathname.split('/');

    const id = paths.pop();
    const category = paths.pop();

    headerConfig = {
      title: null,
      breadcrumb: {
        itemRender: (route: { path: string; breadcrumbName: string }) => {
          return <Link to={route.path}>{route.breadcrumbName}</Link>;
        },
        routes: [
          {
            path: '/',
            breadcrumbName: '主页',
          },
          {
            path: '/',
            breadcrumbName: BREADCRUMB_NAME_MAP[category as 'user' | 'topic'],
          },
          {
            path: location.pathname,
            breadcrumbName: id,
          },
        ],
      },
    };
  }

  return (
    <PageContainer header={headerConfig}>
      <ProCard gutter={16} bordered={false} ghost>
        <ProCard bordered={false}>{props.children}</ProCard>
        <ProCard
          layout="center"
          bordered={false}
          ghost
          colSpan={{
            sm: '200px',
            md: '320px',
          }}
        >
          <Space size={16} direction="vertical" style={{ width: '100%' }}>
            <UserInfo />
            <AppQrcode />
          </Space>
        </ProCard>
      </ProCard>

      <Affix
        offsetBottom={50}
        style={{
          position: 'fixed',
          right: '24px',
        }}
      >
        {/* <Button
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <UpCircleOutlined />
          回到顶部
        </Button> */}
        <BackTop />
      </Affix>
    </PageContainer>
  );
};

export default Layout;

interface Props {
  route: IRoute;
  match: {
    isExact: boolean;
    path: string;
  };
  location: Location;
}
