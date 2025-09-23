import { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false); // dropdown toggle state
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Collapse navbar and dropdown on route change
  useEffect(() => {
    setExpanded(false);
    setTeamOpen(false);
  }, [location]);

  // Navigation helper
  const handleNavClick = (path) => {
    setExpanded(false); // collapse navbar
    if (path === "#contact") {
      if (location.pathname === "/") {
        const contactSection = document.getElementById("contact");
        if (contactSection)
          contactSection.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/", { replace: false });
        setTimeout(() => {
          const contactSection = document.getElementById("contact");
          if (contactSection)
            contactSection.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      navigate(path);
    }
  };

  // Team navigation
  const handleTeamClick = (type) => {
    setTeamOpen(false); // close dropdown on click
    if (type === "mentor") {
      window.location.href =
        "https://research.iitj.ac.in/researcher/angshuman-paul-1";
    } else {
      navigate(`/people${type ? `?type=${type}` : ""}`);
    }
  };

  const linkClass = (path) =>
    location.pathname === path ? "active navbar-link" : "navbar-link";

  return (
    <Navbar expand="lg" className={scrolled ? "scrolled" : ""} expanded={expanded}>
      <Navbar.Brand onClick={() => navigate("/")} className="medai-brand">
        MedISA LAB
      </Navbar.Brand>

      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="navbar-toggler-icon"></span>
      </Navbar.Toggle>

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link className={linkClass("/")} onClick={() => handleNavClick("/")}>
            Home
          </Nav.Link>

          {/* Team dropdown */}
          <div className="nav-item dropdown">
            <span
              className={`nav-link navbar-link dropdown-toggle ${
                location.pathname.startsWith("/people") ? "active" : ""
              }`}
              onClick={() => setTeamOpen(!teamOpen)} // toggle dropdown
            >
              Team
            </span>
            <div
              className="dropdown-menu"
              style={{ display: teamOpen ? "block" : "none" }}
            >
              <span className="dropdown-item" onClick={() => handleTeamClick("")}>
               All Members
              </span>
              <span className="dropdown-item" onClick={() => handleTeamClick("mentor")}>
                Mentor
              </span>
              <span className="dropdown-item" onClick={() => handleTeamClick("phd")}>
                PhD
              </span>
              <span className="dropdown-item" onClick={() => handleTeamClick("masters")}>
                Masters
              </span>
              <span className="dropdown-item" onClick={() => handleTeamClick("undergrad")}>
                Undergrad
              </span>
            </div>
          </div>

          <Nav.Link
            className={linkClass("/publications")}
            onClick={() => handleNavClick("/publications")}
          >
            Publications & Code
          </Nav.Link>

          <Nav.Link className="navbar-link" onClick={() => handleNavClick("#contact")}>
            Contact
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
