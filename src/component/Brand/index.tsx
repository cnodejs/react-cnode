import React, { useContext } from 'react';
import { RouteContext } from '@ant-design/pro-layout';

import * as styles from './index.less';

const Brand: React.FC<Props> = ({ logo, title, description }) => {
  const { collapsed, isMobile } = useContext(RouteContext);

  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logo} alt="logo" />
      {collapsed || isMobile ? null : (
        <p className={styles.description}>{description}</p>
      )}
    </div>
  );
};

export default Brand;

interface Props {
  logo?: string;
  title?: string;
  description: string;
}
