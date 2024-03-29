export const BASE_URL = 'https://cnodejs.org';

export const TABS_MAP = {
  good: {
    name: '精华',
    color: '#87d068',
  },
  share: {
    name: '分享',
    color: '#2db7f5',
  },
  ask: {
    name: '问答',
    color: '#999',
  },
  job: {
    name: '招聘',
    color: '#108ee9',
  },
  dev: {
    name: '客户端测试',
    color: 'green',
  },
};

export type TabType = keyof typeof TABS_MAP;

export const MESSAGE_TYPE_MAP = {
  at: {
    name: '提到了你',
    color: '#108ee9',
  },
  reply: {
    name: '回复了你',
    color: 'green',
  },
};

export type MessageType = keyof typeof MESSAGE_TYPE_MAP;

export enum FORM_TYPE {
  LOGIN = 'login',
  REGISTER = 'register',
}
