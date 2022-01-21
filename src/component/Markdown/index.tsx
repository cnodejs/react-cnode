import React from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import rehypeAttr from 'rehype-attr';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import type { Schema } from 'hast-util-sanitize';

import MdEditor from 'react-markdown-editor-lite';
// import 'react-markdown-editor-lite/esm/index.less';

import * as styles from './index.less';

const CONFIG_MAP = {
  render: {
    view: {
      menu: false,
      md: false,
      html: true,
    },
    classname: styles.markdown_render,
  },
  editor: {
    view: {
      menu: true,
      md: true,
      html: false,
    },
    classname: styles.markdown_editor,
  },
};

const CONFIG_SCHEMA: Schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    img: [...(defaultSchema?.attributes?.img || []), ['style']],
  },
};

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeAttr, { properties: 'attr' })
  .use(rehypeSanitize, CONFIG_SCHEMA)
  .use(rehypeStringify);

const Markdown: React.FC<Props> = (props) => {
  const { value = '', type, onChange, customClassName = '' } = props;
  const { view, classname: defaultClassName } = CONFIG_MAP[type];

  let classname = `${styles.markdown} ${defaultClassName}`;

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
        const content = await processor.process(text);
        return content.toString();
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
  customClassName?: string;

  value?: string;
  onChange?: (text: string) => void;
}
