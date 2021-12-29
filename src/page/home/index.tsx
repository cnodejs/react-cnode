import React from 'react';
import { Tabs } from 'antd';
import Topics from '@/component/Topic';

import { TABS_MAP } from '@/constants';
import type { TabType } from '@/constants';

const { TabPane } = Tabs;

const Home: React.FC<Props> = () => {
  const renderDetail = (tab: string) => {
    return <Topics tab={tab as TabType} />;
  };

  return (
    <Tabs>
      {Object.keys(TABS_MAP).map((tab: string) => {
        const currentTab = TABS_MAP[tab as TabType];
        return (
          <TabPane key={tab} tab={currentTab.name}>
            {renderDetail(tab)}
          </TabPane>
        );
      })}
    </Tabs>
  );
};

export default Home;

interface Props {}
