import React from 'react';
import dayjs from 'dayjs';

import { Avatar, Tag, Space } from 'antd';
import { useRequest, useReactive } from 'ahooks';
import { ProListMetas } from '@ant-design/pro-list';
import ProList from '@ant-design/pro-list';

import { TABS_MAP } from '@/constants';
import type { TabType } from '@/constants';

import * as API from '@/service/topic';
import * as styles from './index.module.less';

interface Props {
  tab?: TabType;
}

const Topics: React.FC<Props> = (props) => {
  const { tab = 'share' } = props;

  const state = useReactive({
    page: 1,
    limit: 20,
  });

  const { page, limit } = state;

  const { data, loading, refresh } = useRequest(
    async () => {
      const res = await API.queryTopics({
        tab,
        page,
        limit,
      });

      return res.data;
    },
    {
      refreshDeps: [tab, page, limit],
    },
  );

  const metas: ProListMetas = {
    avatar: {
      dataIndex: 'author.avatar_url',
      render: (_, entity) => {
        const { tab: _tab, author, reply_count, visit_count } = entity;

        const category = TABS_MAP[_tab as keyof typeof TABS_MAP];

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

  return (
    <ProList
      rowKey="id"
      showActions="always"
      dataSource={data}
      loading={loading}
      metas={metas}
      className={styles.list}
      request={async (params) => {
        state.page = params.current || page;
        state.limit = params.pageSize || limit;
        return Promise.resolve({});
      }}
      pagination={{
        total: 100,
        current: page,
        pageSize: limit,
        responsive: true,
      }}
    />
  );
};

export default Topics;
