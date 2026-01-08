
import React, { useState } from 'react';
import { View, ThemeMode } from '../types';

interface NavbarProps {
  currentView: View;
  setView: (view: View) => void;
  isAdmin: boolean;
  onLogout: () => void;
  currentMode: ThemeMode;
  toggleMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, isAdmin, onLogout, currentMode, toggleMode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { label: string, value: View }[] = [
    { label: 'Início', value: 'home' },
    { label: 'Produtos', value: 'products' },
    { label: 'Sobre', value: 'about' },
    { label: 'Contato', value: 'contact' },
  ];

  const handleNavClick = (view: View) => {
    setView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAdminView = currentView === 'admin';

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-sm z-40 h-16 border-b dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => handleNavClick('home')}
        >
          <span className="text-primary text-2xl font-serif font-bold tracking-tight">
            Ótica Limoeiro
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {!isAdminView && navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => handleNavClick(item.value)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                currentView === item.value ? 'text-primary' : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
            title={currentMode === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
          >
            {currentMode === 'light' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            )}
          </button>

          {isAdmin ? (
            <div className="flex items-center space-x-4 border-l dark:border-gray-800 pl-4 ml-4">
              <button
                onClick={() => handleNavClick('admin')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentView === 'admin' ? 'text-primary' : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                Painel Admin
              </button>
              <button
                onClick={onLogout}
                className="text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-4 py-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Sair
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleNavClick('login')}
              className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              Admin
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center md:hidden gap-2">
           <button
            onClick={toggleMode}
            className="p-2 rounded-full text-gray-500 dark:text-gray-400"
          >
            {currentMode === 'light' ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            )}
          </button>
          <button 
            className="p-2 text-gray-600 dark:text-gray-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b dark:border-gray-800 shadow-lg animate-fade-in-down">
          <div className="flex flex-col p-4 space-y-4">
            {!isAdminView && navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`text-left text-lg font-medium ${
                  currentView === item.value ? 'text-primary' : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {isAdmin && (
              <>
                <button
                  onClick={() => handleNavClick('admin')}
                  className={`text-left text-lg font-medium ${
                    currentView === 'admin' ? 'text-primary' : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  Painel Admin
                </button>
                <button
                  onClick={onLogout}
                  className="text-left text-lg font-medium text-red-500"
                >
                  Sair
                </button>
              </>
            )}
            {!isAdmin && (
               <button
               onClick={() => handleNavClick('login')}
               className="text-left text-sm text-gray-400 dark:text-gray-500"
             >
               Acesso Restrito
             </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
