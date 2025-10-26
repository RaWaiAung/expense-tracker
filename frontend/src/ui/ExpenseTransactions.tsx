import { LuArrowRight } from "react-icons/lu";
import TransactionInCard from "./TransactionInCard";
import type { DashboardExpense } from "../types/dashboard-types";
import { formatDate } from "../utils/helper";

const ExpenseTransactions = ({
  transactions,
  toViewMore,
}: {
  transactions: DashboardExpense[];
  toViewMore: () => void;
}) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Expenses</h5>

        <button className="card-btn"
        onClick={toViewMore}
        >
          View More <LuArrowRight className="ml-1 text-base" />
        </button>
      </div>

      <div className="mt-6">
        {
          transactions.slice(0,5).map((transaction) => (
            <TransactionInCard
             key={transaction._id} 
             title={transaction.category}
             icon={transaction.icon}
             date={formatDate(transaction.created)} 
             amount={transaction.amount}
             type={transaction.type}
             hiddenDeleteButton={true}
            />
          ))
        }
      </div>
    </div>
  )
}

export default ExpenseTransactions;