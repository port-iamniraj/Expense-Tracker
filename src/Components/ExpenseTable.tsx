import React, { useState, type SetStateAction } from "react";

import '@fortawesome/fontawesome-free/css/all.min.css';
import { useFilter } from "../hooks/useFilter"
import ContextMenu from "./ContextMenu";
import type { ExpenseDataType } from "../constants/expenseData";
import type { ExpenseFormType } from "./Content";

type ExpenseTableProps = {
    expenses: ExpenseDataType[];
    setExpenses: React.Dispatch<React.SetStateAction<ExpenseDataType[]>>;
    setExpense: React.Dispatch<React.SetStateAction<ExpenseFormType>>;
    setEditingRowId: React.Dispatch<React.SetStateAction<string>>
}

export type Position = {
    left?: number;
    top?: number;
}

export default function Expensetable({
    expenses,
    setExpenses,
    setExpense,
    setEditingRowId
}: ExpenseTableProps) {
    const [filteredData, setQuery] = useFilter(expenses, (data) => data.category);
    const [contextMenuPosition, setPosition] = useState<Position>({});
    const [currentExpo, setCurrentExpo] = useState<ExpenseDataType | null>(null);
    const [sortCallback, setSortCallback] =
        useState<(a: ExpenseDataType, b: ExpenseDataType) => number>(() => 0);

    const totalAmount = filteredData.reduce((accumulator, { amount }) => accumulator + (+amount), 0);

    return (
        <>
            <table
                className="expense-table"
                onClick={() => {
                    if (contextMenuPosition.left) {
                        setPosition({});
                    }
                }}
            >
                <thead>
                    <tr>
                        <th>
                            <div className="amount-box">
                                <div className="amount">Title</div>
                                <div className="up-down-btn">
                                    <button className="up" title="Ascending" onClick={() => {
                                        setSortCallback(() => (a: ExpenseDataType, b: ExpenseDataType) => a.title.localeCompare(b.title));
                                    }}>
                                        <i className="fa-solid fa-arrow-up"></i>
                                    </button>
                                    <button className="down" title="Descending" onClick={() => {
                                        setSortCallback(() => (a: ExpenseDataType, b: ExpenseDataType) => b.title.localeCompare(a.title));
                                    }}>
                                        <i className="fa-solid fa-arrow-down"></i>
                                    </button>
                                </div>
                            </div>
                        </th>
                        <th>
                            <select
                                id="select-category"
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                    setQuery(e.currentTarget.value)}
                            >
                                <option value="">All</option>
                                <option value="Grocery">Grocery</option>
                                <option value="Clothes">Clothes</option>
                                <option value="Housing">Clothes</option>
                                <option value="Bills">Bills</option>
                                <option value="Education">Education</option>
                                <option value="Medicine">Medicine</option>
                                <option value="Other">Other</option>
                            </select>
                        </th>
                        <th>
                            <div className="amount-box">
                                <div className="amount">Amount</div>
                                <div className="up-down-btn">
                                    <button className="up" title="Ascending" onClick={() => {
                                        setSortCallback(() => (a: ExpenseDataType, b: ExpenseDataType) => Number(a.amount) - Number(b.amount));
                                    }}>
                                        <i className="fa-solid fa-arrow-up"></i>
                                    </button>
                                    <button className="down" title="Descending" onClick={() => {
                                        setSortCallback(() => (a: ExpenseDataType, b: ExpenseDataType) => Number(b.amount) - Number(a.amount));
                                    }}>
                                        <i className="fa-solid fa-arrow-down"></i>
                                    </button>
                                </div>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredData.sort(sortCallback).map(({ id, title, category, amount }) => {
                            return (
                                <tr key={id} onContextMenu={(e) => {
                                    e.preventDefault();
                                    setPosition({ left: e.clientX + 4, top: e.clientY + 4 });
                                    setCurrentExpo({ id, title, category, amount });
                                }}>
                                    <td>{title}</td>
                                    <td>{category}</td>
                                    <td>₹{amount}</td>
                                </tr>
                            );
                        })
                    }
                    <tr>
                        <th>Total</th>
                        <th className="clear-sort" onClick={() => {
                            setSortCallback(() => () => 0);
                        }}>Clear Sort</th>
                        <th>₹{totalAmount}</th>
                    </tr>
                </tbody>
            </table>
            <ContextMenu
                contextMenuPosition={contextMenuPosition}
                setPosition={setPosition}
                editExpenses={setExpenses}
                currentExpo={currentExpo}
                setExpense={setExpense}
                setEditingRowId={setEditingRowId}
            />
        </>
    );
}