
export type Category = 'Óculos' | 'Joias' | 'Relógios';

export interface Product {
  id: string;
  name: string;
  category: Category;
  description: string;
  image: string; // Base64 string
  active: boolean;
}

export interface SiteSettings {
  aboutQuote: string;
  aboutHistory: string;
  mission: string;
  vision: string;
  whatsapp: string;
  address: string;
  phone: string;
}

export type ThemeMode = 'light' | 'dark';

export type View = 'home' | 'products' | 'about' | 'contact' | 'admin' | 'login';
