import React, { useEffect, useState } from 'react'
import { useCartContext } from '../context/CartContext'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import "../global css/checkout.scss"
import { FaLocationDot } from "react-icons/fa6";
import { IoBagOutline } from "react-icons/io5";
import Khalti from "../assets/khalti.png"
import Payment from "../components/Payment"
import { LuCreditCard } from "react-icons/lu";
import { useAuthContext } from '../context/useAuthContext'
import { useLogout } from '../context/useLogout'


const Cart = () => {
    const { user } = useAuthContext()
    const { cartItems, fetchCartData } = useCartContext()
    const [paymentMethod, setPaymentMethod] = useState("cash on delivery");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [error, setError] = useState("");
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const accesstoken = user ? user.token : null
    const userId = user ? user?.user?.id : null
    const navigate = useNavigate()


    const { logout } = useLogout()

    useEffect(() => {
        fetchCartData()
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "paymentMethod") {
            setPaymentMethod(value);
        }
    };

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    // Shipping cost
    const shippingCost = 20;
    const total = subtotal + shippingCost;

    const saveShippingInfo = async () => {
        if (contact === "" || address == "") {
            setError("shipping info cannot be empty");
        } else {
            const data = {
                cartItems: cartItems,
                orderDate: Date.now(),
                shippingAddress: address,
                contact: contact,
                paymentMethod: paymentMethod,
            };

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
                    // console.log("Shipping info saved successfully!");
                    try {
                        const url = `http://localhost:8080/api/v1/carts/deleteByUserId/${userId}`;
                        const res = await axios.delete(url, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${accesstoken}`
                            }
                        });
                        // console.log(res.data);
                        fetchCartData();
                        setPaymentSuccess(true); // Set payment success state to true
                        navigate("/success")
                    } catch (error) {
                        // console.log(error);
                    }
                } else {
                    // console.error("Unexpected status code:", response.status);
                }
            } catch (error) {
                // console.error("Error saving shipping info:", error.message);
            }
        }
    }

    const handleIncreaseQuantity = async (cartId, quantity) => {
        try {
            await axios.patch(
                `http://localhost:8080/api/v1/carts/update/${cartId}`,
                { newQuantity: quantity + 1 },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accesstoken}`
                    }
                }
            );

            fetchCartData();

        } catch (error) {
            // console.error("Error updating cart:", error);
            logout()
        }
    };


    const handleDecreaseQuantity = async (cartId, quantity) => {
        if (quantity > 1) {
            try {
                await axios.patch(
                    `http://localhost:8080/api/v1/carts/update/${cartId}`,
                    { newQuantity: quantity - 1 }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accesstoken}`
                    }
                }
                );
                fetchCartData();

            } catch (error) {
                // console.error("Error updating cart:", error);
                logout()
            }
        }
        if (quantity <= 1) {
            handleRemoveCartItem(cartId)
        }

    };

    const handleRemoveCartItem = async (cartId) => {
        try {
            await axios.delete(
                `http://localhost:8080/api/v1/carts/delete/${cartId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accesstoken}`
                }
            }
            );

            fetchCartData();

        } catch (error) {
            // console.error("Error deleting cart:", error);
            logout()
        }
    };

    //NOTE: remove the max width 900 and min height 500px
    return (
        <section className='py-5 checkout-section px-4'>
            <div className='mx-auto w-[60%]'>
                <h2 className='w-full py-5 px-2 font-bold text-lg text-center'>
                    Checkout
                </h2>
            </div>
            <div className='max-w-[900px] mx-auto flex gap-1 shadow-slate-400 shadow checkout-wrapper items-start justify-center'>
                <div className='w-full pb-12 pt-3 px-1'>
                    <div className='w-full'>
                        <h2 className='w-full px-2 font-bold text-lg flex justify-between items-center py-3'>
                            <span>Shopping Bag</span>
                            <span>[{cartItems.length}]</span></h2>
                    </div>
                    <div className='max-h-[450px]  w-full py-3 overflow-y-auto cart-wrapper'>
                        {cartItems.length != 0 ?
                            cartItems.map(items => {
                                return (
                                    <div className='cart' key={items.cartId}>
                                        <div className='wrapper flex flex-row font-bold gap-3 py-1 px-2 border-b border-slate-200'>
                                            <div className='py-2 cart-img'>
                                                <img src={items.imagePath} alt="" className='max-h-[130px]' />
                                            </div>
                                            <div className='cart-details py-2 w-full flex flex-col gap-3 items-start justify-center'>
                                                <div className='flex gap-2 justify-between w-full'>
                                                    <div className='flex flex-col gap-2'>
                                                        <h3 className='font-sans text-sm font-bold capitalize'>
                                                            {items.name}
                                                        </h3>
                                                        <div className='flex gap-2 cart-description'>
                                                            <p className='font-bold font-sans text-xs text-slate-500'>Color: {items.color},</p>
                                                            <p className='font-bold font-sans text-xs text-slate-500'>SIZE: {items.size}</p>
                                                        </div>
                                                    </div>
                                                    <div className='font-sans price-wrapper'>
                                                        ${items.price}
                                                    </div>
                                                </div>
                                                <div className='flex justify-between w-full items-center'>
                                                    <div className='flex items-center justify-center gap-3'>
                                                        <button onClick={() => handleDecreaseQuantity(items.cartId, items.quantity)}>&#8722;</button>
                                                        <p>{items.quantity}</p>
                                                        <button onClick={() => handleIncreaseQuantity(items.cartId, items.quantity)}>&#43;</button>
                                                    </div>
                                                    <div>
                                                        <button onClick={() => handleRemoveCartItem(items.cartId)} className='text-md hover:text-gray-600 transition ease-linear'>remove</button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                )
                            }) : (
                                <div className='max-h-[450px] h[-450px] w-full py-3 overflow-y-auto cart-wrapper flex justify-center items-center'>
                                    <p className='font-sans font-bold text-xl'>
                                        No items in your shopping bag
                                    </p>
                                </div>
                            )

                        }
                    </div>
                </div>
                <div className='w-full pt-3 pb-12 px-4checkout-wrapper'>


                    <div className='h-full  order-details flex flex-col gap-3'>
                        <div className="text-[firebrick] bg-[pink] text-center font-semibold mb-2 w-[90%] mx-auto">
                            {error}
                        </div>
                        <div className='shipping-info flex flex-col'>
                            <h3 className='w-full flex items-center gap-2 justify-start text-md px-3 py-1 font-bold'><FaLocationDot className="text-sm" /><span className='py-1 mb-[.1rem]'>Shipping Information</span></h3>
                            <div className='w-[80%] mx-auto flex flex-col gap-1 address-wrapper'>
                                <div className='address-form'>
                                    <label htmlFor="address-input" className=''>Address*</label>
                                    <input
                                        type="text"
                                        placeholder="address"
                                        className="text-sm w-full h-[25px] px-2 font-semibold outline-0 border border-black rounded-[2px]"
                                        id='address-input'
                                        onChange={(e) => {
                                            setAddress(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className='address-form'>
                                    <label htmlFor="contact-input" className=''>Contact*</label>
                                    <input
                                        type="number"
                                        id='contact-input'
                                        placeholder="contact"
                                        className="text-sm w-full h-[25px] px-2 font-semibold outline-0 border border-black rounded-[2px]"
                                        onChange={(e) => {
                                            setContact(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-1 summary-wrapper'>
                            <h3 className='w-full flex items-center gap-2 justify-start text-md px-3 py-1 font-bold'><IoBagOutline className="text-sm font-bold mb-[.1rem]" /><span className='py-1'>Order Summary</span></h3>
                            <div className="order-summary w-[80%] mx-auto flex flex-col gap-1">
                                <div className="summary flex flex-row justify-between items-center font-bold text-sm">
                                    <p>Subtotal</p>
                                    <span>${subtotal}</span>
                                </div>
                                <div className="summary flex flex-row justify-between items-center font-bold text-sm">
                                    <p>Shipping Fee</p>
                                    <span>${shippingCost}</span>
                                </div>
                                <div className="summary flex flex-row justify-between items-center font-bold text-md py-2">
                                    <p>Total</p>
                                    <span>${total}</span>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-1 '>
                            <h3 className="w-full flex items-center gap-2 justify-start text-md px-3 py-1 font-bold"><LuCreditCard />Payment Method</h3>
                            <div className="payment-method flex flex-col gap-2 w-[80%] mx-auto">
                                <div className="flex py-2 justify-between items-center">
                                    <div className="flex items-center justify-center">
                                        <input
                                            type="radio"
                                            className="form-radio h-3 mr-2"
                                            name="paymentMethod"
                                            value="cashOnDelivery"  // Corrected value
                                            checked={paymentMethod === "cash on delivery"}
                                            onChange={handleInputChange}
                                        />
                                        <label
                                            htmlFor="cashOnDelivery"
                                            className="flex items-center cursor-pointer text-sm font-bold"
                                        >
                                            Cash on Delivery
                                        </label>
                                    </div>
                                    <div className="px-2 flex items-center justify-center">
                                        <input
                                            type="radio"
                                            className="form-radio h-3"
                                            name="paymentMethod"
                                            value="khalti"
                                            checked={paymentMethod === "khalti"}
                                            onChange={handleInputChange}
                                        />
                                        <label
                                            htmlFor="khalti"
                                            className="flex items-center cursor-pointer"
                                        >
                                            <img src={Khalti} className="h-8 ml-3" alt="Khalti" />
                                        </label>
                                    </div>
                                </div>
                                <p className='text-xs text-gray-400 font-medium'>
                                    Thank you for shopping with us..!
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-[80%] mx-auto items-center justify-center py-3">
                            {paymentMethod === "khalti" ? (
                                <Payment
                                    cart={cartItems}
                                    address={address}
                                    contact={contact}
                                    paymentMethod={paymentMethod}
                                    total={total}
                                    setError={setError}
                                />
                            ) : (
                                <button
                                    className="text-xs bg-black w-full border border-black text-white py-2 px-3 rounded-[2px] font-semibold hover:text-black hover:bg-white transition ease-linear"
                                    onClick={saveShippingInfo}
                                >
                                    Complete Payment
                                </button>
                            )}
                            <Link to="/clothes" className='font-sans font-bold font-xs py-2 flex items-center'>
                                continue shopping
                            </Link>
                        </div>

                    </div>

                </div>

            </div>

        </section >
    )
}

export default Cart