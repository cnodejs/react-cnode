import React, { useEffect } from 'react';
import dayjs from 'dayjs';

import { useHistory, useAccess } from 'umi';
import { Avatar, Tag, Space, Divider, Button } from 'antd';
import { useRequest, useReactive } from 'ahooks';
import { ProListMetas } from '@ant-design/pro-list';
import ProList from '@ant-design/pro-list';
import { ReloadOutlined, EditOutlined } from '@ant-design/icons';

import { TABS_MAP } from '@/constants';
import type { TabType } from '@/constants';

import * as API from '@/service/topic';
import * as styles from './index.less';

interface Props {}

const TopicList: React.FC<Props> = (props) => {
  const access = useAccess();
  const history = useHistory();

  const state = useReactive({
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

  const metas: ProListMetas = {
    avatar: {
      dataIndex: 'author.avatar_url',
      render: (_, entity) => {
        const { tab: _tab, author, reply_count, visit_count } = entity;

        const category = TABS_MAP[_tab as keyof typeof TABS_MAP] || {
          color: '#777',
          name: '未知',
        };

        return (
          <Space>
            <Avatar size="small" src={author.avatar_url} />
            <div
              style={{
                width: '96px',
                padding: '0 8px',
              }}
            >
              <span
                style={{
                  color: '#9e78c0',
                }}
              >
                {reply_count}
              </span>
              /<span>{visit_count}</span>
            </div>
            <Tag color={category.color}>{category.name}</Tag>
          </Space>
        );
      },
    },
    title: {
      dataIndex: 'title',
      valueType: 'text',
    },
    actions: {
      render: (_, entity) => {
        const { last_reply_at } = entity;
        return dayjs(last_reply_at).fromNow();
      },
    },
  };

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
      <ProList
        rowKey="id"
        showActions="always"
        dataSource={data.filter((item: any) => item?.author?.loginname)}
        loading={loading}
        metas={metas}
        className={styles.list}
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
        onRow={(record) => {
          return {
            onClick: () => {
              console.log('onClick', record);
              history.push(`/topic/${record.id}`);
            },
          };
        }}
      />
      <Divider type="horizontal" />
      {renderFooter()}
    </div>
  );
};

export default TopicList;
