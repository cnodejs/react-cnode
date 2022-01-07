import React from 'react';
import { useModel } from 'umi';
import { useRequest } from 'ahooks';
import { Avatar, Space } from 'antd';
import ProCard from '@ant-design/pro-card';

import * as API from '@/service/user';

const UserInfo: React.FC<Props> = (props) => {
  const { user } = useModel('user');

  if (!user) {
    return null;
  }

  const { loginname, avatar_url } = user;

  const { data } = useRequest(
    async () => {
      if (!loginname) {
        return;
      }

      const res = await API.loadUser({ loginname });
      return res.data;
    },
    {
      refreshDeps: [loginname],
    },
  );

  const renderMore = () => {
    if (!data) {
      return null;
    }

    return (
      <div style={{ padding: '8px 0' }}>
        <span>积分：{data?.score}</span>
      </div>
    );
  };

  return (
    <ProCard title="个人信息" headerBordered>
      <Space size={8}>
        <Avatar shape="square" size="small" src={avatar_url} />
        <span>{loginname}</span>
      </Space>
      {renderMore()}
    </ProCard>
  );
};

export default UserInfo;

interface Props {}
