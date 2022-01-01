export default function (initialState: InitialState) {
  const { token } = initialState;

  return {
    canPostComment: !!token,
  };
}
