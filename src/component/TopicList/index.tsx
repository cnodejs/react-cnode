import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'umi';
import { Space, Avatar, Tag, List } from 'antd';
import { TABS_MAP, TabType } from '@/constants';

import * as styles from './index.less';

const TopicList: React.FC<Props> = ({ dataSource, loading, loadMore }) => {
  return (
    <List
      loading={loading}
      dataSource={dataSource}
      loadMore={loadMore}
      renderItem={(item) => {
        const {
          id,
          title,
          last_reply_at,
          tab: _tab,
          top,
          author,
          reply_count,
          visit_count,
        } = item;

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
          <List.Item>
            <List.Item.Meta
              avatar={
                <Space>
                  <Link to={`/user/${loginname}`}>
                    <Avatar size="small" src={avatar_url} />
                  </Link>
                  {renderReplyVisit()}
                  {top ? (
                    <Tag color="#5BD8A6">置顶</Tag>
                  ) : (
                    category && (
                      <Tag color={category.color}>{category.name}</Tag>
                    )
                  )}
                </Space>
              }
              title={
                <Link to={`/topic/${id}`} className={styles.link}>
                  {title}
                </Link>
              }
            />
            <div>{dayjs(last_reply_at).fromNow()}</div>
          </List.Item>
        );
      }}
    />
  );
};

export default TopicList;

interface Props {
  dataSource?: TopicModel[];
  loading?: boolean;
  loadMore?: React.ReactNode;
}
