export const getAccessToken = () =>
  JSON.parse(localStorage.getItem("auth_state"))?.access_token;

export const isAccessTokenExpired = () => {
  return (
    !localStorage.getItem("auth_state") ||
    new Date().getTime() >
      JSON.parse(localStorage.getItem("auth_state"))?.expirationTime
  );
};

export const setToken = (authResponse) => {
  const expirationTime = new Date();
  expirationTime.setSeconds(
    expirationTime.getSeconds() + Number(authResponse.expires_in)
  );

  const authState = {
    ...authResponse,
    expirationTime: expirationTime.getTime(),
  };

  localStorage.setItem("auth_state", JSON.stringify(authState));
};

export const clearToken = () => {
  localStorage.clear("auth_state");
};
