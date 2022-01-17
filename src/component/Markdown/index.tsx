import React from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import 'react-markdown-editor-lite/esm/index.less';

import * as styles from './index.less';

const mdParser = new MarkdownIt('commonmark', {
  html: false,
});

const getAttributes = (content: string = 'image') => {
  const attrs = content.split(' ');
  const alt = attrs.shift();

  const attributes = attrs.reduce((prev: string[], curr) => {
    const [key, value] = curr.split('=');

    if (!key) {
      return prev;
    }

    if (!value) {
      return prev.concat(`${key}`);
    }

    return prev.concat(`${key}="${value}"`);
  }, []);

  return {
    alt,
    attributes,
  };
};

mdParser.renderer.rules.image = function (tokens, index) {
  const token = tokens[index];
  const srcIndex = token.attrIndex('src');

  if (!token.attrs) {
    return '';
  }

  const src = token.attrs[srcIndex][1];
  const content = mdParser.utils.escapeHtml(token.content);
  const { alt, attributes } = getAttributes(content);

  return `<img src="${src}" alt="${alt}" ${attributes.join(' ')}/>`;
};

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
