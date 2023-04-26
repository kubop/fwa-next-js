export interface SelectValue {
    id: number | undefined,
    value: string | undefined
}

export interface SelectProps {
    name: string,
    label: string,
    values: SelectValue[],
    defaultValue: string | undefined,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
}

export default function Select({ name, label, values, defaultValue, onChange}: SelectProps) {
    return (
        <>
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
            <select name={name} defaultValue={defaultValue} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {values.map(v => 
                    <option
                        key={v.id}
                        value={v.id}
                    >
                        {v.value}
                    </option>
                )}
            </select>
        </>
    )
}