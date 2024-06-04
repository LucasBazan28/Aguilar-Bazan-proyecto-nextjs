"use client";
import React, { useState, useEffect } from 'react';
import './header.css';
import Link from 'next/link';
import Logo from './logo';
import { CartIcon } from './cartIcons';
import { SignInOutButton } from './SignInOutButton';

const Header = () => {
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        if (currentScrollY < lastScrollY) {
          setIsScrollingUp(true);
        } else {
          setIsScrollingUp(false);
        }
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header className={`header ${isScrollingUp ? 'expanded' : 'collapsed'}`}>
      <div className="container mx-auto">
        <Logo />
        <div className="flex space-x-4">
          <Link href="/cart" passHref>
            <button><CartIcon /></button>
          </Link>
          {/*<SignInOutButton />
          TIRA ERROR, PROBABLEMENTE POR COMO USO AUTH
          POSIBLE SOLUCION: USAR bcryptjs en vez de */}
        </div>
      </div>
    </header>
  );
};

export default Header;