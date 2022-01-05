import React from 'react';
import dayjs from 'dayjs';
import { useHistory } from 'umi';
import { Space, Avatar, Tag } from 'antd';
import { ListToolBarProps } from '@ant-design/pro-table';
import ProList, { ProListMetas } from '@ant-design/pro-list';

import { MESSAGE_TYPE_MAP, MessageType } from '@/constants';

import * as styles from './index.less';

const MessageList: React.FC<Props> = ({ dataSource, loading, toolbar }) => {
  const history = useHistory();

  const metas: ProListMetas = {
    avatar: {
      dataIndex: 'author.avatar_url',
      render: (_, entity: MessageModel) => {
        const { type: _type, author } = entity;
        const type = MESSAGE_TYPE_MAP[_type as MessageType];

        return (
          <Space size={16}>
            <div
              style={{
                width: '200px',
              }}
            >
              <Space size={8}>
                <Avatar size="small" src={author.avatar_url} />
                <span>{author.loginname}</span>
              </Space>
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
        return entity.topic.title;
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
      onRow={(record: MessageModel) => {
        return {
          onClick: () => {
            history.push(`/topic/${record.topic.id}`);
          },
        };
      }}
    />
  );
};

export default MessageList;

interface Props {
  dataSource?: MessageModel[];
  loading?: boolean;
  toolbar?: ListToolBarProps;
}
