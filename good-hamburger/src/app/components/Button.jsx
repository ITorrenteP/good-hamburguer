import React from 'react'

export const Button = ({ 
  children, 
  onClick, 
  disabled = false, 
  variant = 'primary', 
  size = 'medium',
  className = '',
  type = 'button',
  ...props 
}) => {
  const baseStyles = 'font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50';
  
  const variants = {
    primary: 'bg-green-600 text-white shadow-lg hover:shadow-xl hover:bg-green-700 active:scale-95',
    secondary: 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm border border-gray-200',
    icon: 'text-white hover:bg-white/20 rounded-full transition-colors',
    filter: 'font-bold text-black bg-white rounded-lg transition-all cursor-pointer',
    'filter-active': 'font-bold rounded-lg w-40 text-primary-600 bg-primary-200 border-primary-600 border',
    'filter-inactive': 'font-bold rounded-lg text-black w-40 bg-white',
  };
  
  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
    icon: 'p-2',
    'icon-lg': 'p-4',
    circular: 'w-10 h-10 rounded-full flex items-center justify-center',
  };
  
  const variantClass = variants[variant] || variants.primary;
  const sizeClass = sizes[size] || sizes.medium;
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
