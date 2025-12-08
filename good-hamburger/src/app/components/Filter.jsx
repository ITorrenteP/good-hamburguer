import React from 'react'
import { Button } from './Button';

export const Filter = ({ onFilterChange, selectedCategory }) => {

    const filters = [
        {
            type: 'all',
            name: 'All'
        },
        {
            type: 'sandwich',
            name: 'Sandwich'
        },
        {
            type: 'extra',
            name: 'Extra'
        }
    ]

    const getStyle = (category) => {
        console.log(category, selectedCategory);
        return selectedCategory === category ? 'filter-active' : 'filter-inactive'
    }

    return (
        <div className="flex flex-col gap-4 text-black">
            <span className='text-xl font-bold'>Categories</span>
            <div className='flex gap-2'>
                {filters.map((filter) => <Button
                    onClick={() => onFilterChange(filter.type)}
                    variant={getStyle(filter.type)}

                >
                    {filter.name}
                </Button>)}
            </div>
        </div>
    )
}
