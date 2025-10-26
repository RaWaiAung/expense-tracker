import { useEffect, useState } from "react";
import { prepareIncomeDataForChart } from "../../utils/helper";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart";

const IncomeOverview = ({
    transactions,
    onAddIncome
}: {
    transactions: any,
    onAddIncome: () => void;
}) => {
    const [chartData, setChartData] = useState<any>([]);
    useEffect(() => {
        const data = prepareIncomeDataForChart(transactions);
        setChartData(data);
        return () => {};
    }, [transactions]);
  return (
    <div className="card">
        <div className="flex items-center justify-between">
            <div className="">
                <h5 className="text-lg">Income Overview</h5>
                <p className="text-xs text-gray-400 mt-0.5">Track your earning overtime and ananyze your income</p>
            </div>

            <button className="add-btn" onClick={onAddIncome}>
                <LuPlus className="text-lg" />
                Add Income
            </button>
        </div>

        <div className="mt-10">
            <CustomBarChart data={chartData} />
        </div>
    </div>
  )
}

export default IncomeOverview