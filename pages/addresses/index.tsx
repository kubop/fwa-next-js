import Link from 'next/link'
import { GetServerSideProps, InferGetServerSidePropsType } from "next"

type Address = {
  countUsers: number,
  addressId: number,
  street: string,
  number: number,
  city: string,
  zipCode: string
}

interface MyPageProps {
  addresses: Address[]
}

export const getServerSideProps: GetServerSideProps<MyPageProps> = async () => {
  const res = await fetch('https://127.0.0.1:7005/api/Address')
  const addresses: Address[] = await res.json()

  return {
    props: {
      addresses,
    },
  }
}

export default function Addresses({ addresses }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="flex items-center justify-center p-12">
      <div className="shadow-md sm:rounded-lg overflow-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Street
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Number
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Zip Code
                    </th>
                    <th scope="col" className="px-6 py-3">
                        City
                    </th>
                    <th scope="col" className="px-6 py-3">
                        # of Users
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
              {addresses.map(address => 
                  <tr key={address.addressId} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <td className="px-6 py-4">
                      {address.street}
                    </td>
                    <td className="px-6 py-4">
                      {address.number}
                    </td>
                    <td className="px-6 py-4">
                      {address.zipCode}
                    </td>
                    <td className="px-6 py-4">
                      {address.city}
                    </td>
                    <td className="px-6 py-4">
                      {address.countUsers}
                    </td>
                    <td className="px-6 py-4">
                        <Link href={`/address/${address.addressId}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                          Edit
                        </Link>
                        <Link href={`/address/delete/${address.addressId}`} className="ml-3 font-medium text-red-600 dark:text-red-500 hover:underline">
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
  