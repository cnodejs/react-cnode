import React from 'react';
import { useModel, useHistory, useParams, useRequest } from 'umi';
import { Form, Input, Select, Button, Space } from 'antd';
import { TABS_MAP } from '@/constants';

import Markdown from '@/component/Markdown';

import * as API from '@/service/topic';
import * as styles from './index.less';

const TopicEditPage: React.FC<Props> = (props) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const { initialState } = useModel('@@initialState');
  const { user } = useModel('user');

  const token = initialState?.token;

  const { id } = useParams<{ id?: string }>();

  useRequest(
    async () => {
      if (!id) return;
      const { data } = await API.loadTopic({
        id,
        mdrender: false,
      });

      if (data.author_id !== user?.id) {
        history.push(location.pathname.replace(/\/edit$/, ''));
        return;
      }

      form.setFieldsValue({
        title: data.title,
        content: data.content,
        tab: data.tab,
      });
    },
    {
      ready: !!id,
    },
  );

  const onFinish = async (values: any) => {
    if (!token) {
      return;
    }

    if (id) {
      await API.updateTopic({
        topic_id: id,
        ...values,
        accesstoken: token,
      });
    } else {
      await API.createTopic({
        ...values,
        accesstoken: token,
      });
    }

    onReset();

    history.push('/');
  };

  const onReset = () => {
    form.resetFields();
  };

  const tabs = Object.entries(TABS_MAP).map(([value, info]) => {
    return {
      label: info.name,
      value,
    };
  });

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={{
          tab: tabs[1].value,
        }}
      >
        <Form.Item
          label="标题"
          name="title"
          rules={[{ required: true }, { min: 10 }]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item label="分类" name="tab" required>
          <Select options={tabs} />
        </Form.Item>
        <Form.Item
          label="内容"
          name="content"
          rules={[{ required: true }, { min: 10 }]}
        >
          <Markdown type="editor" customClassName={styles.editor_create} />
        </Form.Item>
        <Form.Item
          style={{
            textAlign: 'right',
          }}
        >
          <Space>
            <Button htmlType="button" onClick={onReset}>
              重置
            </Button>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TopicEditPage;

interface Props {}
