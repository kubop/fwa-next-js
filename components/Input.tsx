import { memo } from "react"

interface InputProps {
    type?: string,
    name: string,
    label: string,
    value: string | string[],
    required?: boolean,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export default memo(function Input({ name, label, type = "text", value, required, onChange }: InputProps) {
    console.log('Rendering input ' + name)
    return (
        <>
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{ label }</label>
            <input 
                type={type}
                name={name} 
                onChange={(e) => onChange(e)} 
                value={value} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                {...(required ? { required: true } : {})}
            />
        </>
    )
})