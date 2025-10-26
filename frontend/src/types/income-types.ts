import type { ApiResponse } from "./common-types";

export interface Income {
  _id: string;
  icon: string;
  description: string;
  amount: number;
  source: string;
  removed: boolean;
  created: Date;
  updated: string;
}

export interface IncomeListContent {
  data: Income[];
  totalCount: number;
}

export type GetIncomesResponse = ApiResponse<IncomeListContent>;

export type GetIncomeResponse = ApiResponse<Income>;

export interface CreateIncomePayload {
  source: string;
  amount: number;
  description: string;
  date?: string;
  icon?: string;
}

export type UpdateIncomePayload = Partial<CreateIncomePayload>;

export interface DeleteIncomeResponse {
  acknowledged: boolean;
  deletedCount: number;
}
