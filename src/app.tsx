import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh';

import { MicroApp, IRoute, request as requestClient, RequestConfig } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
// import { BASE_URL } from './constants';
import { loadInitialState } from '@/util';
import proLayout from './layout';

dayjs.locale('zh');
dayjs.extend(relativeTime);

const qiankunApps: QiankunApp[] = [];

export async function getInitialState(): Promise<InitialState> {
  const initialState = loadInitialState();
  return initialState;
}

export const layout = proLayout;

export const qiankun = async () => {
  try {
    // const params = { method: 'get', json: {} };
    // const { apps } = await requestClient<{
    //   apps: QiankunApp[];
    // }>(`${BASE_URL}/getFeConfig`, params);

    // console.log('===getFeConfig', apps);

    // apps
    //   .filter(({ type }) => type === 'App')
    //   .sort((appA, appB) => appA.order - appB.order)
    //   .forEach((app) => qiankunApps.push(app));

    return {
      apps: [],
    };
  } catch (error) {
    return {};
  }
};

export const patchRoutes = ({ routes }: { routes: Array<IRoute> }) => {
  const root = routes[0];

  qiankunApps.forEach((item) => {
    const { name, path, locale, remark } = item;
    if (!root.routes) {
      return;
    }

    root.routes.push({
      name,
      path,
      locale: locale || '',
      exact: true,
      hideInMenu: false,
      hideInNav: false,
      component: (props: any) => {
        return (
          <PageContainer content={remark}>
            <MicroApp name={name} data={{ props }} />
          </PageContainer>
        );
      },
    });
  });
};

export const request: RequestConfig = {
  timeout: 6 * 1000,
  errorConfig: {},
  middlewares: [],
  requestInterceptors: [],
  responseInterceptors: [],
};
