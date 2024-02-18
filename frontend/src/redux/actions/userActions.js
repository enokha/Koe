export const login = (token, email, username) => ({
  type: 'LOGIN',
  payload: { token, email, username },
});

export const logout = () => ({
  type: 'LOGOUT',
});
