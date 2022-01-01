import { request } from 'umi';
import { BASE_URL } from '@/constants';

export const queryTopicList = async (params: {
  tab?: string;
  page?: number;
  limit?: number;
  mdrender?: boolean;
}) => {
  const { tab = 'ask', page = 1, limit = 10, mdrender = false } = params;
  const options: any = {
    method: 'GET',
    params: {
      tab,
      page,
      limit,
      mdrender,
    },
  };

  return request(`${BASE_URL}/api/v1/topics`, options);
};

export const queryTopicDetail = async (params: {
  id: string;
  mdrender?: boolean;
  accesstoken?: boolean;
}) => {
  const { id, mdrender, accesstoken } = params;
  const options: any = {
    method: 'GET',
    params: {
      mdrender,
      accesstoken,
    },
  };

  return request(`${BASE_URL}/api/v1/topic/${id}`, options);
};
