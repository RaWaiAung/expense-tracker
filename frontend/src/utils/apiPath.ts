export const BASE_URL = 'http://localhost:4000';

export const API_PATHS = {
  DASHBOARD: {
    GET_DASHBOARD_DATA: `${BASE_URL}/dashboard`,
  },
  USAGE: {
    ADD_EXPENSE: `${BASE_URL}/usage/`,
    GET_ALL_EXPENSES: `${BASE_URL}/usage/`,
    GET_EXPENSE_BY_ID: (id: string) => `${BASE_URL}/usage/${id}`,
    EDIT_EXPENSE: (id: string) => `${BASE_URL}/usage/${id}`,
    DELETE_EXPENSE: (id: string) => `${BASE_URL}/usage/${id}`,
    DOWNLOAD_EXPENSE_EXCEL: `${BASE_URL}/usage/download/excel`,
  },
  AUTH: {
    LOGIN: `${BASE_URL}/auth/signIn`,
    REGISTER: `${BASE_URL}/auth/signUp`,
    REFRESH_TOKEN: `${BASE_URL}/auth/refresh-token`,
  },
  USER: {
    GET_PROFILE: `${BASE_URL}/user/me`,
    DELETE_ACCOUNT: `${BASE_URL}/user/`,
    EDIT_PROFILE: `${BASE_URL}/user/edit/profile`,  
  },
  INCOME: {
    ADD_INCOME: `${BASE_URL}/income/`,
    GET_ALL_INCOMES: `${BASE_URL}/income/`,
    GET_INCOME_BY_ID: (id: string) => `${BASE_URL}/income/${id}`,
    EDIT_INCOME: (id: string) => `${BASE_URL}/income/${id}`,
    DELETE_INCOME: (id: string) => `${BASE_URL}/income/${id}`,
    DOWNLOAD_INCOME_EXCEL: `${BASE_URL}/income/download/excel`,
  },
  IMAGE: {
    UPLOAD_IMAGE: `${BASE_URL}/upload/image`,
  }
};