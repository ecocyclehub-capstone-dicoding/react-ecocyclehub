export const mapLoginResponse = (data) => {
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    role: data.role,
  };
};

export const mapRegisterResponse = (data) => {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    role: data.role,
  };
};
