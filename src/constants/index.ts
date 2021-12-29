export const BASE_URL = 'https://cnodejs.org';

export const TABS_MAP = {
  good: {
    name: '精华',
    color: '#5BD8A6',
  },
  share: {
    name: '分享',
    color: '#5BD8A6',
  },
  ask: {
    name: '问答',
    color: '#5BD8A6',
  },
  job: {
    name: '招聘',
    color: '#5BD8A6',
  },
};

export type TabType = keyof typeof TABS_MAP;
