import { useEffect, useState } from "react";
import KhaltiCheckout from "khalti-checkout-web";
import axios from "axios";
import { useAuthContext } from "../context/useAuthContext";
import {useCartContext} from "../context/CartContext"
import { useNavigate } from "react-router-dom";

const publicTestKey = "test_public_key_402c2b0e98364222bb1c1ab02369cefd";

const Payment = ({
  cart,
  address,
  contact,
  paymentMethod,
  total,
  setError,
}) => {
  const { user } = useAuthContext();
  const {fetchCartData} = useCartContext()
  const userId = user ? user.user.id : null;
  const accesstoken = user ? user.token : null
  const [checkout, setCheckout] = useState(null);
  const navigate= useNavigate()
  // console.log(userId)
  // console.log(accesstoken)

  const config = {
    publicKey: publicTestKey,
    productIdentity: "123766",
    productName: "cuts clothing",
    productUrl: "http://localhost:3000",
    eventHandler: {
      onSuccess(payload) {
        console.log(payload);
        const data = {
          cartItems: cart,
          orderDate: Date.now(),
          shippingAddress: address,
          contact: contact,
          paymentMethod: paymentMethod,
        };
        const saveShippingInfo = async (data) => {
          try {
            const response = await axios.post(
              `http://localhost:8080/api/v1/orders/create`,
              data, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accesstoken}`
              }
            }
            );

            if (response.status >= 200 && response.status < 300) {
              console.log("Shipping info saved successfully!");
              try {
                const url = `http://localhost:8080/api/v1/carts/deleteByUserId/${userId}`;
                const res = await axios.delete(url, {
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accesstoken}`
                  }
                });
                console.log(res.data);
                fetchCartData();
              } catch (error) {
                console.log(error);
              }
            } else {
              console.error("Unexpected status code:", response.status);
            }
          } catch (error) {
            console.error("Error saving shipping info:", error.message);
          }
        };
        saveShippingInfo(data);
        navigate("/success")
      },
      onError(error) {
        console.log(error);
        // Handle the error callback here
      },
      onClose() {
        console.log("widget is closing");
        // Handle the widget close event here
      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };

  useEffect(() => {
    // Initialize KhaltiCheckout instance
    const khaltiCheckout = new KhaltiCheckout(config);
    setCheckout(khaltiCheckout);

    // Cleanup the KhaltiCheckout instance on component unmount
    return () => {
      // khaltiCheckout.destroy(); // Use this if KhaltiCheckout has a destroy method
    };
  }, []); // Run useEffect only once during component mount

  const handleConfirmOrder = async () => {
    if (contact !== "" || address !== "") {
      if (checkout) {
        // Check if checkout instance is available
        console.log(cart, address, contact, paymentMethod, total);
        checkout.show({ amount: total * 100 });
      } else {
        console.error("KhaltiCheckout is not initialized");
      }
    } else {
      setError("shipping info cannot be empty");
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleConfirmOrder}
        className="text-xs bg-black text-white py-2 px-3 border border-black rounded-[2px] font-semibold w-full  hover:text-black hover:bg-white transition ease-linear"
      >
        Pay with Khalti
      </button>
    </div>
  );
};

export default Payment;
