import TopicItemList from '@/component/TopicItemList';
import { getUserInfo } from '@/service/user';
import { GithubOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import { useRequest } from 'ahooks';
import { Avatar, Divider, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useParams } from 'umi';
import * as styles from './index.less';

const { Text, Paragraph } = Typography;

const UserDetail: React.FC<Props> = (props) => {
  const params: Record<string, any> = useParams();

  const { data } = useRequest(async () => {
    if (!params) return;
    const { loginname } = params;
    const { data } = await getUserInfo({ loginname });
    return data;
  });

  if (!data) return null;

  const {
    loginname,
    avatar_url,
    score,
    githubUsername,
    recent_topics,
    recent_replies,
    create_at,
  } = data;

  const renderScore = () => (
    <div style={{ padding: '8px 0' }}>
      <Space direction="vertical" size={8}>
        <Text>{score} 积分</Text>
      </Space>
    </div>
  );

  const renderLinks = () => (
    <Space direction="vertical" size={8}>
      <Space size={8}>
        {githubUsername && (
          <>
            <GithubOutlined />
            <a href={`https://github.com/${githubUsername}`} target={'_blank'}>
              <span>@{githubUsername}</span>
            </a>
          </>
        )}
      </Space>
    </Space>
  );

  const renderCreateAt = () => (
    <div className={styles.createAt}>注册时间{dayjs(create_at).fromNow()}</div>
  );

  return (
    <>
      <ProCard>
        <Space size={8}>
          <Avatar src={avatar_url} />
          <span>{loginname}</span>
        </Space>

        {renderScore()}

        {renderLinks()}

        {renderCreateAt()}
      </ProCard>

      <Divider />

      <ProCard title="最近创建的话题">
        <TopicItemList dataSource={recent_topics} />
      </ProCard>

      <Divider />

      <ProCard title="最近参与的话题">
        <TopicItemList dataSource={recent_replies} />
      </ProCard>
    </>
  );
};

export default UserDetail;

interface Props {}
