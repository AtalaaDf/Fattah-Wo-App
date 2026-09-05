import React from 'react';
import Logo from './Logo';

export const Footer = () => {
  return (
    <footer className="w-full bg-slate-900 text-white border-t border-slate-800 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-2 text-center md:text-left">
          <Logo size="sm" theme="dark" />
          <p className="text-xs text-slate-400 max-w-sm mt-2">
            Fattah Wedding Organizer — Platform manajemen internal workforce, jadwal kru, dan reservasi pernikahan terpercaya.
          </p>
        </div>

        <div className="text-xs text-slate-400 text-center md:text-right space-y-1">
          <p>© {new Date().getFullYear()} Fattah Wedding Organizer. All rights reserved.</p>
          <p className="text-slate-500">Built for GDGoC Final Project Frontend Development.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
