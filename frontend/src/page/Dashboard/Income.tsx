import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout"
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import toast from "react-hot-toast";
import IncomeList from "../../components/Income/IncomeList";
import DeleteAlert from "../../components/Income/DeleteAlert";
import { useUserAuth } from "../../hooks/useUserAuth";
import type { CreateIncomePayload, DeleteIncomeResponse, GetIncomesResponse } from "../../types/income-types";

const Income = () => {
  useUserAuth();
  const [incomeData, setIncomeData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get<GetIncomesResponse>(API_PATHS.INCOME.GET_ALL_INCOMES);
      if (response) {
        setIncomeData(response.data.content.data);
      }
    } catch (error) {
      console.log("Someting went wrong. Please try again", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = async (income: { source: any; amount: any; description: any, date: any; icon: any; }) => {
    const { source, amount, description, date, icon } = income;
    if (!source.trim()) {
      toast.error("Source is required");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }

    if (!date) {
      toast.error("Date is required");
      return;
    }
    if (!description) {
      toast.error("Description is required");
      return;
    }

    try {
      await axiosInstance.post<CreateIncomePayload>(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount: +amount,
        description,
        date,
        icon
      });
      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      fetchIncomeDetails();
    } catch (error: any) {
      console.error(
        "Error adding income",
        error.response?.data?.message || error?.message
      )
    }
  };

  const deleteIncome = async (id: string | null) => {
    if (!id) {
      toast.error("Invalid income identifier");
      return;
    }

    try {
      await axiosInstance.delete<DeleteIncomeResponse>(API_PATHS.INCOME.DELETE_INCOME(id));
      toast.success("Income deleted successfully");
      setIncomeData((prevIncome) =>
        prevIncome.filter((income: { _id?: string }) => income?._id !== id)
      );
      fetchIncomeDetails();
    } catch (error: any) {
      console.error(
        "Error deleting income",
        error?.response?.data?.message || error?.message
      );
      toast.error(error?.response?.data?.message || "Failed to delete income");
    } finally {
      setOpenDeleteAlert({
        show: false,
        data: null,
      });
    }
  };

  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME_EXCEL,
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Income details downloaded successfully");
    } catch (error) {
      console.log("Error downloading income details:", error);
      toast.error("Failed to download income details. Please try again");
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
    return () => { };
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
          <IncomeList
            transactions={incomeData}
            onDelete={
              (id) => 
                setOpenDeleteAlert({
                  show: true,
                  data: id
                })
            }
            onDownload={handleDownloadIncomeDetails}
          />
        </div>
        <Modal
          title="Add Income"
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
        >
          <div className="">
            <AddIncomeForm onAddIncome={handleAddIncome} />
          </div>
        </Modal>

        <Modal
          title="Delete Income"
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({
            show: false,
            data: null
          })}
        >
          <DeleteAlert content="Are you sure to delete this income"
            onDelete={() => deleteIncome(openDeleteAlert?.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income
