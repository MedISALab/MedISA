import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";

// Import all page components
import { Banner } from "./components/Banner";
import { Highlights } from "./components/Highlights";
import { News } from "./components/News";          // ✅ Import News
import { Publications } from "./components/Publications";
import { Contact } from "./components/Contact";

// Example pages for routes
import People from './pages/People';
import IndvPublications from './pages/Publications';
import { useEffect } from 'react';

// Wrapper for Home page to handle hash navigation
const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#contact") {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "auto" }); // direct jump
      }
    }
  }, [location]);

  return (
    <>
      <Banner />
      <Highlights />
      <News />
      <Publications />
      <Contact />
    </>
  );
};

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          {/* Main landing page */}
          <Route path="/" element={<HomePage />} />

          {/* Separate pages */}
          <Route path="/publications" element={<IndvPublications />} />
          <Route path="/people" element={<People />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
