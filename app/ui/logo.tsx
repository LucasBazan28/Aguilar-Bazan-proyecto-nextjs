import React from 'react';
import Image from "next/legacy/image";
import './header.css';
const Logo = () => {
  return (
    <div className="logo">
        <div className="logo-image">
            <Image
            src="/images/Timeless_Sounds_Logo.png"
            alt="Timeless Sounds Logo"
            layout="fill" // Hace que la imagen ocupe todo el espacio disponible en su contenedor
            objectFit="contain" // Mantiene el aspecto original de la imagen
            />
      </div>
  </div>
  );
};

export default Logo;
