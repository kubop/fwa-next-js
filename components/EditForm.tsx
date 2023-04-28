import { memo, useState } from "react"
import { Response } from "@/ts-types/types"
import Alert from "./Alert"

interface EditFormProps<T> {
    children: React.ReactNode
    apiPath: string,
    method: string
    formData: T,
    handleSuccess(res: SuccessJson): void,
    handleRefresh(): Promise<void>
}

export interface SuccessJson {
    newVerCol: Buffer
}

export default function EditForm<T>({ children, apiPath, method, formData, handleSuccess, handleRefresh }: EditFormProps<T>) {
    const [response, setResponse] = useState<Response | null>(null)
    
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        fetch(apiPath, {
            method: method,
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (res) => {
            if (res.ok) {
                setResponse({
                    type: "success",
                    message: "Successfully updated!" // Can get success message from backend, same as for error
                })

                const successJson = await res.json() as SuccessJson
                handleSuccess(successJson)
            } else if (res.status === 409) { // Conflict
                setResponse({
                    type: "conflict",
                    message: "Entity was edited by someone else in the meantime."
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
            {response?.type === 'conflict' && 
                <div className="flex justify-center mb-2">
                    <button onClick={e => {
                        e.preventDefault()
                        handleRefresh().then(() => setResponse(null)) 
                    }} className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900">Refresh</button>
                </div>
            }

            <div className="flex justify-center">
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </div>
        </form>
    )
}