import React from "react";

export default function ContextMenu({ contextMenuPosition, setPosition, editExpenses, currentExpo, setExpense, setEditingRowId }) {
    if (!contextMenuPosition.left) return;

    const { id: rowId, title, category, amount } = currentExpo;
    return (
        <div className="context-menu" style={contextMenuPosition}>
            <div onClick={() => {
                setPosition({});
                setExpense({ title, category, amount });
                setEditingRowId(rowId);
            }}>Edit</div>
            <div onClick={() => {
                setPosition({});
                editExpenses(prevState => prevState.filter(expense => expense.id !== rowId));
            }}>Delete</div>
        </div>
    );
}