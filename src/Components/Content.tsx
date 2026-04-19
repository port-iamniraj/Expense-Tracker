import '../App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import expenseData, { type ExpenseDataType } from '../constants/expenseData';
import ExpenseForm from "./ExpenseForm";
import Expensetable from "./ExpenseTable";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ExpenseFormType = {
    title: string;
    category: string;
    amount: string;
}

export default function Content() {
    const [expenses, setExpenses] = useLocalStorage<ExpenseDataType[]>("expenses", expenseData);
    const [expense, setExpense] = useLocalStorage<ExpenseFormType>("expense", {
        title: "",
        category: "",
        amount: "",
    });
    const [editingRowId, setEditingRowId] = useLocalStorage<string>("editingRowId", "");

    return (
        <main>
            <h1 className="heading">Track Your Expense</h1>
            <div className="content">
                <ExpenseForm
                    setExpenses={setExpenses}
                    expense={expense}
                    setExpense={setExpense}
                    editingRowId={editingRowId}
                    setEditingRowId={setEditingRowId}
                />
                <Expensetable
                    expenses={expenses}
                    setExpenses={setExpenses}
                    setExpense={setExpense}
                    setEditingRowId={setEditingRowId}
                />
            </div>
        </main>
    );
}