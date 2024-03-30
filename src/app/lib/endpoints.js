import { api, SignUpApi } from "./api";

export const globalEndpoits = {
  categories: async () => (await api.get("/categories")).data?.data,
  sentences: async (params) => (await api.get("/sentence", { params })).data,
  completedSentences: async (params) =>
    (await api.get("/sentence/complete", { params })).data,
  notCompletedSentences: async (params) =>
    (await api.get("/sentence/not-complete", { params })).data,
  singleSentence: async (params) =>
    (await api.get(`/sentence/${params?.id}`, { params })).data,
  postSentence: async (data) => (await api.post("/file", data)).data,
};

export const authEndpoits = {
  me: async () => (await api.get("/auth/me")).data?.data,
  login: async (data) => (await api.post("/auth/login", data)).data,
  getSession: async (params) =>
    (await api.get("/auth/session", { params })).data,
  resendVerifyEmail: async () =>
    (await api.get("/auth/resend-email-verification-link")).data,
  resetPasswordRequest: async (data) =>
    (await api.post("/auth/generate-reset-password", data)).data,
  resetPassword: async (data) =>
    (await api.post("/auth/reset-password", data)).data,
  deleteAcc: async (data) =>
    (await api.post("/auth/delete-request", data)).data,
  logout: async (data) =>
    (await api.delete("/auth/logout", { params: data })).data,
  qrCodeToken: async (params) =>
    (await api.get("/auth/generate-qr-code", { params })).data,
  checkQrCode: async (data) =>
    (await api.post("/auth/check-qr-code", data)).data,
  alerts: async () => (await api.get("/auth/alerts")).data?.data,
  migrate: async (params) => (await api.get("/migrate", { params })).data,
  verifyPhone: async (params) =>
    (await api.get("/migrate/verify", { params })).data,
};
