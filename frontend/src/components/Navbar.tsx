import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Heart, Bike } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Nome */}
          <div className="flex items-center gap-2">
            <Bike className="text-red-600" size={32} />
            <Link to="/" className="font-bold text-xl tracking-tighter">
              INSTITUTO <span className="text-red-600">TRENÔ</span>
            </Link>
          </div>

          {/* Links Desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className="hover:text-red-500 transition-colors">
                Home
              </Link>
              <Link
                to="/quem-somos"
                className="hover:text-red-500 transition-colors"
              >
                Quem Somos
              </Link>
              <Link
                to="/projetos"
                className="hover:text-red-500 transition-colors"
              >
                Projetos
              </Link>
              <Link
                to="/doar"
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full flex items-center gap-2 transition-all"
              >
                <Heart size={18} fill="currentColor" />
                Quero Doar
              </Link>
            </div>
          </div>

          {/* Botão Mobile */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile Aberto */}
      {isOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700 animate-in slide-in-from-top">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 hover:bg-slate-700"
            >
              Home
            </Link>
            <Link
              to="/quem-somos"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 hover:bg-slate-700"
            >
              Quem Somos
            </Link>
            <Link
              to="/projetos"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 hover:bg-slate-700"
            >
              Projetos
            </Link>
            <Link
              to="/doar"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 bg-red-600 font-bold"
            >
              Quero Doar
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
