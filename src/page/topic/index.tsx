import React, { useEffect } from 'react';

import { useHistory, useAccess } from 'umi';
import { Divider, Button } from 'antd';
import { useRequest, useReactive } from 'ahooks';
import { ReloadOutlined, EditOutlined } from '@ant-design/icons';

import { TABS_MAP } from '@/constants';
import type { TabType } from '@/constants';

import * as API from '@/service/topic';
import * as styles from './index.less';
import TopicList from '@/component/TopicList';

interface Props {}

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
      const res = await API.queryTopicList({
        tab,
        page,
        limit,
      });

      if (res.data.length < limit) {
        state.hasNext = false;
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

  const onReachEnd = () => {
    if (!hasNext) {
      return;
    }

    state.page = state.page + 1;
  };

  useEffect(() => {
    if (loading) {
      return;
    }

    const onScroll = () => {
      const scrollHeight = document.body.scrollHeight;
      const offsetHeight = document.body.offsetHeight;
      const pageYOffset = window.pageYOffset;

      // console.debug('===pageYOffset', pageYOffset);
      // console.debug('===offsetHeight', offsetHeight);
      // console.debug('===scrollHeight', scrollHeight);

      if (pageYOffset + offsetHeight === scrollHeight) {
        // console.log('===onReachEnd', hasNext, loading);
        onReachEnd();
      }
    };

    document.addEventListener('scroll', onScroll, false);

    return () => {
      document.removeEventListener('scroll', onScroll, false);
    };
  }, [loading]);

  const renderFooter = () => {
    return (
      <div className={styles.footer}>
        {' '}
        {hasNext ? '加载更多...' : '我是有底线的！'}
      </div>
    );
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

  const actions = [
    <Button key="refresh" type="default" size="small" onClick={onRefresh}>
      <ReloadOutlined />
      刷新
    </Button>,
  ];

  if (access.canPostTopic) {
    actions.push(
      <Button key="create" type="primary" size="small" onClick={onCreate}>
        <EditOutlined />
        新建
      </Button>,
    );
  }

  return (
    <div>
      <TopicList
        loading={loading}
        dataSource={data.filter((item: any) => item?.author?.loginname)}
        toolbar={{
          menu: {
            type: 'tab',
            activeKey: tab,
            items: Object.entries(TABS_MAP).map(([tab, currentTab]) => {
              return {
                key: tab,
                label: <span>{currentTab.name}</span>,
              };
            }),
            onChange: onChangeTabKey,
          },
          actions,
        }}
      />
      <Divider type="horizontal" />
      {renderFooter()}
    </div>
  );
};

export default TopicListPage;
