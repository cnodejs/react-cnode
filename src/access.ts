export default function (initialState: InitialState) {
  const { token } = initialState;

  return {
    canPostTopic: !!token,
    canPostComment: !!token,
  };
}
