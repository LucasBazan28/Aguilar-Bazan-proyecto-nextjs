import React from 'react';
import Image from 'next/image';
import './header.css';
const Logo = () => {
  return (
    <div className="logo">
        <div className="text">Timeless</div>
        <div className="logo-image">
            <Image
            src="/images/Timeless_Sounds_Logo.png"
            alt="Timeless Sounds Logo"
            layout="fill" // Hace que la imagen ocupe todo el espacio disponible en su contenedor
            objectFit="contain" // Mantiene el aspecto original de la imagen
            />
      </div>
      <div className="text">Sounds</div>
  </div>
  );
};

export default Logo;
