import { fetcherCreator, useFetch } from "./useFetch"
import { m2mUsers } from "../endpoints/m2m-users"

export type ScopeResource =
    | "listings"
    | "messages"
    | "cleanings"
    | "reservations"
    | "payments"
    | "monthly"

export const availableScopeResources: ScopeResource[] = [
    "listings",
    "messages",
    "cleanings",
    "reservations",
    "payments",
    "monthly",
]

export const castToScopeResources = (str: string): ScopeResource | undefined =>
    (availableScopeResources as string[]).includes(str)
        ? (str as ScopeResource)
        : undefined

export type ScopeAction = "none" | "read" | "write" | "admin"

export const availableScopeActions: ScopeAction[] = [
    "none",
    "read",
    "write",
    "admin",
]

export const castToScopeActions = (str: string): ScopeAction | undefined =>
    (availableScopeActions as string[]).includes(str)
        ? (str as ScopeAction)
        : undefined

export type UserScope = { [resource: string]: ScopeAction }

export interface User {
    id: string
    companyId: string
    email: string
    scope: UserScope
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

export const requestSetScope = (
    token: string,
    input: { userId: string; scope: UserScope }
) => {
    return fetcherCreator<void>(m2mUsers.v1.setAuthorityScope, {
        method: "PUT",
        authToken: token,
    })({
        body: JSON.stringify(input),
    })
}
