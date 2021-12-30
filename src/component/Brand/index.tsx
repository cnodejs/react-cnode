import React from 'react';
import * as styles from './index.less';

const Brand: React.FC<Props> = ({ logo, title, description }) => (
  <div className={styles.container}>
    <img className={styles.logo} src={logo} alt="logo" />
    <h1 className={styles.title}>{title}</h1>
    <p className={styles.description}>{description}</p>
  </div>
);

export default Brand;

interface Props {
  title: string;
  description: string;
  logo?: string;
}
