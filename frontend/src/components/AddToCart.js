import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const addToCart = async (clothingId, userID, color, size) => {

  const cartData = {
    userId: parseInt(userID),
    clothingId: parseInt(clothingId),
    quantity: 1,
    color: color,
    size: size,
  };
  console.log(cartData);
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/carts/add-to-cart",
      cartData
    );
    console.log("Cart data added:", cartData);
    // Handle successful response as needed
    console.log(response.data);

    toast.success("clothing has been added to the Cart", {
      position: "top-right",
      style: {
        height: "25px", // Adjust this value to your desired height
        fontSize: "13px",
        margin: 0,
      },
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    toast.warning("You must login to add clothes to cart.", {
      position: "top-right",
      style: {
        height: "25px", // Adjust this value to your desired height
        fontSize: "13px",
        margin: 0,
      },
    });
    // Handle errors
  }
};
