import { useState } from "react"
import Input from "../../ui/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddIncomeForm = ({
    onAddIncome
}: {
    onAddIncome: (income: {
        source: string,
        amount: string,
        description: string,
        date: string,
        icon: string
    }) => void
}) => {
    const [income, setIncome] = useState({
        source: "",
        amount: "",
        description: "",
        date: "",
        icon: ""
    });
    const handleChange = (key: any, value: any) => {
        setIncome({
            ...income,
            [key]: value
        })
    }
    return (
        <div>
            <EmojiPickerPopup
                icon={income.icon}
                onSelected={(selectedIcon: any) => handleChange("icon", selectedIcon)}
            />
            <Input
                value={income.source}
                onChange={({ target }) => handleChange("source", target.value)}
                label="Income Source"
                placeholder="Freelance, Salary, etc"
                type="text"
            />
              <Input
                value={income.description}
                onChange={({ target }) => handleChange("description", target.value)}
                label="Description"
                placeholder="Describe your income"
                type="text"
            />
            <Input
                value={income.amount}
                onChange={({ target }) => handleChange("amount", +target.value)}
                label="Amount"
                placeholder="Freelance, Salary, etc"
                type="number"
            />
            <Input
                value={income.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Date"
                placeholder="dd/mm/yyyy"
                type="date"
            />
            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="add-btn add-btn-fill"
                    onClick={() => onAddIncome(income)}
                >
                    Add Income
                </button>
            </div>
        </div>
    )
}

export default AddIncomeForm