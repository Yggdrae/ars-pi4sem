// src/components/Icon.tsx
import React from 'react';

interface IconProps {
  name: string;  
  size?: string; 
  color?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 'text-2xl', color = 'text-gray-600' }) => {
  return <i className={`pi ${name} ${size} ${color}`}></i>;
};

export default Icon;
