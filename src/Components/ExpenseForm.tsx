import { useState } from "react";
import Input from "./Input";
import Select from "./Select";

import type { ExpenseDataType } from "../constants/expenseData";
import type { ExpenseFormType } from "./Content";

type ExpenseFormProps = {
    setExpenses: React.Dispatch<React.SetStateAction<ExpenseDataType[]>>;
    expense: ExpenseFormType;
    setExpense: React.Dispatch<React.SetStateAction<ExpenseFormType>>;
    editingRowId: string;
    setEditingRowId: React.Dispatch<React.SetStateAction<string>>;
}

type ErrorsType = Partial<Record<keyof ExpenseFormType, string>>;

type ValidationRule = {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
    message: string;
};

type ValidationConfigType = Record<keyof ExpenseFormType, ValidationRule[]>;

export default function ExpenseForm({ setExpenses, expense, setExpense, editingRowId, setEditingRowId }: ExpenseFormProps) {
    const [errors, setErrors] = useState<ErrorsType>({});

    const validationConfig: ValidationConfigType = {
        title: [
            { required: true, message: "Title can not be empty" },
            { minLength: 2, message: "Title should be at least 3 characters long" }
        ],
        category: [
            { required: true, message: "Select category" }
        ],
        amount: [
            { required: true, message: "Amount is required" },
            { pattern: /^(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/, message: "Please enter valid amount" }
        ],
    };

    function validate(formData: ExpenseFormType) {
        const errorsData: ErrorsType = {};

        Object.entries(formData).forEach(([key, value]) => {
            const field = key as keyof ExpenseFormType

            validationConfig[field].some((rule) => {
                if (rule.required && !value) {
                    errorsData[field] = rule.message;
                    return true;
                }

                if (rule.minLength && value.length <= rule.minLength) {
                    errorsData[field] = rule.message;
                    return true;
                }

                if (rule.pattern && rule.pattern.test(value) !== true) {
                    errorsData[field] = rule.message;
                    return true;
                }
            });
        });

        setErrors(errorsData);
        return errorsData;
    }

    function expenseHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const validateResult = validate(expense);
        if (Object.keys(validateResult).length) return;

        if (editingRowId) {
            setExpenses((prevState) => {
                return prevState.map((prevExpense) => {
                    if (prevExpense.id === editingRowId) {
                        return { ...expense, id: editingRowId };
                    }
                    return prevExpense;
                });
            });

            setEditingRowId("");
            setExpense({
                title: "",
                category: "",
                amount: ""
            });
            return;
        }

        setExpenses((prevState) => [...prevState, { id: crypto.randomUUID(), ...expense }]);
        setExpense({
            title: "",
            category: "",
            amount: ""
        });
    }

    function setValue(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.currentTarget;
        setExpense((prevState) => ({ ...prevState, [name]: value }));
        setErrors((prevState) => ({ ...prevState, [name]: "" }));
    }

    return (
        <form className="form-content" onSubmit={expenseHandler}>
            <Input
                type="text"
                label="Title"
                id="title"
                name="title"
                value={expense.title}
                onChange={setValue}
                error={errors.title}
            />
            <Select
                label="Category"
                id="category"
                name="category"
                value={expense.category}
                onChange={setValue}
                defaultOption="All"
                options={["Grocery", "Clothes", "Housing", "Bills", "Education", "Medicine", "Other"]}
                error={errors.category}
            />
            <Input
                type="text"
                label="Amount"
                id="amount"
                name="amount"
                value={expense.amount}
                onChange={setValue}
                error={errors.amount}
            />
            <button type="submit" className="add-btn">{editingRowId ? "Save" : "Add"}</button>
        </form >
    );
}