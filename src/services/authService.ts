export const authService = {
  getAccessToken: () => localStorage.getItem("token"),
  getRefreshToken: () => localStorage.getItem("refreshToken"),

  saveTokens: (accessToken: string, refreshToken: string) => {
    localStorage.setItem("token", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  },

  clearTokens: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  },
};
