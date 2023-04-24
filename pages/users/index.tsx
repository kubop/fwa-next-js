import Link from 'next/link'
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { User } from '../../ts-types/types'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export const getServerSideProps: GetServerSideProps<{users: User[]}> = async (context) => {
  const res = await fetch(`https://127.0.0.1:7005/api/User?orderBy=${context.query?.orderBy}`)
  const users: User[] = await res.json()

  return {
    props: {
      users,
    },
  }
}

export default function Users({ users }: InferGetServerSidePropsType<typeof getServerSideProps>) { 
  const router = useRouter()
  const [tableUsers, setTableUsers] = useState(users)
  const [showDeletePopup, setShowDeletePopup] = useState<number | null>(null)
  function handleDeleteButtonClicked(e: React.MouseEvent<HTMLButtonElement | MouseEvent>, userId: number) {
    if (userId === showDeletePopup) {
      fetch(`https://127.0.0.1:7005/api/user/${userId}`,{
        method: 'DELETE',
        body: JSON.stringify({
          id: userId
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        if (res.ok) {
          const updatedUsers = tableUsers.filter(u => u.userId !== userId)
          setTableUsers(updatedUsers)
        } else {
          console.log('Handle error delete used popup')
        }
      })
    }
    
    setShowDeletePopup(userId)
  }

  function handleSortByClick(e: any, newSortBy: string) {
    let oldSortBy = router.query?.orderBy

    if (oldSortBy === newSortBy + `_DESC`) {
      newSortBy = ""
    }
    else if (oldSortBy === newSortBy) {
      newSortBy = newSortBy + `_DESC`
    }

    router.push({
      pathname: router.pathname,
      query: { orderBy: newSortBy }
    })
  }

  useEffect(() => {
    setTableUsers(users)
  }, [users])

  return (
    <main className="flex items-center justify-center p-12">
      
      <div className="shadow-md sm:rounded-lg overflow-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3 hover:underline cursor-pointer" onClick={(e) => handleSortByClick(e, "FirstName")}>
                          First name
                      </th>
                      <th scope="col" className="px-6 py-3 hover:underline cursor-pointer" onClick={(e) => handleSortByClick(e, "LastName")}>
                          Last name
                      </th>
                      <th scope="col" className="px-6 py-3 hover:underline cursor-pointer" onClick={(e) => handleSortByClick(e, "Login")}>
                          Login
                      </th>
                      <th scope="col" className="px-6 py-3 hover:underline cursor-pointer" onClick={(e) => handleSortByClick(e, "Address")}>
                          Address
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Actions
                      </th>
                  </tr>
              </thead>
              <tbody>
                {tableUsers.map(user => 
                    <tr key={user.userId} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                      <td className="px-6 py-4">
                          {user.firstName}
                      </td>
                      <td className="px-6 py-4">
                        {user.lastName}
                      </td>
                      <td className="px-6 py-4">
                        {user.login}
                      </td>
                      <td className="px-6 py-4">
                        {user.address}
                      </td>
                      <td className="px-6 py-4 flex">
                          <Link href={`/users/${user.userId}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                            Edit
                          </Link>
                          {showDeletePopup === user.userId ? (
                            <div className="flex">
                              <button onClick={(e) => handleDeleteButtonClicked(e, user.userId)} className="w-max ml-3 font-medium text-red-600 dark:text-red-500 hover:underline">
                                  Confirm delete
                              </button>
                              <button onClick={() => setShowDeletePopup(null)} className="w-max ml-2 font-medium text-red-600 dark:text-red-500 hover:underline">Undo</button>
                            </div>
                            ) : (
                              <button onClick={() => setShowDeletePopup(user.userId)} className="w-max ml-3 font-medium text-red-600 dark:text-red-500 hover:underline">
                                Delete
                            </button>
                            )}
                      </td>
                    </tr>
                )}
              </tbody>
          </table>
      </div>

    </main>
  )
}
