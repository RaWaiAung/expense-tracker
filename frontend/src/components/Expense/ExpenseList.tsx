import { LuDownload } from "react-icons/lu"
import TransactionInCard from "../../ui/TransactionInCard"
import { formatDate } from "../../utils/helper"

const ExpenseList = ({
    transactions,
    onDelete,
    onDownload
}: {
    transactions: any,
    onDelete: (id: any) => void,
    onDownload: () => void,
}) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">
                    Expense List
                </h5>
                <button className="card-btn" onClick={onDownload}>
                    <LuDownload className="text-base" />
                    Download
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                {
                    transactions.map((expense: any) => (
                        <TransactionInCard
                            key={expense.id}
                            title={expense.category}
                            icon={expense.icon}
                            date={formatDate(expense.created)}
                            amount={expense.amount}
                            type="expense"
                            onDelete={() => onDelete(expense._id)}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default ExpenseList