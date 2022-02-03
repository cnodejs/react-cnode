import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import { UserOutlined, LockOutlined, GithubOutlined } from '@ant-design/icons';

import config from '@/config/';
import * as styles from './index.less';
import { Link } from 'umi';
import { login } from '@/service/user';

const Login: React.FC<Props> = (props) => {
  const [form] = Form.useForm();

  const handleLogin = async () => {
    const values = form.getFieldsValue();
    console.log(values);

    await login(values);
  };

  const renderTop = () => (
    <>
      <div className={styles.header}>
        <Link to="/">
          <img alt="logo" className={styles.logo} src={config.logo} />
        </Link>
      </div>
      <div className={styles.desc}>{config.description}</div>
    </>
  );

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.top}>{renderTop()}</div>
        <Form name="basic" form={form}>
          <Form.Item required name="loginname">
            <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item name="pass" required>
            <Input
              prefix={<LockOutlined />}
              placeholder="请输入密码"
              type="password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              className={styles.submit}
              htmlType="submit"
              type="primary"
              onClick={handleLogin}
            >
              登录
            </Button>
          </Form.Item>

          <Form.Item label="其他登录方式">
            <Link to="/">
              <GithubOutlined />
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;

interface Props {}
