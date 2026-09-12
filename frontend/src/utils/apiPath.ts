const API_URL = import.meta.env.VITE_API_URL;
// export const API_PATHS = {
//   DASHBOARD: {
//     GET_DASHBOARD_DATA: `${API_URL}/dashboard`,
//   },
//   USAGE: {
//     ADD_EXPENSE: `${API_URL}/usage/`,
//     GET_ALL_EXPENSES: `${API_URL}/usage/`,
//     GET_EXPENSE_BY_ID: (id: string) => `${API_URL}/usage/${id}`,
//     EDIT_EXPENSE: (id: string) => `${API_URL}/usage/${id}`,
//     DELETE_EXPENSE: (id: string) => `${API_URL}/usage/${id}`,
//     DOWNLOAD_EXPENSE_EXCEL: `${API_URL}/usage/download/excel`,
//   },
//   AUTH: {
//     LOGIN: `${API_URL}/auth/signIn`,
//     REGISTER: `${API_URL}/auth/signUp`,
//     REFRESH_TOKEN: `${API_URL}/auth/refresh-token`,
//   },
//   USER: {
//     GET_PROFILE: `${API_URL}/user/me`,
//     DELETE_ACCOUNT: `${API_URL}/user/`,
//     EDIT_PROFILE: `${API_URL}/user/edit/profile`,  
//   },
//   INCOME: {
//     ADD_INCOME: `${API_URL}/income/`,
//     GET_ALL_INCOMES: `${API_URL}/income/`,
//     GET_INCOME_BY_ID: (id: string) => `${API_URL}/income/${id}`,
//     EDIT_INCOME: (id: string) => `${API_URL}/income/${id}`,
//     DELETE_INCOME: (id: string) => `${API_URL}/income/${id}`,
//     DOWNLOAD_INCOME_EXCEL: `${API_URL}/income/download/excel`,
//   },
//   IMAGE: {
//     UPLOAD_IMAGE: `${API_URL}/upload/image`,
//   }
// };

export const API_PATHS = {
  DASHBOARD: {
    GET_DASHBOARD_DATA: `${API_URL}/dashboard`,
  },
  USAGE: {
    ADD_EXPENSE: `${API_URL}/usage/`,
    GET_ALL_EXPENSES: `${API_URL}/usage/`,
    GET_EXPENSE_BY_ID: (id: string) => `${API_URL}/usage/${id}`,
    EDIT_EXPENSE: (id: string) => `${API_URL}/usage/${id}`,
    DELETE_EXPENSE: (id: string) => `${API_URL}/usage/${id}`,
    DOWNLOAD_EXPENSE_EXCEL: `${API_URL}/usage/download/excel`,
  },
  AUTH: {
    LOGIN: `/auth/signIn`,
    REGISTER: `/auth/signUp`,
    REFRESH_TOKEN: `${API_URL}/auth/refresh-token`,
  },
  USER: {
    GET_PROFILE: `${API_URL}/user/me`,
    DELETE_ACCOUNT: `${API_URL}/user/`,
    EDIT_PROFILE: `${API_URL}/user/edit/profile`,  
  },
  INCOME: {
    ADD_INCOME: `${API_URL}/income/`,
    GET_ALL_INCOMES: `${API_URL}/income/`,
    GET_INCOME_BY_ID: (id: string) => `${API_URL}/income/${id}`,
    EDIT_INCOME: (id: string) => `${API_URL}/income/${id}`,
    DELETE_INCOME: (id: string) => `${API_URL}/income/${id}`,
    DOWNLOAD_INCOME_EXCEL: `${API_URL}/income/download/excel`,
  },
  IMAGE: {
    UPLOAD_IMAGE: `${API_URL}/upload/image`,
  }
};