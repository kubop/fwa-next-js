import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { useCallback, useMemo, useState } from 'react'
import { UserAddresses, User, Address } from '../../ts-types/types'
import Input from "@/components/Input"
import Select, { SelectValue } from "@/components/Select"
import EditForm from "@/components/EditForm"

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

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(old => ({
      ...old,
      [name]: value
    }))
  }, [])

  const addressValues = useMemo((): SelectValue[] => {
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
  }, [addresses, user.addressId])

  return (
    <main className="flex items-center justify-center p-12">
      <EditForm
        apiPath={`${process.env.NEXT_PUBLIC_API_PATH_USER}/${user.userId}`}
        method='PUT'
        formData={formData}
      >
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
            values={addressValues}
            defaultValue={formData.addressId?.toString()}
            onChange={handleChange}
          />
        </div>
      </EditForm>
    </main>
  )
}
  