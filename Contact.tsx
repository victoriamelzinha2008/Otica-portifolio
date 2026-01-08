
import React from 'react';

const Contact: React.FC = () => {
  const whatsappNumber = "5588000000000"; // Replace with real number if needed
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Olá! Gostaria de mais informações sobre seus produtos.`;

  return (
    <div className="animate-fade-in py-20 px-4 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border dark:border-gray-800">
        <div className="bg-primary p-10 text-center text-white transition-colors duration-500">
          <h2 className="text-3xl font-bold mb-4">Fale Conosco</h2>
          <p className="opacity-90 text-lg font-light">Estamos prontos para atender você!</p>
        </div>
        
        <div className="p-10 space-y-12">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
              Clique no botão abaixo para iniciar uma conversa diretamente em nosso WhatsApp oficial.
            </p>
            
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-[#25D366] text-white rounded-2xl text-xl font-bold transition-all hover:bg-[#128C7E] hover:scale-105 shadow-lg shadow-green-200"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
              </svg>
              Iniciar Chat
            </a>
          </div>

          <div className="border-t dark:border-gray-800 pt-8 grid grid-cols-1 gap-6 text-gray-500 dark:text-gray-400 text-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <p>Av. das Flores, 123 - Centro, Limoeiro</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <p>(88) 0000-00000</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <p>Segunda à Sábado: 08:00 às 18:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
