import { LuDownload } from "react-icons/lu"
import TransactionInCard from "../../ui/TransactionInCard"
import { formatDate } from "../../utils/helper"

const IncomeList = ({
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
                    Income Sources
                </h5>
                <button className="card-btn" onClick={onDownload}>
                    <LuDownload className="text-base" />
                    Download
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                {
                    transactions.map((income: any) => (
                        <TransactionInCard
                            key={income.id}
                            title={income.source}
                            icon={income.icon}
                            date={formatDate(income.created)}
                            amount={income.amount}
                            type="income"
                            onDelete={() => onDelete(income._id)}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default IncomeList