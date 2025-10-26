import { useState } from "react";
import Input from "../../ui/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";
import type { CreateExpensePayload } from "../../types/expense-types";

type ExpenseFormState = {
  category: string;
  amount: string;
  description: string;
  created: string;
  icon: string;
};

const AddExpenseForm = ({
  onAddExpense,
}: {
  onAddExpense: (expense: CreateExpensePayload) => void;
}) => {
  const [expense, setExpense] = useState<ExpenseFormState>({
    category: "",
    amount: "",
    description: "",
    created: "",
    icon: "",
  });

  const handleChange = (key: keyof ExpenseFormState, value: string) => {
    setExpense((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    onAddExpense({
      category: expense.category,
      amount: Number(expense.amount),
      description: expense.description,
      created: expense.created,
      icon: expense.icon,
    });
  };

  return (
    <div>
      <EmojiPickerPopup
        icon={expense.icon}
        onSelected={(selectedIcon: string) => handleChange("icon", selectedIcon)}
      />
      <Input
        value={expense.category}
        onChange={({ target }) => handleChange("category", target.value)}
        label="Expense Category"
        placeholder="Food, Transport, etc"
        type="text"
      />
      <Input
        value={expense.description}
        onChange={({ target }) => handleChange("description", target.value)}
        label="Description"
        placeholder="Describe your expense"
        type="text"
      />
      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder="Enter amount"
        type="number"
      />
      <Input
        value={expense.created}
        onChange={({ target }) => handleChange("created", target.value)}
        label="Date"
        placeholder="dd/mm/yyyy"
        type="date"
      />
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={handleSubmit}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
