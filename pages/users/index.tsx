import Link from 'next/link'
import { InferGetServerSidePropsType } from "next"

type Users = User[]

type User = {
  "userId": number,
  "firstName": string,
  "lastName": string,
  "login": string,
  "password": string,
  "street": string,
  "number": number,
  "city": string,
  "zipCode": string
}

export const getServerSideProps = async () => {
  const res = await fetch('https://127.0.0.1:7005/api/User')
  const users: Users = await res.json()

  return {
    props: {
      users,
    },
  }
}

export default function Users({ users }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="flex flex-col items-center justify-between p-12">
      
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          First name
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Last name
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Login
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Address
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Actions
                      </th>
                  </tr>
              </thead>
              <tbody>
                {users.map(user => 
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
                        {`${user.street} ${user.number}, ${user.zipCode} ${user.city}`} 
                      </td>
                      <td className="px-6 py-4">
                          <Link href={`/users/${user.userId}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                            Edit
                          </Link>
                          <Link href={`/users/delete/${user.userId}`} className="ml-3 font-medium text-red-600 dark:text-red-500 hover:underline">
                            Delete
                          </Link>
                      </td>
                    </tr>
                )}
              </tbody>
          </table>
      </div>

    </main>
  )
}
