import React, { Fragment } from 'react';
import dayjs from 'dayjs';
import Markdown from '@/component/Markdown';

import { Comment, Avatar, Divider } from 'antd';
import {
  LikeFilled,
  EditFilled,
  DeleteFilled,
  CommentOutlined,
} from '@ant-design/icons';

import * as styles from './index.less';

const unflatten = (array: Node[], parent?: Node, tree?: Node[]) => {
  let _parent = parent || { id: null, children: [] };
  let _tree = tree || [];

  const children = array.filter((child) => child.reply_id === _parent.id);

  if (children.length > 0) {
    if (!_parent.id) {
      _tree = children;
    } else {
      _parent.children = children;
    }
    children.forEach((child) => unflatten(array, child));
  }

  return _tree;
};

const CommentList: React.FC<Props> = (props) => {
  const { list, onReply, replyRender } = props;
  const tree = unflatten(list);

  const CommentDetail: React.FC<{
    data: Node;
  }> = ({ data }) => {
    const { id, author, content, create_at, children } = data;

    return (
      <Fragment key={`fragment-${id}`}>
        <Divider type="horizontal" key={`divider-${id}`} />

        <Comment
          key={id}
          actions={[
            <LikeFilled />,
            <EditFilled />,
            <DeleteFilled />,
            <CommentOutlined
              onClick={() => {
                onReply(data);
              }}
            />,
          ]}
          author={<span>{author.loginname}</span>}
          datetime={
            <span>{dayjs(create_at).format('YYYY-MM-DD hh:mm:ss')}</span>
          }
          avatar={<Avatar src={author.avatar_url} alt={author.loginname} />}
          content={
            <div className={styles.detail}>
              <Markdown type="render" value={content} />
            </div>
          }
        >
          {replyRender(id)}

          {children?.map((item) => (
            <CommentDetail key={`detail-${id}-${item.id}`} data={item} />
          ))}
        </Comment>
      </Fragment>
    );
  };

  return (
    <div className={styles.list}>
      {tree.map((item) => (
        <CommentDetail key={`list-${item.id}`} data={item} />
      ))}
    </div>
  );
};

export default CommentList;

interface Props {
  list: ReplyModel[];

  onReply: (record: Node) => void;
  replyRender: (id: string) => React.ReactNode;
}

interface Node extends ReplyModel {
  children?: Node[];
}
