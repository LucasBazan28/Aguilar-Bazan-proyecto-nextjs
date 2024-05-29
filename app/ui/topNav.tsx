"use client";
import React, { useState, useEffect } from 'react';
import './header.css';
import Link from 'next/link';
import Logo from './logo';
import { CartIcon } from './cartIcons';

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
      <div className="container mx-auto shadow-lg">
        <Logo />
        <div className="flex space-x-4">
          <Link href="/cart" passHref>
            <button><CartIcon /></button>
          </Link>
          <Link href="/prueba" passHref>
            <button className="log-in-button text-sm lg:text-md">Log In</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;