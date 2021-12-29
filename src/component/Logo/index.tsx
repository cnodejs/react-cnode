import React from 'react';
import * as styles from './index.module.less';

const Logo: React.FC<Props> = ({ title, description }) => (
  <div className={styles.logo}>
    <div className={styles.title}>{title}</div>
    <div className={styles.content}>{description}</div>
  </div>
);

export default Logo;

interface Props {
  title: string;
  description: string;
}
