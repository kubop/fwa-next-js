import Link from 'next/link'
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { User } from '../../ts-types/types'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Table, { TableHeader } from '@/components/Table'


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
  const tableHeaders: TableHeader[] = [
    { label: 'First name', sortByName: 'FirstName', objectKey: 'firstName' },
    { label: 'Last name', sortByName: 'LastName', objectKey: 'lastName' },
    { label: 'Login', sortByName: 'Login', objectKey: 'login' },
    { label: 'Address', sortByName: 'Address' , objectKey: 'address'}
  ]

  return (
    <main className="flex items-center justify-center p-12">
      <div className="shadow-md sm:rounded-lg overflow-auto">
        <Table 
          tableHeaders={tableHeaders} 
          tableRows={{id: "userId", data: users}} 
          pagePath='users'
          apiPath="https://127.0.0.1:7005/api/user/"
        />
      </div>
    </main>
  )
}
