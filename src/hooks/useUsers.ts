import { m2mUsers } from "../endpoints/m2m-users"
import { useFetch } from "./useFetch"

export interface User {
    id: string
    companyId: string
    email: string
    scope: { [resource: string]: string }
    createdAt: string
    updatedAt: string
    authority: number
    name: string
}

export const displayAuthority = (authority: number) => {
    switch (authority) {
        case 0:
            return "Unauthorized"
        case 1:
            return "Admin"
        case 2:
            return "Manager"
        case 5:
            return "System"
        case 6:
            return "DevAdmin"
        case 7:
            return "GeneralUser"
        default:
            return `Other (${authority})`
    }
}

export const useUsers = (token: string) => {
    return useFetch<User[]>(m2mUsers.v1.findUsersByCompanyId, {
        authToken: token,
    })
}
