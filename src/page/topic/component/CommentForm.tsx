import React, { useState, useEffect } from 'react';
import { Comment, Avatar, Button } from 'antd';
import Markdown from '@/component/Markdown';

const CommentForm: React.FC<Props> = (props) => {
  const { data, user, onSubmit, onSubmitText = '提交评论' } = props;
  const { loginname, avatar_url } = user;
  const [value, setValue] = useState('');

  useEffect(() => {
    if (!data) {
      return;
    }
    setValue(data);
  }, [data]);

  return (
    <Comment
      author={<span>{loginname}</span>}
      avatar={<Avatar src={avatar_url} alt={loginname} />}
      actions={[
        <Button
          type="primary"
          size="small"
          onClick={async () => {
            if (!value) {
              return;
            }

            await onSubmit(value);
            setValue('');
          }}
        >
          {onSubmitText}
        </Button>,
      ]}
      content={<Markdown type="editor" value={value} onChange={setValue} />}
    />
  );
};

export default CommentForm;

interface Props {
  data?: string;
  user: {
    loginname: string;
    avatar_url: string;
  };
  onSubmit: (value: string) => Promise<void>;
  onSubmitText?: string;
}
