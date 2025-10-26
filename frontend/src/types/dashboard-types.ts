import type { ApiResponse } from "./common-types";
import type { Expense } from "./expense-types";
import type { Income } from "./income-types";

export type ExpenseTransactionType = "expense";

export interface DashboardExpense extends Expense {
  user_id?: string;
  type: ExpenseTransactionType;
}

export interface DashboardIncome extends Income {
  user_id?: string;
  type: "income";
}

export type DashboardTransaction = DashboardExpense | DashboardIncome;

export interface DashboardSeries<T extends DashboardTransaction> {
  total: number;
  data: T[];
}

export interface DashboardData {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  last30DaysUsage: DashboardSeries<DashboardExpense>;
  last60DaysIncome: DashboardSeries<DashboardIncome>;
  lastTransactions: DashboardTransaction[];
}

export type GetDashboardResponse = ApiResponse<DashboardData>;
