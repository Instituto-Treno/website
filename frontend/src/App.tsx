import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuemSomos from "./pages/QuemSomos";
import Doar from "./pages/Doar";
import Header from "./components/Header";

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Header />
      <div className="min-h-screen">
        <Routes>
          <Route
            path="/"
            element={
              <div className="p-20 text-center text-3xl font-bold">
                Em construção: Home
              </div>
            }
          />
          <Route path="/quem-somos" element={<QuemSomos />} />
          <Route
            path="/projetos"
            element={
              <div className="p-20 text-center text-3xl font-bold">
                Em construção: Projetos
              </div>
            }
          />
          <Route path="/doar" element={<Doar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
