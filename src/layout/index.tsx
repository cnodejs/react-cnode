import React from 'react';
import ProCard from '@ant-design/pro-card';

import { PageContainer } from '@ant-design/pro-layout';
import { BackTop, Space } from 'antd';
import { IRoute, Link } from 'umi';

import AppQrcode from './component/AppQrcode';
import UserInfo from './component/UserInfo';

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
    subTitle: currentRoute?.description,
  };

  const detailRegx = /\/(topic|user)\/(.*)/g;

  const isEdit = location.pathname.endsWith('/edit');

  if (location.pathname.match(detailRegx)) {
    const paths = location.pathname.split('/');

    if (isEdit) paths.pop();

    const id = paths.pop();
    const category = paths.pop();

    const routes = [
      {
        path: '/',
        breadcrumbName: '主页',
      },
      {
        path: '/',
        breadcrumbName: BREADCRUMB_NAME_MAP[category as 'user' | 'topic'],
      },
      {
        path: isEdit ? location.pathname.slice(0, -5) : location.pathname,
        breadcrumbName: id,
      },
    ];

    if (isEdit) {
      routes.push({
        path: location.pathname,
        breadcrumbName: '编辑',
      });
    }

    headerConfig = {
      title: null,
      breadcrumb: {
        itemRender: (route: { path: string; breadcrumbName: string }) => {
          return <Link to={route.path}>{route.breadcrumbName}</Link>;
        },
        routes,
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

      <BackTop />
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
