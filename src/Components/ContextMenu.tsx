import type { ExpenseDataType } from "../constants/expenseData";
import type { ExpenseFormType } from "./Content";
import type { Position } from "./ExpenseTable";

type ContextMenuProps = {
    contextMenuPosition: Position;
    setPosition: React.Dispatch<React.SetStateAction<Position>>;
    editExpenses: React.Dispatch<React.SetStateAction<ExpenseDataType[]>>
    currentExpo: ExpenseDataType | null;
    setExpense: React.Dispatch<React.SetStateAction<ExpenseFormType>>
    setEditingRowId: React.Dispatch<React.SetStateAction<string>>
}

export default function ContextMenu({
    contextMenuPosition,
    setPosition,
    editExpenses,
    currentExpo,
    setExpense,
    setEditingRowId
}: ContextMenuProps) {

    if (contextMenuPosition.left === undefined || !currentExpo) return null;

    const { id: rowId, title, category, amount } = currentExpo;

    return (
        <div
            className="context-menu"
            style={{
                left: contextMenuPosition.left,
                top: contextMenuPosition.top
            }}
        >
            <div onClick={() => {
                setPosition({});
                setExpense({ title, category, amount });
                setEditingRowId(rowId);
            }}>
                Edit
            </div>

            <div onClick={() => {
                setPosition({});
                editExpenses(prevState => prevState.filter(expense => expense.id !== rowId));
            }}>
                Delete
            </div>
        </div>
    );
}