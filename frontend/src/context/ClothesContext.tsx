import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const ClothesContext = createContext();

export const ClothesProvider = ({ children }) => {
    const [singleClothes, setSingleClothes] = useState(null);
    const [clothesData, setClothesData] = useState([]);
    const [loading, setLoading] = useState(true);


    const [editSlide, setEditSlide] = useState(false);
    const handleEditSlide = () => {
        setEditSlide(!editSlide);
    };

    const create = async (data) => {
        try {
            await axios.post("http://localhost:8080/api/v1/clothing/create", data);
            getClothes()
        } catch (err) {
            console.log(err);
        }
    };

    const getClothes = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/v1/clothing");
            const newClothes = res.data.clothing;
            setClothesData(newClothes);
            setLoading(false); // Set loading to false when data is fetched
        } catch (err) {
            setLoading(false); // Set loading to false in case of an error
        }
    };

    const getSingleClothes = async (clothesId) => {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/clothing/get-by-id/${clothesId}`);

            setSingleClothes(res.data.clothing)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setLoading(false);
        }
    }
    const updateClothes = async (clothesId, clothesData) => {

        try {
            const response = await axios.patch(
                `http://localhost:8080/api/v1/clothing/update/${clothesId}`,
                clothesData
            );
            const updatedClothes = response.data;
            console.log(updatedClothes)
        
            getClothes()

        } catch (error) {
            console.error("Error updating clothes:", error);

        }
    };

    const deleteClothes = async (clothesId) => {
        try {
          await axios.delete(`http://localhost:8080/api/v1/clothing/${clothesId}`);
        } catch (error) {
          console.error("Error deleting clothes:", error);
        }
      };


    useEffect(() => {
        getClothes();
    }, []);

    return (
        <ClothesContext.Provider value={{
            create,
            clothesData,
            editSlide,
            loading,
            handleEditSlide,
            getClothes,
            singleClothes,
            getSingleClothes,
            updateClothes,
            deleteClothes
        }}>
            {children}
        </ClothesContext.Provider>
    );
};

export const useClothesContext = () => {
    return useContext(ClothesContext);
};




// useMutation({
//     mutationFn: async (data) => {
//         const response = await axios.post("http://localhost:8080/api/v1/clothing/create", data)

//         return response;
//     }
// })

// const clothesQuery = useQuery({
//     queryKey: ["clothes"],
//     queryFn: async () => {
//         const response = await axios.get("http://localhost:8080/api/v1/clothing")


//         return response.data.clothing
//     },
//     refetchOnWindowFocus: false,  // Don't automatically refetch on window focus
//     // staleTime: Infinity,  // Data is never considered stale
// })

// const getSingleClothes = (id) => {
//     return useQuery({
//         queryKey: ["singleclothes", id],
//         queryFn: async () => {
//             const res = await axios.get(`http://localhost:8080/api/v1/clothing/get-by-id/${id}`)
//             return res.data.clothing
//         }
//     })
// }
