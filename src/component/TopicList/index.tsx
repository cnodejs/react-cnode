import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'umi';
import { Space, Avatar, Tag } from 'antd';
import { ListToolBarProps } from '@ant-design/pro-table';
import ProList, { ProListMetas } from '@ant-design/pro-list';

import { TABS_MAP, TabType } from '@/constants';

import * as styles from './index.less';

const TopicList: React.FC<Props> = ({ dataSource, loading, toolbar }) => {
  const metas: ProListMetas = {
    avatar: {
      dataIndex: 'author.avatar_url',
      render: (_, entity: TopicModel) => {
        const { tab: _tab, author, reply_count, visit_count, top } = entity;

        const category = TABS_MAP[_tab as TabType];
        const { loginname, avatar_url } = author;

        const renderReplyVisit = () =>
          typeof visit_count === 'number' && (
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
          );

        return (
          <Space>
            <Link to={`/user/${loginname}`}>
              <Avatar size="small" src={avatar_url} />
            </Link>
            {renderReplyVisit()}
            {top ? (
              <Tag color="#5BD8A6">置顶</Tag>
            ) : (
              category && <Tag color={category.color}>{category.name}</Tag>
            )}
          </Space>
        );
      },
    },
    title: {
      dataIndex: 'title',
      valueType: 'text',
      render: (_, entity: TopicModel) => {
        const { id, title } = entity;
        return <Link to={`/topic/${id}`}>{title}</Link>;
      },
    },
    actions: {
      render: (_, entity: TopicModel) => {
        const { last_reply_at } = entity;
        return dayjs(last_reply_at).fromNow();
      },
    },
  };

  return (
    <ProList
      rowKey="id"
      showActions="always"
      dataSource={dataSource}
      loading={loading}
      metas={metas}
      className={styles.list}
      toolbar={toolbar}
    />
  );
};

export default TopicList;

interface Props {
  dataSource?: TopicModel[];
  loading?: boolean;
  toolbar?: ListToolBarProps;
}
