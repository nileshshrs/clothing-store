import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuthContext()
    const id = user?.user?.id

    const fetchCartData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/carts/get-by-user/${id}`);
            setCartItems(response.data);
        } catch (error) {
            console.error("Error fetching cart data:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        // Fetch cart data from the server
        fetchCartData();
    }, []);

    return (
        (!loading && <CartContext.Provider value={{ cartItems, fetchCartData }}>
            {children}
        </CartContext.Provider>)
    );
};

export const useCartContext = () => {
    return useContext(CartContext);
};
