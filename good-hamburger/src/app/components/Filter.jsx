import React from 'react'
import { Button } from './Button'

export const Filter = ({ onFilterChange, selectedCategory }) => {
    const filters = [
        { id: 'all', label: 'All Items' },
        { id: 'sandwich', label: 'Sandwiches' },
        { id: 'extra', label: 'Extras' }
    ];

    return (
        <div className="flex gap-3 flex-wrap">
            {filters.map((filter) => (
                <Button
                    key={filter.id}
                    onClick={() => onFilterChange(filter.id)}
                    variant={selectedCategory === filter.id ? 'filter-active' : 'filter-inactive'}
                    size="md"
                    className="rounded-full"
                >
                    {filter.label}
                </Button>
            ))}
        </div>
    )
}
