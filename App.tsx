
import React, { useState, useEffect } from 'react';
import { Product, View, ThemeMode, SiteSettings } from './types';
import Navbar from './Navbar';
import Home from './Home';
import ProductList from './ProductList';
import About from './About';
import Contact from './Contact';
import Admin from './Admin';
import Login from './Login';

const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: 'Óculos de Sol Aviador', category: 'Óculos', description: 'Design clássico com lentes polarizadas.', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800', active: true },
  { id: '2', name: 'Relógio Elegance Gold', category: 'Relógios', description: 'Pulseira em ouro 18k.', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800', active: true }
];

const DEFAULT_SETTINGS: SiteSettings = {
  aboutQuote: "Nossa história começou com um sonho de cuidar da visão das pessoas com elegância e profissionalismo.",
  aboutHistory: "A Ótica Limoeiro nasceu há 20 anos, fundamentada nos pilares da confiança e da excelência.",
  mission: "Proporcionar saúde visual e bem-estar através de produtos de alta qualidade.",
  vision: "Ser a ótica mais querida e confiável da região.",
  whatsapp: "5588000000000",
  address: "Av. das Flores, 123 - Centro",
  phone: "(88) 0000-00000"
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState<ThemeMode>('light');

  useEffect(() => {
    const savedMode = localStorage.getItem('otica_limoeiro_mode') as ThemeMode || 'light';
    setMode(savedMode);
    document.documentElement.classList.toggle('dark', savedMode === 'dark');

    const savedProducts = localStorage.getItem('otica_limoeiro_products');
    if (savedProducts) setProducts(JSON.parse(savedProducts));
    else {
      setProducts(INITIAL_PRODUCTS);
      localStorage.setItem('otica_limoeiro_products', JSON.stringify(INITIAL_PRODUCTS));
    }

    const savedSettings = localStorage.getItem('otica_limoeiro_settings');
    if (savedSettings) setSettings(JSON.parse(savedSettings));
    
    if (sessionStorage.getItem('otica_admin_logged') === 'true') setIsAdminLoggedIn(true);
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    document.documentElement.classList.toggle('dark', newMode === 'dark');
    localStorage.setItem('otica_limoeiro_mode', newMode);
  };

  const saveProducts = (newProducts: Product[]) => {
    setProducts([...newProducts]);
    localStorage.setItem('otica_limoeiro_products', JSON.stringify(newProducts));
  };

  const saveSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
    localStorage.setItem('otica_limoeiro_settings', JSON.stringify(newSettings));
  };

  if (isLoading) return <div className="h-screen flex items-center justify-center dark:bg-gray-950 text-primary">Carregando...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Navbar currentView={currentView} setView={setCurrentView} isAdmin={isAdminLoggedIn} onLogout={() => {setIsAdminLoggedIn(false); sessionStorage.removeItem('otica_admin_logged'); setCurrentView('home');}} currentMode={mode} toggleMode={toggleMode} />
      <main className="flex-grow pt-16">
        {currentView === 'home' && <Home setView={setCurrentView} />}
        {currentView === 'products' && <ProductList products={products.filter(p => p.active)} />}
        {currentView === 'about' && <About settings={settings} />}
        {currentView === 'contact' && <Contact settings={settings} />}
        {currentView === 'login' && <Login onLogin={() => { setIsAdminLoggedIn(true); setCurrentView('admin'); }} />}
        {currentView === 'admin' && (isAdminLoggedIn ? <Admin products={products} setProducts={saveProducts} settings={settings} setSettings={saveSettings} onLogout={() => {setIsAdminLoggedIn(false); setCurrentView('home');}} /> : <Login onLogin={() => { setIsAdminLoggedIn(true); setCurrentView('admin'); }} />)}
      </main>
      <footer className="py-8 text-center text-gray-500 text-sm border-t dark:border-gray-800">Ótica Limoeiro &copy; {new Date().getFullYear()}</footer>
    </div>
  );
};

export default App;
