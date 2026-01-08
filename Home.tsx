
import React from 'react';
import { View } from '../types';

interface HomeProps {
  setView: (view: View) => void;
}

const Home: React.FC<HomeProps> = ({ setView }) => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-gray-900 transition-colors duration-300">
        <img 
          src="https://images.unsplash.com/photo-1511499767350-a1590fdb7301?auto=format&fit=crop&q=80&w=1600" 
          alt="Banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 dark:opacity-40 scale-105 transition-transform duration-[10s] hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 to-transparent"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-white text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
            Ótica Limoeiro
          </h1>
          <p className="text-primary text-xl md:text-2xl font-light mb-10 tracking-widest uppercase drop-shadow-lg">
            Rede de Óticas | 20 anos com você
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => setView('products')}
              className="w-full sm:w-auto px-10 py-4 bg-primary text-white rounded-full font-semibold text-lg transition-all hover:bg-primary-hover hover:scale-105 shadow-xl"
            >
              Ver Produtos
            </button>
            <button 
              onClick={() => setView('contact')}
              className="w-full sm:w-auto px-10 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-full font-semibold text-lg transition-all hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105 shadow-xl"
            >
              Fale Conosco
            </button>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-24 bg-white dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-10 rounded-3xl bg-gray-50 dark:bg-gray-900 transition-all hover:shadow-2xl hover:-translate-y-2 border border-transparent dark:border-gray-800">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-8 rotate-3 group-hover:rotate-0 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 dark:text-white">Saúde Visual</h3>
              <p className="text-gray-600 dark:text-gray-400">Lentes de alta tecnologia e armações ergonômicas para o seu máximo conforto diário.</p>
            </div>
            <div className="p-10 rounded-3xl bg-gray-50 dark:bg-gray-900 transition-all hover:shadow-2xl hover:-translate-y-2 border border-transparent dark:border-gray-800">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-8 -rotate-3 group-hover:rotate-0 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 dark:text-white">Estilo & Sofisticação</h3>
              <p className="text-gray-600 dark:text-gray-400">Curadoria exclusiva de joias e relógios que refletem sua personalidade e elegância.</p>
            </div>
            <div className="p-10 rounded-3xl bg-gray-50 dark:bg-gray-900 transition-all hover:shadow-2xl hover:-translate-y-2 border border-transparent dark:border-gray-800">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-8 rotate-6 group-hover:rotate-0 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 dark:text-white">Tradição de 20 Anos</h3>
              <p className="text-gray-600 dark:text-gray-400">Nossa trajetória é construída com ética e compromisso com cada cliente que atendemos.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
