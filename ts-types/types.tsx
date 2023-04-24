export interface Address {
    addressId: number,
    street: string,
    number: number,
    city: string,
    zipCode: string,
    countUsers: number
}

export interface User {
    userId: number,
    firstName: string,
    lastName: string,
    login: string,
    password: string,
    newPassword: string,
    addressId: number,
    address: string
  }

export interface UserAddresses {
    user: User,
    addresses: Address[]
}