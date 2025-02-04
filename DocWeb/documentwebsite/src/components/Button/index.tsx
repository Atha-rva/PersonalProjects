import React from 'react';

export interface ButtonProps {
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, children }) => {
  const styles = {
    primary: 'bg-blue-500 text-white px-4 py-2 rounded',
    secondary: 'bg-gray-500 text-white px-4 py-2 rounded',
  };

  return <button className={styles[variant]}>{children}</button>;
};

export default Button;
