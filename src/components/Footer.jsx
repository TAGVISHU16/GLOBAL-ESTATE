
import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, ArrowUpRight } from "lucide-react";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-brand">
                    <Link to="/" className="footer-logo">
                        GLOBAL<span>ESTATE</span>
                    </Link>

                    <p>
                        Discover exceptional properties around the world.
                        Find a place that matches your lifestyle.
                    </p>
                </div>

                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <Link to="/">Home</Link>
                    <Link to="/properties">Properties</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/contact">Contact</Link>
                </div>

                <div className="footer-links">
                    <h3>Explore</h3>
                    <Link to="/properties?type=Apartment">Apartments</Link>
                    <Link to="/properties?type=Villa">Villas</Link>
                    <Link to="/properties?type=House">Houses</Link>
                    <Link to="/properties?type=Land">Land</Link>
                </div>

                <div className="footer-contact">
                    <h3>Get In Touch</h3>

                    <p><MapPin size={17} /> Worldwide Property Discovery</p>
                    <p><Mail size={17} /> hello@globalestate.com</p>
                    <p><Phone size={17} /> +1 234 567 890</p>
                </div>

            </div>

            <div className="footer-bottom">
                <p>© 2026 GLOBAL ESTATE. All Rights Reserved.</p>

                <Link to="/properties">
                    Explore Properties <ArrowUpRight size={16} />
                </Link>
            </div>
        </footer>
    );
}

export default Footer;
