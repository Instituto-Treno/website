import { ShieldCheck, Users, Target } from "lucide-react";

const QuemSomos = () => {
  return (
    <div className="bg-white">
      {/* Header da Página */}
      <section className="bg-slate-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Nossa História</h1>
          <p className="text-xl text-slate-300">
            Desde 2019, transformando a paixão por duas rodas em solidariedade
            nas ruas de São Paulo.
          </p>
        </div>
      </section>

      {/* Missão, Visão, Valores */}
      <section className="py-16 max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div className="p-8 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <Target className="text-red-600 mb-4" size={40} />
          <h3 className="text-xl font-bold mb-2">Missão</h3>
          <p className="text-slate-600">
            Promover qualidade de vida para crianças vulneráveis por meio de
            ações sociais e culturais.
          </p>
        </div>

        <div className="p-8 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <ShieldCheck className="text-red-600 mb-4" size={40} />
          <h3 className="text-xl font-bold mb-2">Valores</h3>
          <p className="text-slate-600">
            Comprometimento, solidariedade, respeito e transparência em cada
            quilômetro percorrido.
          </p>
        </div>

        <div className="p-8 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <Users className="text-red-600 mb-4" size={40} />
          <h3 className="text-xl font-bold mb-2">Pessoas</h3>
          <p className="text-slate-600">
            Formado por motociclistas e voluntários unidos pelo desejo de fazer
            a diferença.
          </p>
        </div>
      </section>
    </div>
  );
};

export default QuemSomos;
