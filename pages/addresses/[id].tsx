import Alert from "@/components/Alert"
import { Address, Response } from "@/ts-types/types"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { useState } from "react"

export const getServerSideProps: GetServerSideProps<{data: Address}> = async (context) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH_ADDRESS}/${context.params?.id}`)
  const data: Address = await res.json()

  return {
    props: {
      data
    }
  }
}

export default function Address({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [formData, setFormData] = useState<Address>(data)
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

    fetch(`${process.env.NEXT_PUBLIC_API_PATH_ADDRESS}/${data.addressId}`,{
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.ok) {
        setResponse({
          type: "success",
          message: "Success! Address updated"
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
          <label htmlFor="street" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Street</label>
          <input name="street" onChange={handleChange} value={formData.street} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className="mb-6">
          <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number</label>
          <input type="number" name="number" onChange={handleChange} value={formData.number} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className="mb-6">
          <label htmlFor="zipCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Login</label>
          <input name="zipCode" onChange={handleChange} value={formData.zipCode} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>

        <div className="mb-6">
          <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
          <input name="city" onChange={handleChange} value={formData.city} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
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
  