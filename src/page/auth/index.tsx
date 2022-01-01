import React, { useState, useEffect } from 'react';
import { useModel, history, Link } from 'umi';
import { Form, Input, Checkbox, Button } from 'antd';
import { FORM_TYPE } from '@/constants';

import config from '@/config/';
import * as API from '@/service/user';

import styles from './index.less';

const AUTH_TYPE_MAP = {
  login: {
    switchType: '注册',
  },
  register: {
    switchType: '登录',
  },
};

const AuthPage: React.FC<Props> = () => {
  const { refresh, initialState } = useModel('@@initialState');
  const { login } = useModel('user');
  const [type, setType] = useState(FORM_TYPE.LOGIN);

  const { switchType } = AUTH_TYPE_MAP[type];

  useEffect(() => {
    if (initialState?.token) {
      history.push('/');
    }
  }, [initialState?.token]);

  const onFinish = async (values: any) => {
    const { accessToken } = values;

    if (type === FORM_TYPE.LOGIN) {
      const data = await API.verifyAccessToken({
        accesstoken: accessToken,
      });

      const { id, loginname, avatar_url } = data;

      login(
        {
          user: {
            id,
            loginname,
            avatar_url,
          },
          token: accessToken,
        },
        !!values.remember,
      );
      refresh();
    }
  };

  const handleChangeType = () => {
    const target =
      type === FORM_TYPE.LOGIN ? FORM_TYPE.REGISTER : FORM_TYPE.LOGIN;
    setType(target);
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

  const renderSwtichAuthType = () => {
    return (
      <Button type="link" onClick={handleChangeType}>
        {switchType}
      </Button>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>{renderTop()}</div>

        <div className={styles.main}>
          <Form
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            {/* <Form.Item
              label="用户名"
              name="loginname"
              rules={[
                {
                  required: true,
                  type: 'string',
                  pattern: /^[a-zA-Z]+(?:[._-]?[a-zA-Z0-9])*$/,
                  max: 32,
                  message: '用户名必填！',
                },
              ]}
              extra="必须以字母开头并且长度不可大于 32 位，可使用 '_'，'.' 或 '-' 连接"
            >
              <Input placeholder="用户名" />
            </Form.Item> */}

            <Form.Item
              label="令牌"
              name="accessToken"
              rules={[
                {
                  required: true,
                  message: '令牌必填！',
                },
              ]}
              extra="在 CNode.js 旧版网站设置页面可以看到自己的 AccessToken"
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住</Checkbox>
              </Form.Item>
              {/* {renderSwtichAuthType()} */}
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className={styles.btn}>
                提交
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

interface Props {}

export default AuthPage;
