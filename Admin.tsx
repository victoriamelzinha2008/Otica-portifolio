
import React, { useState, useRef } from 'react';
import { Product, Category } from '../types';

interface AdminProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
  onLogout: () => void;
}

const Admin: React.FC<AdminProps> = ({ products, setProducts, onLogout }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [isProcessingImage, setIsProcessingImage] = useState(false);

  // Form states
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<Category>('Óculos');
  const [formDescription, setFormDescription] = useState('');
  const [formImageBase64, setFormImageBase64] = useState('');
  const [formActive, setFormActive] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('A imagem é muito grande. Escolha um arquivo menor que 2MB.');
        return;
      }
      setIsProcessingImage(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormImageBase64(reader.result as string);
        setIsProcessingImage(false);
      };
      reader.onerror = () => {
        alert('Erro ao carregar imagem.');
        setIsProcessingImage(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormCategory('Óculos');
    setFormDescription('');
    setFormImageBase64('');
    setFormActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormName(product.name);
    setFormCategory(product.category);
    setFormDescription(product.description);
    setFormImageBase64(product.image);
    setFormActive(product.active);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isProcessingImage) return;

    if (!formImageBase64) {
      alert('Por favor, selecione uma imagem para o produto.');
      return;
    }

    if (editingProduct) {
      // Edit logic
      const updatedProducts = products.map(p => 
        p.id === editingProduct.id 
          ? {
              ...p,
              name: formName,
              category: formCategory,
              description: formDescription,
              image: formImageBase64,
              active: formActive
            } 
          : p
      );
      setProducts(updatedProducts);
      showSuccess('Produto atualizado com sucesso!');
    } else {
      // Create logic
      const newProduct: Product = {
        id: Date.now().toString(),
        name: formName,
        category: formCategory,
        description: formDescription,
        image: formImageBase64,
        active: formActive
      };
      setProducts([newProduct, ...products]);
      showSuccess('Produto adicionado com sucesso!');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      const remainingProducts = products.filter(p => p.id !== id);
      setProducts(remainingProducts);
      showSuccess('Produto excluído!');
    }
  };

  const toggleActive = (id: string) => {
    const updatedProducts = products.map(p => 
      p.id === id ? { ...p, active: !p.active } : p
    );
    setProducts(updatedProducts);
    showSuccess('Status alterado!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in">
      {/* Centered Admin Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Gerenciar Catálogo</h2>
        <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
        <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
          Painel de controle para proprietárias. Gerencie produtos, estoque e visibilidade no catálogo público.
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Inventário</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{products.length} itens cadastrados</p>
        </div>
        <button
          onClick={openAddModal}
          className="px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg hover:bg-primary-hover transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>
          Adicionar Novo Item
        </button>
      </div>

      {successMsg && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl border border-green-100 dark:border-green-900/30 flex items-center gap-3 animate-bounce">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
          {successMsg}
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border dark:border-gray-800 overflow-hidden transition-colors duration-300">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300">Produto</th>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300">Categoria</th>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300">Status</th>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-800">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center text-gray-400 dark:text-gray-600 italic">Nenhum produto cadastrado até o momento.</td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img src={p.image} className="w-14 h-14 rounded-lg object-cover bg-gray-100 dark:bg-gray-700 border dark:border-gray-600" />
                        <div className="max-w-[200px] sm:max-w-xs overflow-hidden">
                          <p className="font-bold text-gray-900 dark:text-gray-100 truncate">{p.name}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{p.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => toggleActive(p.id)}
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                          p.active ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${p.active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        {p.active ? 'Visível' : 'Oculto'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button 
                          onClick={() => openEditModal(p)}
                          className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        </button>
                        <button 
                          onClick={() => handleDelete(p.id)}
                          className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                          title="Excluir"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-fade-in border dark:border-gray-800">
            <div className="bg-primary p-6 text-white flex justify-between items-center transition-colors duration-300">
              <h3 className="text-xl font-bold">{editingProduct ? 'Editar Produto' : 'Cadastrar Novo Item'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="hover:rotate-90 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSave} className="p-8 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome</label>
                <input 
                  type="text" 
                  value={formName} 
                  onChange={e => setFormName(e.target.value)} 
                  className="w-full px-4 py-2.5 rounded-xl border dark:border-gray-700 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Categoria</label>
                <select 
                  value={formCategory} 
                  onChange={e => setFormCategory(e.target.value as Category)}
                  className="w-full px-4 py-2.5 rounded-xl border dark:border-gray-700 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Óculos">Óculos</option>
                  <option value="Joias">Joias</option>
                  <option value="Relógios">Relógios</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Foto do Produto</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary dark:hover:border-primary transition-all group"
                >
                  {formImageBase64 ? (
                    <img src={formImageBase64} className="w-24 h-24 object-cover rounded-lg shadow-md border dark:border-gray-700" />
                  ) : (
                    <div className="text-gray-400 group-hover:text-primary">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Clique para selecionar imagem (Max 2MB)</p>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept="image/*"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Breve Descrição</label>
                <textarea 
                  rows={3} 
                  value={formDescription} 
                  onChange={e => setFormDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border dark:border-gray-700 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Ex: Armação leve, lentes polarizadas..."
                />
              </div>
              <div className="flex items-center gap-3 py-2">
                <input 
                  type="checkbox" 
                  id="active" 
                  checked={formActive} 
                  onChange={e => setFormActive(e.target.checked)}
                  className="w-5 h-5 text-primary border-gray-300 dark:border-gray-700 rounded focus:ring-primary dark:bg-gray-800"
                />
                <label htmlFor="active" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">Visível no catálogo público</label>
              </div>
              <div className="pt-4 flex gap-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                >
                  Descartar
                </button>
                <button 
                  type="submit" 
                  disabled={isProcessingImage}
                  className={`flex-1 py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary-hover transition-all ${isProcessingImage ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isProcessingImage ? 'Salvando...' : (editingProduct ? 'Salvar Alterações' : 'Confirmar Cadastro')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
