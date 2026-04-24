type SelectProps = {
    label: string;
    id: string;
    name: "title" | "category" | "amount";
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    defaultOption?: string;
    options: string[];
    error?: string | undefined;
};

export default function Select({
    label,
    id,
    name,
    value,
    onChange,
    defaultOption,
    options,
    error
}: SelectProps) {
    return (
        <div className="input-container">
            <label htmlFor={id}>{label}</label>

            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
            >
                {
                    defaultOption && (
                        <option value="" disabled
                        >
                            {defaultOption}
                        </option>
                    )
                }

                {
                    options.map((option) =>
                        <option key={option} value={option}
                        >
                            {option}
                        </option>
                    )
                }
            </select>
            {error && <p className="error">{error}</p>}
        </div>
    );
}