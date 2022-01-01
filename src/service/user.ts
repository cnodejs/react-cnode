import { request } from 'umi';
import { BASE_URL } from '@/constants';

export const verifyAccessToken = async (data: {
  accesstoken: string;
}): Promise<{ id: string; loginname: string; avatar_url: string }> => {
  const options: any = {
    method: 'POST',
    data,
  };
  const res: any = await request(`${BASE_URL}/api/v1/accesstoken`, options);

  return res;
};

export const getUserInfo = async (params: {
  loginname: string;
}): Promise<{
  data: {
    score: number;
    recent_topics: any[];
    recent_replies: any[];
  };
}> => {
  const { loginname } = params;
  const options: any = {
    method: 'GET',
  };
  const res: any = await request(
    `${BASE_URL}/api/v1/user/${loginname}`,
    options,
  );

  return res;
};
