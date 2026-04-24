type InputProps = {
    type: string;
    id: string;
    label: string;
    name: "title" | "category" | "amount";
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string | undefined;
};

export default function Input({ type, id, label, name, value, onChange, error }: InputProps) {
    return (
        <div className="input-container">
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
            />
            {error && <p className="error">{error}</p>}
        </div>
    );
}