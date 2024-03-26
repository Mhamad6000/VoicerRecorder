import { api, SignUpApi } from "./api";

export const globalEndpoits = {
  categories: async () => (await api.get("/categories")).data?.data,
};

export const authEndpoits = {
  me: async () => (await api.get("/auth/me")).data?.data,
  login: async (data) => (await api.post("/auth/login", data)).data,
  register: async (data) => (await SignUpApi.post("/user", data)).data,
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
export const porfolioEndpoits = {
  getPortfolios: async (params) =>
    (await api.get("/portfolios", { params })).data?.data,
};
export const profileEndpoits = {
  update: async (data) =>
    (
      await api.post("/profile", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data?.data,

  updateCompany: async (data) =>
    (
      await api.post("/profile/companies?_method=PUT", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data?.data,
  changePasswordOrEmail: async (data) =>
    (await api.post("/auth/update?_method=PUT", data)).data?.data,
  getCompanies: async () => (await api.get("/profile/companies")).data?.data,
  newPortfolio: async (data) =>
    (
      await api.post("/profile/portfolios", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data?.data,
  updatePortfolio: async (data) =>
    (
      await api.post("/profile/portfolios?_method=PUT", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data?.data,
  removePortfolio: async (params) =>
    (await api.delete(`/profile/portfolios`, { params })).data?.data,
  removePortfolioImage: async (params) =>
    (await api.delete(`/profile/portfolios/asset`, { params })).data?.data,
  likeOrDislikePortfolio: async (data) =>
    (
      await api.post("/profile/portfolios/like?_method=POST", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data?.data,
  sendCode: async (data) =>
    (await api.get("/auth/send-message", data)).data?.data,
  verifyPhone: async (params) => (await api.post("/auth/verify", params)).data,
  Transition: async (params) =>
    (await api.get("/profile/activities/transactions", { params })).data?.data,
  notifications: async (params) =>
    (await api.get("/profile/notifications", { params })).data?.data,
  statistics: async () =>
    (await api.get("/profile/notifications/statistics")).data?.data,
  seen: async (data) =>
    (
      await api.post("/profile/notifications?_method=PUT", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data?.data,
  kpi: async (params) => {
    console.log("ppp", params);
    return (await api.get("/profile/activities/kpi", { params })).data?.data;
  },
};
export const blogsEndpoits = {
  getBlogs: async (params) =>
    (await api.get(`/global/blog-articles`, { params })).data?.data,
  incrementBlogViews: async (data) =>
    (await api.post(`/global/blog-articles?_method=PUT`, data)).data?.data,
};
export const ticketsEndpoits = {
  get: async () => (await api.get(`/profile/tickets?target=newest`)).data?.data,
  new: async (data) =>
    (
      await api.post("/profile/tickets", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data?.data,
  close: async (params) =>
    (await api.delete(`/profile/tickets`, { params })).data?.data,
  newMessage: async (data) =>
    (
      await api.post("/profile/tickets?_method=PUT", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data?.data,
};

export const helpCenterEndpoits = {
  getArticles: async () => (await api.get("/global/help-center")).data?.data,
  incrementArticleViews: async (data) =>
    (await api.post(`/global/help-center?_method=PUT`, data)).data?.data,
  getFaqs: async () => (await api.get("/global/faqs")).data?.data,
};

export const taskEndpoits = {
  filter: async (params) =>
    (await api.get(`/tasks/filter`, { params })).data?.data,
  show: async (params) => (await api.get(`/tasks/show`, { params })).data?.data,
  new: async (data) =>
    (
      await api.post("/tasks", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data?.data,
  update: async (data) =>
    (
      await api.post("/tasks?_method=PUT", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data?.data,
  bid: async (data) => (await api.post("/tasks/bid", data)).data?.data,
  unbid: async (params) =>
    (await api.delete("/tasks/bid", { params })).data?.data,
  shortlist: async (data) =>
    (await api.post("/tasks/shortlist", data)).data?.data,
  unshortlist: async (params) =>
    (await api.post("/tasks/shortlist?_method=DELETE", params)).data?.data,
  assign: async (data) => (await api.post("/tasks/assign", data)).data?.data,
  cancelationRequest: async (data) =>
    (await api.post("/tasks/accept-or-reject", data)).data?.data,
  singleCancelation: async (params) =>
    (await api.get("/tasks/cancel-details", { params })).data?.data,
  submitFeedback: async (data) =>
    (await api.post("/tasks/feedback", data)).data?.data,
  gbt: async (data) => await api.post(`/tasks/generate-content`, data),
};

export const jobEndpoits = {
  filter: async (params) =>
    (await api.get(`/positions/filter`, { params })).data?.data,
  apply: async (data) => (await api.post("/positions/apply", data)).data?.data,
  unapply: async (params) =>
    (await api.delete("/positions/apply", { params })).data?.data,
  show: async (params) =>
    (await api.get(`/positions/show`, { params })).data?.data,
  new: async (data) =>
    (
      await api.post("/positions", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data?.data,
  update: async (data) =>
    (
      await api.post("/positions?_method=PUT", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data?.data,
  shortlist: async (data) =>
    (await api.post("/positions/shortlist", data)).data?.data,
  unshortlist: async (params) =>
    (await api.post("/positions/shortlist?_method=DELETE", params)).data?.data,
  assign: async (data) =>
    (await api.post("/positions/assign", data)).data?.data,
  gbt: async (data) => await api.post(`/positions/generate-content`, data),
};

export const reportEndpoits = {
  report: async (data) => (await api.post(`/reports`, data)).data?.data,
};

export const freelancerEndpoits = {
  filter: async (params) =>
    (await api.get(`/freelancers/filter`, { params })).data?.data,
  show: async (params) =>
    (await api.get(`/freelancers/show`, { params })).data?.data,
};

export const companyEndpoits = {
  filter: async (params) =>
    (await api.get(`/companies/filter`, { params })).data?.data,
  create: async (data) =>
    (
      await api.post(`/profile/companies`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data?.data,
  attachUser: async (data) =>
    (await api.post(`/profile/companies/user`, data, {})).data?.data,
  detachUser: async (data) =>
    (await api.delete("/profile/companies/user", { data }, {})).data?.data,

  show: async (params) =>
    (await api.get(`/companies/show`, { params })).data?.data,
  branches: async (id) =>
    (await api.get(`/companies/show?id=` + id)).data?.data,
  createBranch: async (params) =>
    (await api.post(`/profile/companies/branch`, params)).data?.data,
  editBranch: async (params) =>
    (await api.put(`/profile/companies/branch`, params)).data?.data,
  removeBranch: async (params) =>
    (await api.delete(`/profile/companies/branch`, { data: params })).data
      ?.data,
};

export const acitivityEndpoits = {
  jobAndTasks: async (params) =>
    (await api.get(`/profile/activities/jobs-and-tasks`, { params })).data,
  posts: async (params) =>
    (await api.get(`/profile/activities/posts`, { params })).data,
  bookmarks: async (params) =>
    (await api.get(`/profile/activities/bookmarks`, { params })).data,
  cancellation: async (params) =>
    (await api.get(`/profile/activities/requests`, { params })).data,
  likes: async (params) =>
    (await api.get(`/profile/activities/likes`, { params })).data,
};

export const bookmarkEndpoits = {
  bookmark: async (values) => {
    if (values.action === "add") {
      return await api.post(`/bookmarks`, values);
    } else if (values.action === "remove") {
      return await api.post(`/bookmarks?_method=DELETE`, values);
    } else {
      console.error("Invalid action");
    }
  },
};

export const chatEndpoits = {
  count: async () => (await api.get("/chat/count")).data?.data,
  contacts: async (params) => (await api.get(`/chat`, { params })).data?.data,
  messages: async (params) =>
    (await api.get(`/chat/messages`, { params })).data?.data,
  checkChatList: async (params) =>
    (await api.get(`/chat/chat-list-detail`, { params })).data?.data,
  send: async (data) =>
    (
      await api.post(`/chat`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data?.data,
  createNew: async (data) => (await api.post(`/chat/check`, data)).data?.data,
  propertiesBetweenSenderandReceiver: async (params) =>
    (await api.get(`/chat/messages/properties`, { params })).data?.data,
  ignore: async (data) =>
    (await api.post(`/chat/ignore?_method=PUT`, data)).data?.data,
  tasksInfo: async (params) =>
    (await api.get(`/chat/statistics/tasks`, { params })).data?.data,
  sendCancelRequest: async (data) =>
    (await api.post(`/tasks/send-cancel-request`, data)).data?.data,
  acceptInstalment: async (data) =>
    (await api.post(`/tasks/finish-instalment`, data)).data?.data,
  finishTask: async (data) =>
    (await api.post(`/tasks/complete`, data)).data?.data,
  hideMessage: async (params) =>
    (await api.delete(`/chat`, { params })).data?.data,
};

export const balanceEndpoints = {
  recharge: async (data) => (await api.post(`/orders/buy`, data)).data?.data,
  checkOrder: async (params) => await api.get(`/orders/callback`, { params }),
  withdraw: async (data) => await api.post(`/withdraw`, data),
};

export const cvEndpoints = {
  add: async (data) => await api.post(`/profile/cvs`, data),
  viwe: async (params) =>
    (await api.get(`/profile/cvs`, { params })).data?.data,
  removeCV: async (params) =>
    (await api.delete(`/profile/cvs`, { params })).data?.data,
  singleCv: async (params) => (await api.get(`/cvs`, { params })).data?.data,
  gbt: async (data) => await api.post(`/profile/cvs/generate-content`, data),
  update: async (data) =>
    (
      await api.post("/profile/cvs?_method=PUT", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data?.data,
};

export const portalEndpoint = {
  viwe: async (params) => (await api.get("/portal", { params })).data?.data,
};
