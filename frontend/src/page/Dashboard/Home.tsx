import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdCard } from "react-icons/io";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import DashboardLayout from "../../components/layouts/DashboardLayout"
import InfoCard from "../../ui/InfoCard";
import RecentTransactions from "../../ui/RecentTransactions";
import FinanceOverviewChart from "../../ui/FinanceOverviewChart";
import ExpenseTransactions from "../../ui/ExpenseTransactions";
import Last30DaysExpense from "../../ui/Last30DaysExpense";
import RecentIncomeWithChart from "../../ui/RecentIncomeWithChart";
import RecentIncome from "../../ui/RecentIncome";
import type { DashboardData, GetDashboardResponse } from "../../types/dashboard-types";
import { useUserAuth } from "../../hooks/useUserAuth"
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { addThousandsSeperator } from "../../utils/helper";

const Home = () => {
  const navigate = useNavigate();

  useUserAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get<GetDashboardResponse>(API_PATHS.DASHBOARD.GET_DASHBOARD_DATA);
      setDashboardData(response.data.content);
    } catch (error) {
      console.log("Something went wrong. Please try again", error)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => { };
  }, []);
  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeperator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeperator(dashboardData?.totalIncome || 0)}
            color="bg-orange-500"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandsSeperator(dashboardData?.totalExpense || 0)}
            color="bg-red-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
            transactions={dashboardData?.lastTransactions || []}
            toViewMore={() => navigate('/income')}
          />
          <FinanceOverviewChart
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />

          <ExpenseTransactions
            transactions={dashboardData?.last30DaysUsage?.data || []}
            toViewMore={() => navigate('/expense')}
          />

          <Last30DaysExpense
            data={dashboardData?.last30DaysUsage?.data || []}
          />

          <RecentIncomeWithChart
            transactions={dashboardData?.last60DaysIncome?.data?.slice(0, 4) || []}
            totalIncome={dashboardData?.totalIncome || 0}
          />


          <RecentIncome
            transactions={dashboardData?.last60DaysIncome?.data || []}
            toViewMore={() => navigate('/income')}
          />
        </div>

      </div>
    </DashboardLayout>
  )
}

export default Home
