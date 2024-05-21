"use client";
import React, { useState, useEffect } from 'react';
import './header.css';
import Link from 'next/link';
import Logo from './logo';
import SideMenu from './sideMenu';

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
      <div className="container">
        <Logo />
        <Link href="/login" passHref>
          <button className="btn btn-outline btn-xs sm:btn-sm">Log In</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;