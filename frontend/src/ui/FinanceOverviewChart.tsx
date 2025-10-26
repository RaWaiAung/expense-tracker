import CustomPieChart from "../components/Charts/CustomPieChart";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

const FinanceOverviewChart = ({
    totalBalance,
    totalIncome,
    totalExpense
}: {
    totalBalance: number;
    totalIncome: number;
    totalExpense: number;
}) => {
    const balanceData = [
        { label: "Total Balance", value: totalBalance, color: COLORS[0] },
        { label: "Total Income", value: totalIncome, color: COLORS[1] },
        { label: "Total Expense", value: totalExpense, color: COLORS[2] },
    ];
    
  return (
    <div className="card">
        <div className="flex items-center justify-between">
            <h5 className="text-lg">Financial Overview</h5>
        </div>
        <CustomPieChart data={balanceData}
        label="Total Balance"
        totalBalance={totalBalance}
        colors={COLORS}
        showTextAnchor
        />
    </div>
  )
}

export default FinanceOverviewChart