import { useState, useCallback, useEffect } from 'react';
import { loadInitialState } from '@/util';
import * as API from '@/service/message';

export default () => {
  const initialState = loadInitialState();
  const { token } = initialState;

  const [count, setCount] = useState(0);
  const [message, setMessage] = useState<Array<MessageModel>>();
  const [unreadMessage, setUnreadMessage] = useState<Array<MessageModel>>();

  useEffect(() => {
    if (!token) {
      return;
    }

    load();
    fetch();
  }, [token]);

  const load = useCallback(async () => {
    if (!token) {
      return;
    }

    const { data } = await API.countMessage({
      accesstoken: token,
    });

    setCount(data);
  }, [token]);

  const fetch = useCallback(async () => {
    if (!token) {
      return;
    }

    const { data } = await API.listMessage({
      accesstoken: token,
      mdrender: false,
    });

    setMessage(data.has_read_messages);
    setUnreadMessage(data.hasnot_read_messages);
  }, [token]);

  const mark = useCallback(
    async (id: string) => {
      if (!token) {
        return;
      }

      await API.markMessage(id, {
        accesstoken: token,
      });

      load();
      fetch();
    },
    [token],
  );

  const markAll = useCallback(async () => {
    if (!token) {
      return;
    }

    await API.markAllMessage({
      accesstoken: token,
    });

    load();
    fetch();
  }, [token]);

  return { count, message, unreadMessage, load, fetch, mark, markAll };
};
