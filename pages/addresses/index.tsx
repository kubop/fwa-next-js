import Link from 'next/link'
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { Address } from '../../ts-types/types'
import Table from '@/components/Table'

interface TableHeader {
  objectKey: string,
  label: string,
  sortByName?: string,
}

export const getServerSideProps: GetServerSideProps<{addresses: Address[]}> = async (context) => {
  const res = await fetch(`https://127.0.0.1:7005/api/Address?orderBy=${context.query?.orderBy}`)
  const addresses: Address[] = await res.json()

  return {
    props: {
      addresses,
    },
  }
}

export default function Addresses({ addresses }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const tableHeaders: TableHeader[] = [
    { label: 'Street', sortByName: 'Street', objectKey: 'street' },
    { label: 'Number', sortByName: 'Number', objectKey: 'number' },
    { label: 'Zip code', sortByName: 'ZipCode', objectKey: 'zipCode' },
    { label: 'City', sortByName: 'City' , objectKey: 'city'},
    { label: '# of users', sortByName: 'CountUsers' , objectKey: 'countUsers'},
  ]

  return (
    <main className="flex items-center justify-center p-12">
      <div className="shadow-md sm:rounded-lg overflow-auto">
        <Table 
          tableHeaders={tableHeaders} 
          tableRows={{id: "addressId", data: addresses}} 
          pagePath='addresses'
          apiPath="https://127.0.0.1:7005/api/address/"
        />
      </div>
    </main>
  )
  // return (
  //   <main className="flex items-center justify-center p-12">
  //     <div className="shadow-md sm:rounded-lg overflow-auto">
  //       <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
  //           <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
  //               <tr>
  //                   <th scope="col" className="px-6 py-3">
  //                       Street
  //                   </th>
  //                   <th scope="col" className="px-6 py-3">
  //                       Number
  //                   </th>
  //                   <th scope="col" className="px-6 py-3">
  //                       Zip Code
  //                   </th>
  //                   <th scope="col" className="px-6 py-3">
  //                       City
  //                   </th>
  //                   <th scope="col" className="px-6 py-3">
  //                       # of Users
  //                   </th>
  //                   <th scope="col" className="px-6 py-3">
  //                       Actions
  //                   </th>
  //               </tr>
  //           </thead>
  //           <tbody>
  //             {addresses.map(address => 
  //                 <tr key={address.addressId} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
  //                   <td className="px-6 py-4">
  //                     {address.street}
  //                   </td>
  //                   <td className="px-6 py-4">
  //                     {address.number}
  //                   </td>
  //                   <td className="px-6 py-4">
  //                     {address.zipCode}
  //                   </td>
  //                   <td className="px-6 py-4">
  //                     {address.city}
  //                   </td>
  //                   <td className="px-6 py-4">
  //                     {address.countUsers}
  //                   </td>
  //                   <td className="px-6 py-4">
  //                       <Link href={`/addresses/${address.addressId}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
  //                         Edit
  //                       </Link>
  //                       <Link href={`/addresses/delete/${address.addressId}`} className="ml-3 font-medium text-red-600 dark:text-red-500 hover:underline">
  //                         Delete
  //                       </Link>
  //                   </td>
  //                 </tr>
  //             )}
  //           </tbody>
  //       </table>
  //     </div>
  //   </main>
  // )
}
  