import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";

// Páginas temporárias (vamos criá-las depois)
const Home = () => (
  <div className="p-20 text-center">
    <h1>Página Inicial - Instituto Trenô</h1>
  </div>
);
const QuemSomos = () => (
  <div className="p-20 text-center">
    <h1>Nossa História</h1>
  </div>
);
const Projetos = () => (
  <div className="p-20 text-center">
    <h1>Nossos Projetos</h1>
  </div>
);
const Doar = () => (
  <div className="p-20 text-center">
    <h1>Página de Doação (Pix Dinâmico em breve)</h1>
  </div>
);

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quem-somos" element={<QuemSomos />} />
        <Route path="/projetos" element={<Projetos />} />
        <Route path="/doar" element={<Doar />} />
      </Routes>
    </Router>
  );
}

export default App;
