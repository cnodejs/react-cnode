import React from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import * as styles from './index.less';

const mdParser = new MarkdownIt();

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
      renderHTML={(text) => mdParser.render(text)}
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
