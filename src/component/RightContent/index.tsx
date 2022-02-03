import { Avatar, Badge, Dropdown, Menu, Space } from 'antd';
import React from 'react';
import { Link, useModel } from 'umi';

const RightContent: React.FC<Props> = (props) => {
  const { user, logout } = useModel('user');
  const { count } = useModel('message');

  if (!user) {
    return (
      <div className="cnode-header-right">
        <Link to="/login">登录</Link>
      </div>
    );
  }

  const { loginname, avatar_url } = user;

  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to={`/user/${loginname}`}>个人资料</Link>
      </Menu.Item>
      <Menu.Item key="message">
        <Badge count={count} size="small">
          <Link to="/my/messages">未读消息</Link>
        </Badge>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <Link
          to="/"
          onClick={(e) => {
            e.preventDefault();
            logout();
          }}
        >
          退出登录
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="cnode-header-right">
      <Dropdown overlay={menu}>
        <Badge count={count} size="small">
          <Space size={8}>
            <Avatar shape="square" size="small" src={avatar_url} />
            <span>{loginname}</span>
          </Space>
        </Badge>
      </Dropdown>
    </div>
  );
};

export default RightContent;

interface Props {}
