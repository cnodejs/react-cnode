import React from 'react';
import dayjs from 'dayjs';
import { useHistory, Link } from 'umi';
import { Space, Avatar, Tag } from 'antd';
import { ListToolBarProps } from '@ant-design/pro-table';
import ProList, { ProListMetas } from '@ant-design/pro-list';

import { MESSAGE_TYPE_MAP, MessageType } from '@/constants';

import * as styles from './index.less';

const MessageList: React.FC<Props> = ({
  dataSource,
  loading,
  toolbar,
  onClick,
}) => {
  const metas: ProListMetas = {
    avatar: {
      dataIndex: 'author.avatar_url',
      render: (_, entity: MessageModel) => {
        const { type: _type, author } = entity;
        const type = MESSAGE_TYPE_MAP[_type as MessageType];
        const { loginname, avatar_url } = author;

        return (
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
        );
      },
    },
    title: {
      dataIndex: 'title',
      valueType: 'text',
      render: (_, entity: MessageModel) => {
        const {
          id: messageId,
          topic: { id, title },
        } = entity;
        return (
          <Link
            to={`/topic/${id}`}
            className={styles.link}
            onClick={() => {
              onClick && onClick(messageId);
            }}
          >
            {title}
          </Link>
        );
      },
    },
    actions: {
      render: (_, entity: MessageModel) => {
        return dayjs(entity.create_at).fromNow();
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

export default MessageList;

interface Props {
  dataSource?: MessageModel[];
  loading?: boolean;
  toolbar?: ListToolBarProps;
  onClick?: (id: string) => void;
}
