import React from 'react';
import { useModel } from 'umi';
import { Divider } from 'antd';
import ProCard from '@ant-design/pro-card';
import MessageList from '@/component/MessageList';

const MessagePage: React.FC<Props> = (props) => {
  const { message, unreadMessage } = useModel('message');

  console.debug('===message', message);
  console.debug('===unreadMessage', unreadMessage);

  const renderUnreadMessage = () => {
    if (unreadMessage?.length === 0) {
      return <span>暂无新消息</span>;
    }

    return <MessageList dataSource={unreadMessage} />;
  };

  return (
    <div>
      <ProCard title="未读消息">{renderUnreadMessage()}</ProCard>
      <Divider />
      <ProCard title="已读消息">
        <MessageList dataSource={message} />
      </ProCard>
    </div>
  );
};

export default MessagePage;

interface Props {}
