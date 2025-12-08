import React, { useState } from 'react'
import { Checkout } from './Checkout'
import { SuccessfullOrderToast } from './SuccessfullOrderToast'
import { Button } from './Button'

export const ShoppingCart = ({ resetShop, setOrders, toggleShoppingCart, isShoppingCartOpen, shoppingCartItems, totalPrice, discountPercentage, basePrice, removeItemFromCart }) => {
    const [showToast, setShowToast] = useState(false)

    const createOrder = (clientName) => {
        const newOrder = {
            items: shoppingCartItems,
            totalPrice,
            clientName
        }
        setOrders((prevOrders) => [...prevOrders, newOrder])
        resetShop()
        setShowToast(true)
    }

    return (
        <>
            <div className='fixed bottom-6 right-6 z-30'>
                <Button
                    onClick={() => toggleShoppingCart()}
                    variant="primary"
                    size="icon-lg"
                    className="rounded-full shadow-2xl hover:shadow-3xl relative"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="currentColor">
                        <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
                    </svg>
                    {shoppingCartItems.length > 0 && (
                        <span className='absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center'>
                            {shoppingCartItems.length}
                        </span>
                    )}
                </Button>
            </div>
            {isShoppingCartOpen && (
                <div className='fixed inset-0 z-40'>
                    <div
                        className='absolute inset-0 bg-black/50 backdrop-blur-sm'
                        onClick={() => toggleShoppingCart()}
                    />

                    <div className='absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col'>
                        <div className='bg-linear-to-r from-orange-500 to-red-500 text-white p-6 flex items-center justify-between'>
                            <h2 className='text-2xl font-bold'>Your Order</h2>
                            <Button
                                onClick={() => toggleShoppingCart()}
                                variant="icon"
                                size="icon"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                                </svg>
                            </Button>
                        </div>

                        <div className='flex-1 overflow-y-auto p-6'>
                            {!shoppingCartItems.length ? (
                                <div className='text-center py-12'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="64px" viewBox="0 -960 960 960" width="64px" fill="#d1d5db" className='mx-auto mb-4'>
                                        <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
                                    </svg>
                                    <p className='text-gray-500 text-lg'>Your cart is empty</p>
                                </div>
                            ) : (
                                <div className='space-y-4'>
                                    {shoppingCartItems.map((item, key) => (
                                        <div key={key} className='flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-orange-300 transition-colors'>
                                            <div className='flex-1'>
                                                <h3 className='font-semibold text-gray-800'>{item.name}</h3>
                                                <p className='text-sm text-gray-500 capitalize'>{item.category}</p>
                                            </div>
                                            <div className='flex items-center gap-3'>
                                                <span className='font-bold text-orange-600 text-lg'>
                                                    ${item.price.toFixed(2)}
                                                </span>
                                                <Button
                                                    onClick={() => removeItemFromCart(item.id)}
                                                    variant="delete"
                                                    size="icon"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                                                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                                                    </svg>
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {shoppingCartItems.length > 0 && (
                            <div className='border-t border-gray-200 p-6 bg-gray-50 space-y-4'>
                                {discountPercentage > 0 && (
                                    <div className='space-y-2'>
                                        <div className='flex justify-between text-sm text-gray-600'>
                                            <span>Subtotal:</span>
                                            <span>${basePrice.toFixed(2)}</span>
                                        </div>
                                        <div className='flex justify-between text-sm font-semibold text-green-600'>
                                            <span>Discount ({discountPercentage}%):</span>
                                            <span>-${(basePrice - totalPrice).toFixed(2)}</span>
                                        </div>
                                    </div>
                                )}
                                <div className='flex justify-between items-center pt-4 border-t border-gray-300'>
                                    <span className='text-xl font-bold text-gray-800'>Total:</span>
                                    <span className='text-2xl font-extrabold text-orange-600'>
                                        ${totalPrice.toFixed(2)}
                                    </span>
                                </div>
                                <Checkout createOrder={createOrder} />
                            </div>
                        )}
                    </div>
                </div>
            )}

            <SuccessfullOrderToast
                message="Order placed successfully!"
                type="success"
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />
        </>
    )
}
