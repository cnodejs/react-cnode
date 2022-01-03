import React from 'react';
import ProCard from '@ant-design/pro-card';

const AppQrcode: React.FC<Props> = (props) => {
  return (
    <ProCard title="客户端二维码" headerBordered>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          width={200}
          src="https://static.cnodejs.org/FtG0YVgQ6iginiLpf9W4_ShjiLfU"
          alt="客户端二维码"
        />
        <span>客户端源码地址</span>
      </div>
    </ProCard>
  );
};

export default AppQrcode;

interface Props {}
