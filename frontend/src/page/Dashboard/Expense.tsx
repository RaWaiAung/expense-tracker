import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout"
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import Modal from "../../components/Modal";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import ExpenseList from "../../components/Expense/ExpenseList";
import DeleteAlert from "../../components/Income/DeleteAlert";
import type { CreateExpensePayload, DeleteExpenseResponse, Expense, GetExpensesResponse } from "../../types/expense-types";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";

const Expense = () => {
  const [expenseData, setExpenseData] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState<boolean>(false);
  const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get<GetExpensesResponse>(API_PATHS.USAGE.GET_ALL_EXPENSES);
      if (response) {
        setExpenseData(response.data.content.data);
      }
    } catch (error) {
      console.log("Someting went wrong. Please try again", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expense: CreateExpensePayload) => {
    const { category, amount, description, created, icon } = expense;
    if (!category.trim()) {
      toast.error("Category is required");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }

    if (!created) {
      toast.error("Date is required");
      return;
    }
    if (!description) {
      toast.error("Description is required");
      return;
    }

    try {
      await axiosInstance.post<CreateExpensePayload>(API_PATHS.USAGE.ADD_EXPENSE, {
        category,
        amount: +amount,
        description,
        created,
        icon
      });
      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchExpenseDetails();
    } catch (error: any) {
      console.error(
        "Error adding income",
        error.response?.data?.message || error?.message
      )
    }
  };

  const deleteExpense = async (id: string | null) => {
    if (!id) {
      toast.error("Invalid Expense identifier");
      return;
    }

    try {
      await axiosInstance.delete<DeleteExpenseResponse>(API_PATHS.USAGE.DELETE_EXPENSE(id));
      toast.success("Expense deleted successfully");
      setExpenseData((prevExpense) =>
        prevExpense.filter((expense: { _id?: string }) => expense?._id !== id)
      );
      fetchExpenseDetails();
    } catch (error: any) {
      console.error(
        "Error deleting expense",
        error?.response?.data?.message || error?.message
      );
      toast.error(error?.response?.data?.message || "Failed to delete expense");
    } finally {
      setOpenDeleteAlert({
        show: false,
        data: null,
      });
    }
  };

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.USAGE.DOWNLOAD_EXPENSE_EXCEL,
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Expense details downloaded successfully");
    } catch (error) {
      console.log("Error downloading expense details:", error);
      toast.error("Failed to download expense details. Please try again");
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
    return () => { };
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModal(true)}
            />
            <ExpenseList
              transactions={expenseData}
              onDelete={
                (id) =>
                  setOpenDeleteAlert({
                    show: true,
                    data: id
                  })
              }
              onDownload={handleDownloadExpenseDetails}
            />
          </div>
        </div>
        <Modal isOpen={openAddExpenseModal} onClose={() => setOpenAddExpenseModal(false)} title="Add Expense" >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>
        <Modal
          title="Delete Income"
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({
            show: false,
            data: null
          })}
        >
          <DeleteAlert content="Are you sure to delete this expense"
            onDelete={() => deleteExpense(openDeleteAlert?.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expense
