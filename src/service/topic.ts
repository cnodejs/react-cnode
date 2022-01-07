import { request } from 'umi';
import { BASE_URL } from '@/constants';

export const listTopic = async (params: {
  tab?: string;
  page?: number;
  limit?: number;
  mdrender?: boolean;
}): Promise<{
  data: TopicModel[];
}> => {
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

  const res = await request(`${BASE_URL}/api/v1/topics`, options);
  res.data = res.data.filter((item: any) => item?.author?.loginname);
  return res;
};

export const createTopic = async (data: {
  title: string;
  tab: string;
  content: string;
  accesstoken: string;
}) => {
  const options: any = {
    method: 'POST',
    data,
  };

  return request(`${BASE_URL}/api/v1/topics`, options);
};

export const updateTopic = async (data: {
  topic_id: string;
  title: string;
  tab: string;
  content: string;
  accesstoken: string;
}) => {
  const options: any = {
    method: 'POST',
    data,
  };

  return request(`${BASE_URL}/api/v1/topics/update`, options);
};

export const readTopic = async (params: {
  id: string;
  mdrender?: boolean;
  accesstoken?: boolean;
}): Promise<{
  data: TopicModel;
}> => {
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

export const createReply = async (
  topicId: string,
  data: {
    content: string;
    accesstoken: string;
    reply_id?: string;
  },
) => {
  const options: any = {
    method: 'POST',
    data,
  };

  return request(`${BASE_URL}/api/v1/topic/${topicId}/replies`, options);
};

export const updateReplyUps = async (
  replyId: string,
  data: {
    accesstoken: string;
  },
) => {
  const options: any = {
    method: 'POST',
    data,
  };

  return request(`${BASE_URL}/api/v1/reply/${replyId}/ups`, options);
};
