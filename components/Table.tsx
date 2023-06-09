import Link from "next/link"
import { useEffect, useState } from "react"

export interface TableProps<T> {
    tableHeaders: TableHeader<T>[],
    tableRows: {
        id: keyof T, // What's the id property key called, for user it's userId, for address it's addressId etc...
        data: T[],
    },
    pagePath: string,
    apiPath: string,
}

export interface TableHeader<T> {
    objectKey: keyof T,      // This is how is the property key called in the object
    label: string,          // This is what we display in the table header
    sortByName?: string,    // For the backend sorting
}

export default function Table<T>({ tableHeaders, tableRows, apiPath, pagePath }: TableProps<T>) {
    // Normalize api path
    if (apiPath.endsWith('/')) {
        apiPath = apiPath.substring(0, apiPath.length - 1)
    }

    const [tableData, setTableData] = useState(tableRows.data)
    const [showDeletePopup, setShowDeletePopup] = useState<number | null>(null)
    const [sortBy, setSortBy] = useState("") 

    function handleSortByClick(sortByNew: string) {
        setSortBy(old => {
            if (old === sortByNew + `_DESC`) {
                return ""
            }
            else if (old === sortByNew) {
                return old + `_DESC`
            } else {
                return sortByNew
            }
        })
    }

    useEffect(() => {
        const res =  fetch(`${apiPath}?orderBy=${sortBy}`).then((res) => {
            res.json().then(res => {
                setTableData(res)
            })
        })
    }, [apiPath, sortBy])

    function handleDeleteButtonClicked(e: React.MouseEvent<HTMLButtonElement | MouseEvent>, id: number) {
        if (id === showDeletePopup) {
            fetch(`${apiPath}/${id}`,{
                method: 'DELETE',
                body: JSON.stringify({
                    id: id
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                if (res.ok) {
                    const updatedTableData = tableData.filter(d => d[tableRows.id] !== id)
                    setTableData(updatedTableData)
                } else {
                    console.log('Handle error delete used popup')
                }
            })
        }
    }

    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    {tableHeaders.map((th, index) => // Using key={index} should be fine here?
                        <th key={index} 
                            scope="col" 
                            className={`px-6 py-3 ${th.sortByName && `hover:underline cursor-pointer`}`}
                            onClick={() => handleSortByClick(th.sortByName ?? "")}
                        >
                            {th.label}
                        </th>
                    )}
                    <th scope="col" className="px-6 py-3">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {tableData.map(row => 
                    <tr key={row[tableRows.id] as React.Key} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        {tableHeaders.map((header, index) => // Using key={index} should be fine here?
                            <td key={index} className="px-6 py-4"> 
                                {row[header.objectKey] as React.ReactNode}
                            </td>
                        )}
                        <td className="px-6 py-4 flex">
                            <Link href={`/${pagePath}/${row[tableRows.id]}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                Edit
                            </Link>     
                            {showDeletePopup === row[tableRows.id] ? (
                                <div className="flex">
                                <button onClick={(e) => handleDeleteButtonClicked(e, row[tableRows.id] as number)} className="w-max ml-3 font-medium text-red-600 dark:text-red-500 hover:underline">
                                    Confirm delete
                                </button>
                                <button onClick={() => setShowDeletePopup(null)} className="w-max ml-2 font-medium text-red-400 dark:text-red-500 hover:underline">Undo</button>
                                </div>
                            ) : (
                                <button onClick={() => setShowDeletePopup(row[tableRows.id] as number)} className="w-max ml-3 font-medium text-red-600 dark:text-red-500 hover:underline">
                                    Delete
                                </button>
                            )}                 
                      </td>
                    </tr>    
                )}
            </tbody>
        </table>
    )
}