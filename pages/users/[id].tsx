import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { useState } from 'react'
import { UserAddresses, User, Address, Response } from '../../ts-types/types'
import Alert from "@/components/Alert"

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

  return (
    <main className="flex items-center justify-center p-12">
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
          <input name="firstName" onChange={handleChange} value={formData.firstName} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className="mb-6">
          <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
          <input name="lastName" onChange={handleChange} value={formData.lastName} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className="mb-6">
          <label htmlFor="login" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Login</label>
          <input name="login" onChange={handleChange} value={formData.login} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>

        <div className="mb-6">
          <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New password</label>
          <input type="password" name="newPassword" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>

        <div className="mb-6">
          <label htmlFor="addressId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
          <select name="addressId" defaultValue={formData.addressId} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {!addresses.some((a: Address) => a.addressId === user.addressId) ? <option value={user.addressId}>{user.addressId}</option> : null}
            {addresses.map((address: Address) => 
              <option 
                key={address.addressId}
                value={address.addressId}
              >
                {`${address.street} ${address.number}, ${address.zipCode} ${address.city}`}
              </option>
            )}
          </select>
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
  