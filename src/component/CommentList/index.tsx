import React, { Fragment } from 'react';
import dayjs from 'dayjs';
import { Link, useModel } from 'umi';
import Markdown from '@/component/Markdown';

import { Comment, Avatar, Divider, Button } from 'antd';
import {
  LikeFilled,
  EditFilled,
  DeleteFilled,
  CommentOutlined,
} from '@ant-design/icons';

import * as styles from './index.less';
import CommentForm from '@/component/CommentForm';

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
  const {
    list,
    onLike,
    onReply,
    replyRender,
    onEdit,
    onDelete,
    editComment,
    onSubmitEdit,
  } = props;
  const tree = unflatten(list);
  const { user } = useModel('user');

  const CommentDetail: React.FC<{
    data: Node;
  }> = ({ data }) => {
    const { id, author, content, create_at, children } = data;
    const { loginname, avatar_url } = author;

    const renderChildren = () =>
      children?.map((item) => (
        <CommentDetail key={`detail-${id}-${item.id}`} data={item} />
      ));

    const getActions = (): React.ReactNode[] => {
      const actions = [
        <LikeFilled
          onClick={() => {
            onLike && onLike(data);
          }}
        />,
      ];

      if (loginname === user?.loginname) {
        actions.push(
          <EditFilled
            onClick={() => {
              onEdit && onEdit(data);
            }}
          />,
          <DeleteFilled />,
        );
      }

      actions.push(
        <CommentOutlined
          onClick={() => {
            onReply && onReply(data);
          }}
        />,
      );

      return actions;
    };

    return (
      <Fragment key={`fragment-${id}`}>
        <Divider type="horizontal" key={`divider-${id}`} />

        {user && editComment && editComment.id === id ? (
          <CommentForm
            user={user}
            data={content}
            onSubmitText="提交"
            extraActions={[
              <Button
                style={{ marginLeft: '16px' }}
                size="small"
                onClick={() => {
                  onEdit && onEdit(editComment);
                }}
              >
                取消
              </Button>,
            ]}
            onSubmit={async (values) => {
              onSubmitEdit && (await onSubmitEdit(values));
            }}
          >
            {renderChildren()}
          </CommentForm>
        ) : (
          <Comment
            key={id}
            actions={getActions()}
            author={<span>{loginname}</span>}
            datetime={
              <span>{dayjs(create_at).format('YYYY-MM-DD hh:mm:ss')}</span>
            }
            avatar={
              <Link to={`/user/${loginname}`}>
                <Avatar src={avatar_url} alt={loginname} />
              </Link>
            }
            content={
              <div className={styles.detail}>
                <Markdown type="render" value={content} />
              </div>
            }
          >
            {replyRender(id)}

            {renderChildren()}
          </Comment>
        )}
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

  onLike?: (record: Node) => void;
  onEdit?: (record: Node) => void;
  onSubmitEdit?: (content: string) => Promise<any>;
  onReply?: (record: Node) => void;
  onDelete?: (record: Node) => void;

  replyRender: (id: string) => React.ReactNode;
  editComment?: ReplyModel | null;
}

interface Node extends ReplyModel {
  children?: Node[];
}
