
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";

function Navbar() {

    const { theme, toggleTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className={`navbar ${menuOpen ? "menu-open" : ""}`}>

            <Link to="/" className="logo" onClick={closeMenu}>
                GLOBAL<span>ESTATE</span>
            </Link>

            <div className="nav-links">
                <Link to="/" onClick={closeMenu}>Home</Link>
                <Link to="/properties" onClick={closeMenu}>Properties</Link>
                <Link to="/about" onClick={closeMenu}>About</Link>
                <Link to="/contact" onClick={closeMenu}>Contact</Link>
            </div>

            <div className="nav-actions">

                <Link to="/favorites" className="favorite-link" onClick={closeMenu}>
                    <Heart size={20} />
                </Link>

                <button
                    className="theme-btn"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                >
                    {theme === "light" ? (
                        <Moon size={20} />
                    ) : (
                        <Sun size={20} />
                    )}
                </button>

                <button
                    className="menu-btn"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>

            </div>

        </nav>
    );
}

export default Navbar;
