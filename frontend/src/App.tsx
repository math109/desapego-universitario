import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { Vitrine } from "./components/Vitrine";
import { Footer } from "./components/Footer";
import { Anunciar } from "./pages/Anunciar";
import { MeusAnuncios } from "./pages/MeusAnuncios";
 
function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
 
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Stats />
                <Vitrine />
              </>
            }
          />
          <Route path="/anunciar" element={<Anunciar />} />
          <Route path="/meus-anuncios" element={<MeusAnuncios />} />
        </Routes>
      </main>
 
      <Footer />
    </div>
  );
}
 
export default App;