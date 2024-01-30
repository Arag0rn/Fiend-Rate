import React, { MouseEventHandler } from 'react';

const ButtonToggle = (
  { children, onClick, className }:
  {
    children: React.ReactNode,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    className: string,
  }
) => {
  return (
    <button
        className={className}
        onClick={onClick}
      >
        {children}
    </button>
  )
}

export default ButtonToggle