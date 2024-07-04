import { useQuery } from "@tanstack/react-query"
import { AUTH_QUERIES_KEYS } from "./authQueriesKeys"
import { fetchLogin, fetchRegister } from "../../services/AuthService"

export const useRegisterQuery = (formData: FormData) => {
    const {isLoading, data, error} = useQuery({
        queryKey: [AUTH_QUERIES_KEYS.REGISTER_USER],
        queryFn: () => fetchRegister(formData),
    })

    return {isLoading, responce: data, error}
}

export const useLoginQuery = (userData: {email: string, username: string, password: string}) => {
    const {isLoading, data, error} = useQuery({
        queryKey: [AUTH_QUERIES_KEYS.LOGIN_USER],
        queryFn: () => fetchLogin(userData),
    })

    return {isLoading, responce: data, error}
}
