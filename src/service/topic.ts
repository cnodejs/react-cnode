import { request } from 'umi';
import { BASE_URL } from '@/constants';

export const queryTopics = async (params: QueryParams) => {
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

interface QueryParams {
  tab?: string;
  page?: number;
  limit?: number;
  mdrender?: boolean;
}
