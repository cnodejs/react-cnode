import React, { useState } from 'react';

import { useParams, useModel } from 'umi';
import { useRequest } from 'ahooks';
import { PageHeader, Divider } from 'antd';
import * as API from '@/service/topic';

import SubTitle from './component/SubTitle';
import Markdown from '@/component/Markdown';
import CommentForm from './component/CommentForm';
import CommentList from './component/CommentList';

import * as styles from './index.less';

const TopicDetail: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const params: Record<string, any> = useParams();
  const topicId = params?.id;

  const { user } = useModel('user');

  const { initialState } = useModel('@@initialState');
  const token = initialState?.token;

  const [reply, setReply] = useState<ReplyModel | null>();

  if (!topicId) {
    return null;
  }

  const { data, refresh } = useRequest(
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

  const onComment = async (data: { content: string; reply_id?: string }) => {
    console.log(topicId, token, data);

    if (!token) {
      return;
    }

    if (!data?.content) {
      return;
    }

    await API.postTopicReply(topicId, {
      ...data,
      accesstoken: token,
    });
  };

  const onReply = (record: ReplyModel) => {
    if (reply) {
      setReply(null);
      return;
    }

    setReply(record);
  };

  const renderTopicDetail = () => {
    if (!data) {
      return null;
    }

    return (
      <div className={styles.editor_detail}>
        <Divider type="horizontal" />
        <Markdown type="render" value={data.content} />
      </div>
    );
  };

  const renderCommentList = () => {
    if (!data) {
      return null;
    }

    const { replies } = data;

    return (
      <CommentList list={replies} onReply={onReply} replyRender={renderReply} />
    );
  };

  const renderCommentForm = () => {
    if (!user) {
      return null;
    }

    const handleSubmit = async (content: string) => {
      await onComment({
        content,
      });
      refresh();
    };

    return (
      <>
        <Divider type="horizontal" key={'divider'} />
        <CommentForm user={user} onSubmit={handleSubmit} />
      </>
    );
  };

  const renderReply = (id: string) => {
    if (!user || id !== reply?.id) {
      return null;
    }

    const handleSubmit = async (content: string) => {
      if (!reply) {
        return;
      }

      await onComment({
        content,
        reply_id: reply?.id,
      });

      setReply(null);
      refresh();
    };

    return (
      <CommentForm
        user={user}
        data={reply ? `@${reply.author.loginname}` : ''}
        onSubmit={handleSubmit}
        onSubmitText="提交回复"
      />
    );
  };

  return (
    <PageHeader title={data?.title} onBack={() => window.history.back()}>
      <SubTitle {...data} />
      {renderTopicDetail()}
      {renderCommentList()}
      {renderCommentForm()}
    </PageHeader>
  );
};

export default TopicDetail;

interface Props {}
