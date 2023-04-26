import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { useState } from 'react'
import { UserAddresses, User, Address, Response } from '../../ts-types/types'
import Alert from "@/components/Alert"
import Input from "@/components/Input"
import Select, { SelectValue } from "@/components/Select"

export const getServerSideProps: GetServerSideProps<{data: UserAddresses}> = async (context) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH_USER}/${context.params?.id}`)
  const data: UserAddresses = await res.json()

  return {
    props: {
      data
    }
  }
}

export default function User({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { user, addresses } = data
  
  const [formData, setFormData] = useState<User>(user)
  const [response, setResponse] = useState<Response | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    fetch(`${process.env.NEXT_PUBLIC_API_PATH_USER}/${user.userId}`,{
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      console.log(res)
      if (res.ok) {
        setResponse({
          type: "success",
          message: "Success! User updated"
        })
      } else {
        res.text().then(text =>
          setResponse({
            type: "error",
            message: text
          })
        )
      }
    })
  }

  function getAddressValues(): SelectValue[] {
    const options: SelectValue[] = []

    // Display Id in Select if Address with set Id doesn't exist
    !addresses.some((a: Address) => a.addressId === user.addressId) && options.push({
      id: user.addressId,
      value: user.addressId?.toString()
    })

    addresses.map((address: Address) => {
      options.push({
        id: address.addressId,
        value: `${address.street} ${address.number}, ${address.zipCode} ${address.city}`
      })
    })

    return options
  }

  return (
    <main className="flex items-center justify-center p-12">
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <Input 
            name="firstName"
            label="First name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <Input 
            name="lastName"
            label="Last name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <Input 
            name="login"
            label="Login"
            value={formData.login}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <Input 
            type="password"
            name="newPassword"
            label="New password"
            value={formData.newPassword ?? ""}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <Select 
            label="Address"
            name="addressId"
            values={getAddressValues()}
            defaultValue={formData.addressId?.toString()}
            onChange={handleChange}
          />
        </div>

        {response && 
          <Alert type={response.type} text={response.message} onClose={() => setResponse(null)} />
        }

        <div className="flex justify-center">
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </div>
      </form>

    </main>
  )
}
  