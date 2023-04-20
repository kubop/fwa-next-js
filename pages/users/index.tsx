import { InferGetServerSidePropsType } from "next"

type Users = User[]

type User = {
  Id: number,
  FirstName: string,
  LastName: string,
  Login: string,
  Address: string,
}

export const getServerSideProps = async () => {
  //const res = await fetch('https://www.bitstamp.net/api/v2/ticker/btcusd/') // TODO: Fetch users from backend
  const users: Users = [
    {
      Id: 1,
      FirstName: 'Jakub',
      LastName: 'Pernica',
      Login: 'kubop',
      Address: 'Halalovka 35, 911 08 Trenčín'
    },
    {
      Id: 2,
      FirstName: 'Daddy',
      LastName: 'Puff',
      Login: 'dap',
      Address: 'Soblahovská 11, 911 01 Trenčín'
    },
    {
      Id: 3,
      FirstName: 'Johanka',
      LastName: 'z Arku',
      Login: 'zaj',
      Address: '1'
    }
  ]

  await new Promise(resolve => setTimeout(resolve, 3000)); // Artificial delay

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
                          Action
                      </th>
                  </tr>
              </thead>
              <tbody>
                  {users.map(user => 
                      <tr key={user.Id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <td className="px-6 py-4">
                            {user.FirstName}
                        </td>
                        <td className="px-6 py-4">
                          {user.LastName}
                        </td>
                        <td className="px-6 py-4">
                          {user.Login}
                        </td>
                        <td className="px-6 py-4">
                          {user.Address}
                        </td>
                        <td className="px-6 py-4">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> 
                            {/* TODO: Change to <Link> when we have [id].tsx finished */}
                        </td>
                      </tr>
                  )}
              </tbody>
          </table>
      </div>

    </main>
  )
}
