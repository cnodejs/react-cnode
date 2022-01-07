import React from 'react';
import ProCard from '@ant-design/pro-card';

import { IRoute, Link } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { Affix, Button } from 'antd';
import { UpCircleOutlined } from '@ant-design/icons';

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

const Layout: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const { route, location } = props;
  const currentRoute = getCurrentRoute(route, location.pathname);

  let headerConfig: any = {
    title: currentRoute?.title || currentRoute?.name,
  };

  const topicDetailRegx = /\/topic\/([a-f0-9]){24}/g;

  if (location.pathname.match(topicDetailRegx)) {
    const topicBreadcrumbName = location.pathname.split('/').pop();

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
            path: location.pathname,
            breadcrumbName: topicBreadcrumbName,
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
            xs: '50px',
            sm: '100px',
            md: '200px',
            lg: '300px',
            xl: '400px',
          }}
        >
          <UserInfo />
        </ProCard>
      </ProCard>
      <Affix
        offsetBottom={50}
        style={{
          position: 'fixed',
          right: '24px',
        }}
      >
        <Button
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <UpCircleOutlined />
          回到顶部
        </Button>
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
