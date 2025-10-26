import type { ApiResponse } from "./common-types";

export interface Expense {
  _id: string;
  icon: string;
  description: string;
  category: string;
  amount: number;
  removed: boolean;
  created: Date;
  updated: string;
}

export interface ExpenseListContent {
  data: Expense[];
  totalCount: number;
}

export type GetExpensesResponse = ApiResponse<ExpenseListContent>;

export type GetExpenseResponse = ApiResponse<Expense>;

export interface CreateExpensePayload {
  category: string;
  amount: number;
  description: string;
  created?: string;
  icon?: string;
}

export type UpdateExpensePayload = Partial<CreateExpensePayload>;

export interface DeleteExpenseResponse {
  acknowledged: boolean;
  deletedCount: number;
}
