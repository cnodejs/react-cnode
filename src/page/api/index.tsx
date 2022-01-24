import React from 'react';
import { MicroApp } from 'umi';

const ApiPage: React.FC<Props> = (props) => {
  return (
    <MicroApp
      name="swagger"
      url="https://raw.githubusercontent.com/cnodejs/tegg-cnode/master/docs/swagger.yaml"
    />
  );
};

export default ApiPage;

interface Props {}
