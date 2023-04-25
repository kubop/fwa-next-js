import Link from 'next/link'
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { Address } from '../../ts-types/types'
import Table, { TableHeader } from '@/components/Table'

export const getServerSideProps: GetServerSideProps<{addresses: Address[]}> = async () => {
  const res = await fetch(`https://127.0.0.1:7005/api/Address`)
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
}
  