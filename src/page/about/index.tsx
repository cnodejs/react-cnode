import React from 'react';
import Markdown from '@/component/Markdown';

const content = `
## 关于

CNode 社区为国内最大最具影响力的 Node.js 开源技术社区，致力于 Node.js 的技术研究。

CNode 社区由一批热爱 Node.js 技术的工程师发起，目前已经吸引了互联网各个公司的专业技术人员加入，我们非常欢迎更多对 Node.js 感兴趣的朋友。

CNode 的 SLA 保证是，一个9，即 90.000000%。

社区目前由 [@alsotang](http://cnodejs.org/user/alsotang) 在维护，有问题请联系：https://github.com/alsotang

请关注我们的官方微博：http://weibo.com/cnodejs


## 客户端

客户端由 [@soliury](https://cnodejs.org/user/soliury) 开发维护。

源码地址： https://github.com/soliury/noder-react-native 。

立即体验 CNode 客户端，直接扫描页面右侧二维码。

另，安卓用户同时可选择：https://github.com/TakWolf/CNode-Material-Design ，这是 Java 原生开发的安卓客户端。


## 贡献者

> egg-cnode

[![contributors](https://ergatejs.implements.io/badges/contributors/cnodejs/egg-cnode.svg?owner=cnodejs&repo=egg-cnode&type=svg&width=1232&size=64&padding=8)<!--rehype:style=width:50%;-->](https://github.com/cnodejs/egg-cnode/graphs/contributors)
`;

const AboutPage: React.FC<Props> = (props) => {
  return <Markdown type="render" value={content} />;
};

export default AboutPage;

interface Props {}
