import React from "react";

export default function Input({ type, id, label, name, value, onChange, error }) {
    return (
        <div className="input-container">
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange} />
            <p className="error">{error}</p>
        </div>
    );
}