import '../App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import ExpenseData from "../ExpenseData";
import ExpenseForm from "./ExpenseForm";
import Expensetable from "./ExpenseTable";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export default function Content() {
    const [expenses, setExpenses] = useLocalStorage("expenses", ExpenseData);
    const [expense, setExpense] = useLocalStorage("expense", {
        title: "",
        category: "",
        amount: "",
    });
    const [editingRowId, setEditingRowId] = useLocalStorage("editingRowId", "");

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
                <Expensetable expenses={expenses}
                    setExpenses={setExpenses}
                    setExpense={setExpense}
                    setEditingRowId={setEditingRowId}
                />
            </div>
        </main>
    );
}