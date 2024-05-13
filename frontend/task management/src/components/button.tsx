import React from 'react';

interface ButtonProps {
    name: string;
    size: 'small' | 'medium' | 'large';
    onclick: () => void;
}

const Button: React.FC<ButtonProps> = ({ onclick, name, size }) => {
    return (
        <div className={`${size === 'small' ? 'mb-2' : size === 'large' ? 'mb-4' : ''} flex justify-center`}>
            <button onClick={onclick} className={`bg-blue-500 text-white rounded ${size === 'small' ? 'px-2 py-1 text-sm' : size === 'medium' ? 'px-4 py-2 text-base' : 'px-12 py-3 text-lg mt-4'} hover:bg-blue-600`}>
                {name}
            </button>
        </div>
    );
};

export default Button;
