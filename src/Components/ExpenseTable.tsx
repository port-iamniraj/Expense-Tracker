import React, { useState } from "react";

import '@fortawesome/fontawesome-free/css/all.min.css';
import { useFilter } from "../hooks/useFilter";
import ContextMenu from "./ContextMenu";

export default function Expensetable({ expenses, setExpenses, setExpense, setEditingRowId }) {
    const [filteredData, setQuery] = useFilter(expenses, (data) => data.category);
    const [contextMenuPosition, setPosition] = useState({});
    const [currentExpo, setCurrentExpo] = useState({});
    const [sortCallback, setSortCallback] = useState(() => () => { });

    const totalAmount = filteredData.reduce((accumulator, { amount }) => accumulator + (+amount), 0);

    return (
        <>
            <table className="expense-table" onClick={() => {
                if (contextMenuPosition.left) {
                    setPosition({});
                }
            }}>
                <thead>
                    <tr>
                        <th>
                            <div className="amount-box">
                                <div className="amount">Title</div>
                                <div className="up-down-btn">
                                    <button className="up" title="Ascending" onClick={() => {
                                        setSortCallback(() => (a, b) => a.title.localeCompare(b.title));
                                    }}>
                                        <i className="fa-solid fa-arrow-up"></i>
                                    </button>
                                    <button className="down" title="Descending" onClick={() => {
                                        setSortCallback(() => (a, b) => b.title.localeCompare(a.title));
                                    }}>
                                        <i className="fa-solid fa-arrow-down"></i>
                                    </button>
                                </div>
                            </div>
                        </th>
                        <th>
                            <select id="select-category" onChange={(e) => setQuery(e.target.value)}>
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
                                        setSortCallback(() => (a, b) => a.amount - b.amount);
                                    }}>
                                        <i className="fa-solid fa-arrow-up"></i>
                                    </button>
                                    <button className="down" title="Descending" onClick={() => {
                                        setSortCallback(() => (a, b) => b.amount - a.amount);
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
                            setSortCallback(() => () => { });
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