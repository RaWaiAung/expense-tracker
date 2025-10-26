import { LuArrowRight } from "react-icons/lu";
import { formatDate } from "../utils/helper";
import TransactionInCard from "./TransactionInCard";
import type { DashboardIncome } from "../types/dashboard-types";

const RecentIncome = ({
  transactions,
  toViewMore,
}: {
  transactions: DashboardIncome[];
  toViewMore: () => void;
}) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income</h5>

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
             title={transaction.source}
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

export default RecentIncome;
