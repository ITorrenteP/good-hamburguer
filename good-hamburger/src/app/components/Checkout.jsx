import React, { useState } from 'react'
import { Button } from './Button'

export const Checkout = ({ createOrder }) => {
    const [clientName, setClientName] = useState('')

    const handleSubmit = () => {
        if (clientName.trim()) {
            createOrder(clientName);
            setClientName('');
        }
    }

    return (
        <div className='space-y-4'>
            <div className='relative'>
                <input 
                    type="text" 
                    value={clientName} 
                    name='clientName' 
                    placeholder='Enter your name'
                    className='w-full outline-none rounded-xl border-2 border-gray-300 focus:border-orange-500 px-4 py-3 text-gray-800 transition-colors'
                    onChange={(e) => setClientName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                />
            </div>
            <Button 
                disabled={!clientName.trim().length} 
                variant="primary"
                size="lg"
                className="w-full rounded-xl disabled:from-gray-400 disabled:to-gray-500"
                onClick={handleSubmit}
            >
                Place Order
            </Button>
        </div>
    )
}
