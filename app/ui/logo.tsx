import React from 'react';
import Image from "next/image";
import './header.css';
const Logo = () => {
  return (
    <div className="logo w-full h-full">
        <div className="logo-image">
            <Image
            src="/images/Timeless_Sounds_Logo.png"
            alt="Timeless Sounds Logo"
            fill // Hace que la imagen ocupe todo el espacio disponible en su contenedor
            sizes="100vw"
            style={{ objectFit: 'contain' }} // Mantiene el aspecto original de la imagen
            />
      </div>
  </div>
  );
};

export default Logo;
