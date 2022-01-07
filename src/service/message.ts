import { request } from 'umi';
import { BASE_URL } from '@/constants';

export const getMessageCount = async (params: {
  accesstoken: string;
}): Promise<{
  data: number;
}> => {
  const options: any = {
    method: 'GET',
    params,
  };
  const res: any = await request(`${BASE_URL}/api/v1/message/count`, options);
  return res;
};

export const getMessages = async (params: {
  accesstoken: string;
  mdrender?: boolean;
}): Promise<{
  data: MessageCollection;
}> => {
  const options: any = {
    method: 'GET',
    params,
  };
  const res: any = await request(`${BASE_URL}/api/v1/messages`, options);

  return res;
};

export const markMessage = async (
  id: string,
  data: {
    accesstoken: string;
  },
) => {
  const options: any = {
    method: 'POST',
    data,
  };
  const res: any = await request(
    `${BASE_URL}/api/v1/message/mark_one/${id}`,
    options,
  );

  return res;
};

export const markAllMessage = async (data: { accesstoken: string }) => {
  const options: any = {
    method: 'POST',
    data,
  };
  const res: any = await request(
    `${BASE_URL}/api/v1/message/mark_all`,
    options,
  );

  return res;
};

interface MessageCollection {
  has_read_messages: MessageModel[];
  hasnot_read_messages: MessageModel[];
}
