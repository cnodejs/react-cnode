import React, { Fragment } from 'react';
import dayjs from 'dayjs';

import { useParams } from 'umi';
import { useRequest } from 'ahooks';
import { PageHeader, Comment, Avatar, Divider, Space } from 'antd';
import {
  LikeFilled,
  EditFilled,
  DeleteFilled,
  CommentOutlined,
} from '@ant-design/icons';
import * as API from '@/service/topic';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import SubTitle from './component/SubTitle';

import * as styles from './index.less';

const mdParser = new MarkdownIt();

const TopicDetail: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const params: Record<string, any> = useParams();
  const topicId = params?.id;

  if (!topicId) {
    return null;
  }

  const { data, loading } = useRequest(
    async () => {
      if (!topicId) {
        return;
      }

      const res = await API.queryTopicDetail({
        id: topicId,
        mdrender: false,
      });

      return res.data;
    },
    {
      refreshDeps: [topicId],
    },
  );

  if (!data) {
    return null;
  }

  const renderComment = () => {
    if (!data) {
      return null;
    }

    const { replies } = data;

    return (
      <div className={styles.comment}>
        {replies.map((reply: Reply, index: number) => {
          const { id, author, content, create_at } = reply;
          return (
            <Fragment key={id}>
              {index === replies.length - 1 ? null : (
                <Divider type="horizontal" key={`divider-${id}`} />
              )}

              <Comment
                key={id}
                actions={[
                  <LikeFilled />,
                  <EditFilled />,
                  <DeleteFilled />,
                  <CommentOutlined />,
                ]}
                author={
                  <Space size={8}>
                    <span>{author.loginname}</span>
                    <span>
                      {dayjs(create_at).format('YYYY-MM-DD hh:mm:ss')}
                    </span>
                  </Space>
                }
                avatar={
                  <Avatar src={author.avatar_url} alt={author.loginname} />
                }
                content={
                  <div
                    className={styles.comment_content}
                    dangerouslySetInnerHTML={{
                      __html: mdParser.render(content),
                    }}
                  ></div>
                }
              ></Comment>
            </Fragment>
          );
        })}
      </div>
    );
  };

  const renderDetail = () => {
    if (!data) {
      return null;
    }

    return (
      <div className={styles.detail}>
        <Divider type="horizontal"></Divider>
        <MdEditor
          className={styles.editor}
          readOnly
          view={{
            menu: false,
            md: false,
            html: true,
          }}
          value={data.content}
          renderHTML={(text) => mdParser.render(text)}
          // onChange={handleEditorChange}
        />
      </div>
    );
  };

  return (
    <PageHeader title={data?.title} onBack={() => window.history.back()}>
      <SubTitle {...data} />
      {renderDetail()}
      {renderComment()}
    </PageHeader>
  );
};

export default TopicDetail;

interface Props {}

interface Reply {
  id: string;
  content: string;

  author: {
    loginname: string;
    avatar_url: string;
  };

  ups: string[];
  create_at: Date;
  reply_id?: string;
  is_uped: boolean;
}
