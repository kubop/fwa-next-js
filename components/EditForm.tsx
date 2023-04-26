import { memo, useState } from "react"
import { Response } from "@/ts-types/types"
import Alert from "./Alert"

interface EditFormProps<T> {
    children: React.ReactNode
    apiPath: string,
    method: string
    formData: T
}

export default function EditForm<T>({ children, apiPath, method, formData }: EditFormProps<T>) {
    const [response, setResponse] = useState<Response | null>(null)
    
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        fetch(apiPath, {
            method: method,
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (res.ok) {
                setResponse({
                    type: "success",
                    message: "Successfully updated!" // Can get success message from backend, same as for error
                })
            } else {
                res.text().then(text =>
                    setResponse({
                        type: "error",
                        message: text
                    })
                )
            }
        })
    }
    console.log('Rendering EditForm')
    return (
        <form onSubmit={handleSubmit}>
            {children}
            
            {response && 
                <Alert type={response.type} text={response.message} onClose={() => setResponse(null)} />
            }

            <div className="flex justify-center">
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </div>
        </form>
    )
}