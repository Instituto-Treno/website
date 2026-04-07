import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Heart, Mail } from "lucide-react";
import { FiFacebook, FiInstagram } from "react-icons/fi";
import LogoTreno from "../assets/logo-Instituto.webp";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: "Início", path: "/" },
    { name: "Quem Somos", path: "/quem-somos" },
    { name: "Instituto Trenó", path: "/projetos" },
    { name: "Fale Conosco", path: "/contato" },
  ];

  return (
    <header className="w-full sticky top-0 z-50 shadow-sm font-display bg-white">
      <div className="flex h-32 md:h-40 w-full">
        {/* Logo - Padronizado com hover:brightness-90 */}
        <div className="h-full shrink-0">
          <Link
            to="/"
            className="bg-treno-light-blue h-full px-10 flex items-center justify-center transition-all duration-300 hover:brightness-90"
          >
            <img
              src={LogoTreno}
              alt="Instituto Trenó"
              className="h-24 md:h-28 w-auto object-contain"
            />
          </Link>
        </div>

        <div className="flex flex-col grow h-full">
          {/* --- TOP BAR --- */}
          <div className="hidden md:flex border-b border-gray-100 h-12 w-full items-center justify-between px-10 text-[13px] text-treno-text">
            <div className="flex items-center gap-8">
              <span className="font-medium text-gray-500">
                Bem-vindo ao instituto Trenó!
              </span>
              <a
                href="mailto:contato@institutotreno.org.br"
                className="flex items-center gap-2 hover:text-treno-light-blue transition-colors font-medium group"
              >
                <Mail
                  size={14}
                  className="text-treno-light-blue group-hover:scale-110 transition-transform"
                />
                contato@institutotreno.org.br
              </a>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-gray-500 hover:text-treno-light-blue transition-all hover:scale-110"
              >
                <FiFacebook size={18} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-treno-light-blue transition-all hover:scale-110"
              >
                <FiInstagram size={18} />
              </a>
            </div>
          </div>

          {/* --- MAIN NAVIGATION --- */}
          <nav className="grow w-full flex items-center justify-between pl-10">
            <div className="hidden md:flex items-center h-full">
              <div className="flex space-x-12 font-bold text-[16px] text-treno-title h-full">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`group relative h-full flex items-center transition-colors duration-300 ${
                      isActive(link.path)
                        ? "text-treno-light-blue"
                        : "hover:text-treno-light-blue"
                    }`}
                  >
                    {link.name}
                    {/* Underline Moderno (Corrigido para todos os links) */}
                    <span
                      className={`absolute bottom-0 left-0 h-1.5 bg-treno-light-blue transition-all duration-300 ease-in-out ${
                        isActive(link.path)
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Botão de Doação - Padronizado com hover:brightness-90 */}
            <div className="hidden md:flex items-center h-full">
              <Link
                to="/doar"
                className="bg-treno-light-blue text-white font-extrabold px-12 h-full flex items-center gap-3 transition-all duration-300 uppercase text-[15px] shadow-sm active:scale-95 hover:brightness-90 group"
              >
                <Heart
                  size={20}
                  fill="currentColor"
                  className="group-hover:scale-110 transition-transform duration-300"
                />
                Faça uma Doação
              </Link>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden grow flex justify-end pr-8">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-treno-light-blue p-2 transition-transform active:scale-90"
              >
                {isOpen ? <X size={35} /> : <Menu size={35} />}
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top duration-300">
          <div className="px-8 py-10 space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block text-xl font-bold border-b pb-2 transition-colors ${
                  isActive(link.path)
                    ? "text-treno-light-blue border-treno-light-blue"
                    : "text-treno-title border-transparent"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/doar"
              onClick={() => setIsOpen(false)}
              className="block py-5 bg-treno-light-blue text-white text-center font-black rounded-sm shadow-md active:scale-95 hover:brightness-90 transition-all"
            >
              FAÇA UMA DOAÇÃO
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
