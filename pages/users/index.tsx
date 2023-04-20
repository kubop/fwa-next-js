import { InferGetServerSidePropsType } from "next"

type Users = User[]

type User = {
  Id: number,
  FirstName: string,
  LastName: string,
  Login: string,
}

export const getServerSideProps = async () => {
  //const res = await fetch('https://www.bitstamp.net/api/v2/ticker/btcusd/') // TODO: Fetch users from backend
  const users: Users = [
    {
      Id: 1,
      FirstName: 'Jakub',
      LastName: 'Pernica',
      Login: 'kubop',
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
    <main className="flex flex-col items-center justify-between p-24">
      {JSON.stringify(users)}
    </main>
  )
}
