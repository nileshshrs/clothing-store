import React, { useEffect } from 'react'
import { useCartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Cart = () => {
    const { cartItems, fetchCartData } = useCartContext()

    useEffect(() => {
        fetchCartData()
    }, [])

    const handleIncreaseQuantity = async (cartId, quantity) => {
        try {
            await axios.patch(
                `http://localhost:8080/api/v1/carts/update/${cartId}`,
                { newQuantity: quantity + 1 }
            );
            fetchCartData()
        } catch (error) {
            console.error("Error updating cart:", error);
        }
    };


    const handleDecreaseQuantity = async (cartId, quantity) => {
        if (quantity > 1) {
            try {
                await axios.patch(
                    `http://localhost:8080/api/v1/carts/update/${cartId}`,
                    { newQuantity: quantity - 1 }
                );
                fetchCartData()

            } catch (error) {
                console.error("Error updating cart:", error);
            }
        }
    };

    const handleRemoveCartItem = async (cartId) => {
        try {
            await axios.delete(
                `http://localhost:8080/api/v1/carts/delete/${cartId}`
            );
            fetchCartData()

        } catch (error) {
            console.error("Error deleting cart:", error);
        }
    };

    return (
        <div className="my-5 px-[30px] py-[5rem] flex items-center justify-center" style={{ maxWidth: "100%" }}>
            <div className="py-7 mx-auto rounded-sm overflow-hidden shadow shadow-slate-300 w-full" style={{ maxWidth: "800px", }}>
                <h2 className="text-lg font-bold text-gray-900 p-4 w-full flex justify-between items-center font-sans">
                    <span>Your Shopping Bag.</span> <span>({cartItems.length})</span>
                </h2>

                <div className="lg:px-0 max-h-[300px] overflow-y-auto py-4 sm:px-3 ">
                    {cartItems && cartItems.length != 0 ? cartItems.map((product) => (
                        <div key={product.id} className="flex mb-3 border-b border-gray-200 py-3">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                                <img
                                    src={product.imagePath} // yo change garnu xa
                                    alt={product.title}
                                    className="h-full w-full object-contain"
                                />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                    <div className="flex justify-between items-start text-base font-medium text-gray-900">
                                        <div className='flex flex-col gap-5'>
                                            <h3 className='font-sans capitalize font-bold text-sm'>
                                                <a href="#">{product.name}</a>
                                            </h3>
                                            <div className='flex gap-5'>
                                                <p className='font-sans text-xs text-slate-400'>Color: {product.color},</p>
                                                <p className='font-sans text-xs text-slate-400'>Size: {product.size}</p>
                                            </div>
                                        </div>
                                        <p className="font-sans text-md font-bold">$ {product.price}</p>
                                    </div>
                                </div>
                                <div className="flex flex-1 items-center justify-between text-sm">
                                    <div className="flex items-center justify-between gap-3">
                                        <button
                                            type="button"
                                            className="text-indigo-600 hover:text-indigo-500"
                                            onClick={() => handleDecreaseQuantity(product.cartId, product.quantity)}
                                        >
                                            -
                                        </button>
                                        <span className="">{product.quantity}</span>
                                        <button
                                            type="button"
                                            className="text-indigo-600 hover:text-indigo-500"
                                            onClick={() => handleIncreaseQuantity(product.cartId, product.quantity)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="flex">
                                        <button
                                            type="button"
                                            className="font-bold text-sm  hover:text-indigo-500"
                                            style={{ color: "black" }}
                                            onClick={() => handleRemoveCartItem(product.cartId)}
                                        >
                                            remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) :
                        <div className="flex mb-3 items-center justify-center py-3">
                            <h3 className='font-sans font-bold text-sm'>
                                Your Shopping Bag is Empty...!
                            </h3>
                        </div>
                    }

                </div>
                <div className="border-t border-gray-200 px-4 py-2 flex flex-col sm:px-6 gap-5">
                    <div className="flex justify-between text-sm font-bold text-gray-900">
                        <p>Total</p>
                        <p>${cartItems.reduce((total, product) => total + product.total, 0).toFixed(2)}</p>
                    </div>
                    <p className="text-xs text-gray-500 font-semibold font-sans">
                        Thank you for shopping with us!
                    </p>
                    <div className="">
                        <Link
                            to="/order"
                            className="items-center justify-center rounded-sm border border-transparent px-3 py-1 text-base font-medium text-white"
                            style={{ backgroundColor: "black" }}
                        >
                            Checkout
                        </Link>
                    </div>
                    <div className="py-3 flex justify-center text-center text-sm text-gray-500">
                        <p>
                            <button
                                type="button"
                                className="font-bold text-xs text-black"
                            >
                                Continue Shopping
                                <span aria-hidden="true" className='font-bold text-md'> &rarr;</span>
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart