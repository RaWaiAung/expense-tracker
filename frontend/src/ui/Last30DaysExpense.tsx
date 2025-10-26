import { useState, useEffect } from "react";
import CustomBarChart from "../components/Charts/CustomBarChart";
import type { DashboardExpense } from "../types/dashboard-types";
import { prepareExpenseDataForChart } from "../utils/helper";

const Last30DaysExpense = ({ data }: { data: DashboardExpense[] }) => {
    const [chartData, setChartData] = useState<Array<{ category: string; amount: number }>>([]);

    useEffect(() => {
        const result = prepareExpenseDataForChart(data);
        setChartData(result);
        return () => { };
    }, [data]);

    return (
        <div className="card col-span-1">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Last 30 Days Expenses</h5>
            </div>
            <CustomBarChart
                data={chartData} />
        </div>
    )
}

export default Last30DaysExpense