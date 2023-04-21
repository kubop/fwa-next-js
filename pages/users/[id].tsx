import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { useState } from 'react'

type UserAddresses = {
  user: User,
  addresses: Address[]
}

type User = {
  "userId": number,
  "firstName": string,
  "lastName": string,
  "login": string,
  "password": string,
  "newPassword": string,
  "addressId": number,
  "address": string
}

type Address = {
  "addressId": number,
  "street": string,
  "number": number,
  "city": string,
  "zipCode": string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`https://127.0.0.1:7005/api/User/${context.params?.id}`)
  const data: UserAddresses = await res.json()

  return {
    props: {
      data
    }
  }
}

export default function User({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { user, addresses } = data
  
  const [formData, setFormData] = useState(user)
  const [alert, setAlert] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    fetch(`https://127.0.0.1:7005/api/user/${user.userId}`,{
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.ok) {
        console.log('form data sent successfully')
        setAlert('success')
      } else {
        console.log('error sending form data')
        setAlert('error')
      }
    })
  }

  function handleCloseAlert(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setAlert('')
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

        {alert === 'success' ? 
            <div id="alert-1" className="flex p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-200 dark:bg-gray-800 dark:text-green-400" role="alert">
            <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Success!</span> User updated.
            </div>
            <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-green-100 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700" aria-label="Close" onClick={handleCloseAlert}>
              <span className="sr-only">Close</span>
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
          </div>  
          :
          null
        }

        <div className="flex justify-center">
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </div>
      </form>

    </main>
  )
}
  