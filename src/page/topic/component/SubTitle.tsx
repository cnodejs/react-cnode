import React from 'react';
import dayjs from 'dayjs';

import { Avatar, Divider, Space } from 'antd';

const SubTitle: React.FC<Props> = (props) => {
  const { author, create_at, visit_count, reply_count } = props;
  return (
    <Space size={0} split={<Divider type="vertical"></Divider>}>
      <Avatar size="small" src={author.avatar_url} alt={author.loginname} />
      <span>发布：{dayjs(create_at).format('YYYY-MM-DD hh:mm:ss')}</span>
      <span>浏览：{visit_count}</span>
      <span>回复：{reply_count}</span>
    </Space>
  );
};

export default SubTitle;

interface Props {
  create_at: Date;
  reply_count: number;
  visit_count: number;

  author: {
    loginname: string;
    avatar_url: string;
  };
}
