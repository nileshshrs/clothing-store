import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { createContext, useContext, useState } from "react"

const ClothesContext = createContext()

export const ClothesProvider = ({ children }) => {



    const create = useMutation({
        mutationFn: async (data) => {
            const response = await axios.post("http://localhost:8080/api/v1/clothing/create", data)

            return response;
        }
    })

    const clothesQuery = useQuery({
        queryKey: ["clothes"],
        queryFn: async () => {
            const response = await axios.get("http://localhost:8080/api/v1/clothing")


            return response.data.clothing
        },
        refetchOnWindowFocus: false,  // Don't automatically refetch on window focus
        // staleTime: Infinity,  // Data is never considered stale
    })


    return <ClothesContext.Provider value={{ create, clothesQuery }}>{clothesQuery.isSuccess && children}</ClothesContext.Provider>
}
export const useClothesContext = () => {
    return useContext(ClothesContext);
};