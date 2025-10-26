import { LuArrowRight } from "react-icons/lu";
import { formatDate } from "../utils/helper";
import TransactionInCard from "./TransactionInCard";
import type { DashboardTransaction } from "../types/dashboard-types";

const RecentTransactions = ({
  transactions,
  toViewMore,
}: {
  transactions: DashboardTransaction[];
  toViewMore: () => void;
}) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Recent Transactions</h5>

        <button className="card-btn"
        onClick={toViewMore}
        >
          View More <LuArrowRight className="ml-1 text-base" />
        </button>
      </div>

      <div className="mt-6">
        {
          transactions.map((transaction) => (
            <TransactionInCard
             key={transaction._id} 
             title={transaction.type === 'income' ? transaction.source : transaction.category}
             icon={transaction.icon}
             date={formatDate(transaction.created)} 
             amount={transaction.amount}
             type={transaction.type === 'income' ? 'income' : 'expense'}
             hiddenDeleteButton={true}
            />
          ))
        }
      </div>
    </div>
  )
}

export default RecentTransactions;
