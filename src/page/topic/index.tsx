import React from 'react';
import { useParams } from 'umi';
import { useRequest } from 'ahooks';
import { PageHeader } from 'antd';
import * as API from '@/service/topic';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import * as styles from './index.less';

const mdParser = new MarkdownIt(/* Markdown-it options */);

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

  return (
    <div>
      <PageHeader title={data?.title}>
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
      </PageHeader>
    </div>
  );
};

export default TopicDetail;

interface Props {}
