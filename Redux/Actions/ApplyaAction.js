export const getProps = (getProps, uid) => {
  return (dispatch, getState) => {
    dispatch({ type: "GETPROPS_SUCCESS", getProps, uid });
  };
};
