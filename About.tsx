
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <section className="bg-gray-50 dark:bg-gray-900/50 py-20 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white">20 Anos Com Você</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed italic mb-12">
            "Nossa história começou com um sonho de cuidar da visão das pessoas com elegância e profissionalismo. Duas décadas depois, continuamos firmes nesse propósito."
          </p>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=800" 
              alt="Sobre nós" 
              className="rounded-3xl shadow-2xl grayscale dark:grayscale-0 transition-all"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-primary">Nossa História</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              A Ótica Limoeiro nasceu há 20 anos, fundamentada nos pilares da confiança e da excelência no atendimento. Ao longo dos anos, evoluímos de uma pequena loja para uma rede de referência na região.
            </p>
            <div className="grid grid-cols-2 gap-8 py-8">
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-xl mb-2">Missão</h4>
                <p className="text-gray-500 dark:text-gray-400">Proporcionar saúde visual e bem-estar através de produtos de alta qualidade e design moderno.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-xl mb-2">Visão</h4>
                <p className="text-gray-500 dark:text-gray-400">Ser a ótica mais querida e confiável, unindo tradição tecnológica com atendimento humanizado.</p>
              </div>
            </div>
            <div className="p-6 bg-primary/5 rounded-xl border border-primary/20">
              <h4 className="font-bold text-primary mb-2">Nossos Valores</h4>
              <p className="text-gray-600 dark:text-gray-300">Tradição, Qualidade Garantida, Ética Profissional e Foco no Cliente.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
