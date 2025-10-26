import { useEffect, useState } from "react";
import CustomPieChart from "../components/Charts/CustomPieChart";
import type { DashboardIncome } from "../types/dashboard-types";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4F39F6"];
const RecentIncomeWithChart = ({
    transactions,
    totalIncome
}: {
    transactions: DashboardIncome[];
    totalIncome: number;
}) => {
    const [chartData, setChartData] = useState<{ label: string; value: number; }[]>([]);

    const prepareChartData = () => {
        const incomeData = transactions.map((item: any) => ({
            label: item.source,
            value: item.amount,
        }));
        setChartData(incomeData);
    };

    useEffect(() => {
        prepareChartData();
        return () => { };
    }, [transactions]);
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Last 30 Days Income</h5>
            </div>

            <CustomPieChart
                data={chartData}
                label="Total Income"
                totalBalance={totalIncome}
                colors={COLORS}
                showTextAnchor
            />
        </div>
    )
}

export default RecentIncomeWithChart