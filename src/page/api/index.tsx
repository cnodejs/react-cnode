import React from 'react';
import { MicroApp } from 'umi';

const ApiPage: React.FC<Props> = (props) => {
  return <MicroApp name="api" />;
};

export default ApiPage;

interface Props {}
