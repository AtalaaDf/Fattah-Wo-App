import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';
import Button from '../ui/Button';
import { LogIn, UserPlus, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll untuk shadow effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tutup mobile menu saat path berubah
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const isOnLanding = location.pathname === '/';

  const handleNavClick = (sectionId) => {
    setIsMobileOpen(false);
    if (isOnLanding) {
      // Sudah di landing page — scroll ke section
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  const navLinks = [
    { label: 'Beranda', sectionId: 'home' },
    { label: 'Paket Layanan', sectionId: 'about' },
    { label: 'FAQ', sectionId: 'faq' },
    { label: 'Kontak', sectionId: 'contact' },
  ];

  return (
    <>
      <nav
        className={`sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 transition-shadow duration-200 ${
          scrolled ? 'shadow-sm' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 focus:outline-none"
            aria-label="Kembali ke beranda"
          >
            <Logo size="sm" />
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            {navLinks.map((link) => (
              <button
                key={link.sectionId}
                onClick={() => handleNavClick(link.sectionId)}
                className="hover:text-primary transition-colors focus:outline-none focus-visible:underline"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="flex">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<LogIn className="w-3.5 h-3.5" />}
                className="flex flex-row items-center whitespace-nowrap text-xs"
              >
                Masuk
              </Button>
            </Link>
            <Link to="/register" className="flex">
              <Button
                size="sm"
                leftIcon={<UserPlus className="w-3.5 h-3.5" />}
                className="flex flex-row items-center whitespace-nowrap text-xs"
              >
                Daftar Reservasi
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none"
            aria-label={isMobileOpen ? 'Tutup menu' : 'Buka menu'}
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 pb-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.sectionId}
                onClick={() => handleNavClick(link.sectionId)}
                className="w-full text-left px-3 py-2.5 text-sm font-semibold text-slate-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <Link to="/login" onClick={() => setIsMobileOpen(false)}>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<LogIn className="w-3.5 h-3.5" />}
                  className="w-full flex-row text-xs justify-center"
                >
                  Masuk
                </Button>
              </Link>
              <Link to="/register" onClick={() => setIsMobileOpen(false)}>
                <Button
                  size="sm"
                  leftIcon={<UserPlus className="w-3.5 h-3.5" />}
                  className="w-full flex-row text-xs justify-center"
                >
                  Daftar Reservasi
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
