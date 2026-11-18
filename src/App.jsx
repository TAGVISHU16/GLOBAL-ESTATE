
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Properties from "./pages/Properties";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Favorites from "./pages/Favorites";
import Footer from "./components/Footer";
import PropertyDetails from "./pages/PropertyDetails";
import Compare from "./pages/Compare";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/compare" element={<Compare />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
