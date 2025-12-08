
import React, { useState } from 'react'
import { Button } from './Button'

export const Checkout = ({ createOrder, items }) => {

    const [clientName, setClientName] = useState('')


    return (
        <div className='flex flex-col w-full h-fit gap-4 pt-4'>
            <div className='flex flex-col relative'>
                <label className='absolute left-2 -top-2 bg-white px-2 text-sm text-primary-600 pointer-events-none'>Client name</label>
                <input type="text" value={clientName} name='clientName' className='outline-0 rounded-lg border border-primary-600 px-4 py-2' onChange={(e) => setClientName(e.target.value)} />
            </div>
            <Button disabled={!clientName.length || !items.length} onClick={() => createOrder(clientName) && setClientName('')}>Order</Button>
        </div>
    )
}
