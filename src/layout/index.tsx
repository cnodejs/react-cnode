import React from 'react';
import ProCard from '@ant-design/pro-card';

import { IRoute } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';

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

  if (location.pathname.startsWith('/topic/')) {
    return (
      <ProCard gutter={16} bordered={false}>
        <ProCard bordered={false}>{props.children}</ProCard>
        <ProCard
          title=""
          layout="center"
          bordered={false}
          colSpan={{
            xs: '50px',
            sm: '100px',
            md: '200px',
            lg: '300px',
            xl: '400px',
          }}
        ></ProCard>
      </ProCard>
    );
  }

  return (
    <PageContainer header={headerConfig}>
      <ProCard gutter={16} bordered={false}>
        <ProCard bordered={false}>{props.children}</ProCard>
        <ProCard
          title=""
          layout="center"
          bordered={false}
          colSpan={{
            xs: '50px',
            sm: '100px',
            md: '200px',
            lg: '300px',
            xl: '400px',
          }}
        ></ProCard>
      </ProCard>
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
