import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import Button from '../ui/Button';
import { LogIn, UserPlus } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Logo size="sm" />
        </Link>

        {/* Navigation Links for Public Landing */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#home" className="hover:text-primary transition-colors">
            Beranda
          </a>
          <a href="#about" className="hover:text-primary transition-colors">
            Paket Layanan
          </a>
          <a href="#faq" className="hover:text-primary transition-colors">
            FAQ
          </a>
          <a href="#contact" className="hover:text-primary transition-colors">
            Kontak
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="outline" size="sm" className="text-xs">
              <LogIn className="w-3.5 h-3.5 mr-1.5" />
              Masuk
            </Button>
          </Link>
          <Link to="/register">
            <Button size="sm" className="text-xs">
              <UserPlus className="w-3.5 h-3.5 mr-1.5" />
              Daftar Reservasi
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
