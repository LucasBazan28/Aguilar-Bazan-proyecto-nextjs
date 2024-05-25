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
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 30vw"   //define algunos tamaños para que next la cargue eficientemente
            style={{ objectFit: 'contain' }} // Mantiene el aspecto original de la imagen
            priority={true}   //cuando la imagen se usa en el header hay que agregar priority
            />
      </div>
  </div>
  );
};

export default Logo;
