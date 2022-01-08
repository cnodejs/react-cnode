import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'umi';
import { Space, Avatar, Tag, List } from 'antd';

import { MESSAGE_TYPE_MAP, MessageType } from '@/constants';

import * as styles from './index.less';

const MessageList: React.FC<Props> = ({ dataSource, loading, onClick }) => {
  return (
    <List
      loading={loading}
      dataSource={dataSource}
      renderItem={(item) => {
        const {
          id: messageId,
          type: _type,
          create_at,
          topic: { id, title },
          author: { loginname, avatar_url },
        } = item;

        const type = MESSAGE_TYPE_MAP[_type as MessageType];

        return (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Space size={16}>
                  <div
                    style={{
                      width: '200px',
                    }}
                  >
                    <Link to={`/user/${loginname}`} className={styles.link}>
                      <Space size={8}>
                        <Avatar size="small" src={avatar_url} />
                        <span>{loginname}</span>
                      </Space>
                    </Link>
                  </div>

                  <Tag color={type.color}>{type.name}</Tag>
                </Space>
              }
              title={
                <Link
                  to={`/topic/${id}`}
                  className={styles.link}
                  onClick={() => {
                    onClick && onClick(messageId);
                  }}
                >
                  {title}
                </Link>
              }
            />
            <div>{dayjs(create_at).fromNow()}</div>
          </List.Item>
        );
      }}
    />
  );
};

export default MessageList;

interface Props {
  dataSource?: MessageModel[];
  loading?: boolean;
  onClick?: (id: string) => void;
}
