import React from 'react';

import { useHistory, useAccess } from 'umi';
import { Button, Tabs, Space } from 'antd';
import { useRequest, useReactive } from 'ahooks';
import { ReloadOutlined, EditOutlined } from '@ant-design/icons';

import { TABS_MAP } from '@/constants';
import type { TabType } from '@/constants';

import * as API from '@/service/topic';
import * as styles from './index.less';
import TopicList from '@/component/TopicList';

interface Props {}

const { TabPane } = Tabs;

const TopicListPage: React.FC<Props> = (props) => {
  const access = useAccess();
  const history = useHistory();

  const state = useReactive<{
    tab: string;
    page: number;
    limit: number;
    hasNext: boolean;
    data: TopicModel[];
  }>({
    tab: 'share',
    page: 1,
    limit: 25,
    data: [],
    hasNext: true,
  });

  const { tab, page, limit, data, hasNext } = state;

  const { loading, refresh } = useRequest(
    async () => {
      const res = await API.listTopic({
        tab,
        page,
        limit,
      });

      if (res.data.length === 0) {
        state.hasNext = false;
      }

      if (state.data.length > 200) {
        state.data = state.data.slice(limit - 1);
      }

      state.data = state.data.concat(res.data);

      return res.data;
    },
    {
      refreshDeps: [tab, page, limit],
      debounceWait: 300,
    },
  );

  const onRefresh = () => {
    state.page = 1;
    state.data = [];
    state.hasNext = true;
    refresh();
  };

  const onLoadMore = () => {
    if (!hasNext) {
      return;
    }

    state.page = state.page + 1;
  };

  const onChangeTabKey = (key: React.Key | undefined) => {
    if (!key) {
      return;
    }

    state.tab = key as TabType;
    state.page = 1;
    state.data = [];
    state.hasNext = true;
    refresh();
  };

  const onCreate = () => {
    history.push('/topic/create');
  };

  const renderList = () => {
    return (
      <TopicList
        loading={loading}
        loadMore={
          <div className={styles.more}>
            {' '}
            {hasNext ? (
              <Button type="link" onClick={onLoadMore}>
                加载更多...
              </Button>
            ) : (
              '我是有底线的！'
            )}
          </div>
        }
        dataSource={data.filter((item: any) => item?.author?.loginname)}
      />
    );
  };

  return (
    <Tabs
      activeKey={tab}
      onChange={onChangeTabKey}
      tabBarExtraContent={
        <Space>
          <Button key="refresh" type="default" size="small" onClick={onRefresh}>
            <ReloadOutlined />
            刷新
          </Button>

          {access.canPostTopic ? (
            <Button key="create" type="primary" size="small" onClick={onCreate}>
              <EditOutlined />
              新建
            </Button>
          ) : null}
        </Space>
      }
    >
      {Object.entries(TABS_MAP).map(([tab, currentTab]) => {
        return (
          <TabPane tab={currentTab.name} key={tab}>
            {renderList()}
          </TabPane>
        );
      })}
    </Tabs>
  );
};

export default TopicListPage;
