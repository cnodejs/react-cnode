export const checkJWTToken = (token: string) => {
  if (!token) return false;
  return true;
};

export const loadInitialState = (): { user?: any; token?: string } => {
  let initialState = {};

  const raw = window.localStorage.getItem('initialState');
  const data = JSON.parse(raw || '{}');

  if (checkJWTToken(data.token)) {
    initialState = data;
  }

  return initialState;
};
