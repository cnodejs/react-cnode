import React from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';

import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/esm/index.less';

import * as styles from './index.less';

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeSanitize)
  .use(rehypeStringify);

const Markdown: React.FC<Props> = (props) => {
  const { value = '', type, onChange, customClassName = '' } = props;

  let view;
  let classname = styles.markdown;

  if (type === 'render') {
    view = {
      menu: false,
      md: false,
      html: true,
    };

    classname += ` ${styles.markdown_render}`;
  }

  if (type === 'editor') {
    view = {
      menu: true,
      md: true,
      html: false,
    };

    classname += ` ${styles.markdown_editor}`;
  }

  if (customClassName) {
    classname += ` ${customClassName}`;
  }

  return (
    <MdEditor
      className={classname}
      readOnly={type === 'render'}
      view={view}
      value={value}
      renderHTML={async (text) => {
        const content: any = await processor.process(text);
        return content.value;
      }}
      onChange={(data) => {
        onChange && onChange(data.text);
      }}
    />
  );
};

export default Markdown;

interface Props {
  type: 'editor' | 'render';
  value?: string;
  customClassName?: '';
  onChange?: (text: string) => void;
}
