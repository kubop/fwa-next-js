import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { User } from '../../ts-types/types'
import Table, { TableHeader } from '@/components/Table'


export const getServerSideProps: GetServerSideProps<{users: User[]}> = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_PATH_USER)
  const users: User[] = await res.json()

  return {
    props: {
      users,
    },
  }
}

export default function Users({ users }: InferGetServerSidePropsType<typeof getServerSideProps>) { 
  const tableHeaders: TableHeader<User>[] = [
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
          apiPath={process.env.NEXT_PUBLIC_API_PATH_USER}
        />
      </div>
    </main>
  )
}
