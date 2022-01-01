import React from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import * as styles from './index.less';

const mdParser = new MarkdownIt();

const Markdown: React.FC<Props> = (props) => {
  const { value, type, onChange } = props;

  let view;

  if (type === 'render') {
    view = {
      menu: false,
      md: false,
      html: true,
    };
  }

  if (type === 'editor') {
    view = {
      menu: true,
      md: true,
      html: false,
    };
  }

  return (
    <MdEditor
      className={styles.editor}
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
  value: string;
  onChange?: (text: string) => void;
}
