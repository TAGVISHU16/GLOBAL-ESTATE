
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, ArrowUpRight } from "lucide-react";
import "./Home.css";
import FeaturedProperties from "../components/FeaturedProperties";
import PropertyCategories from "../components/PropertyCategories";
import WhyChooseUs from "../components/WhyChooseUs";
import ClientReviews from "../components/ClientReviews";

function Home() {
    const navigate = useNavigate();

    const [purpose, setPurpose] = useState("Buy");
    const [location, setLocation] = useState("");
    const [propertyType, setPropertyType] = useState("All Properties");

    const handleSearch = (e) => {
        e.preventDefault();

        const params = new URLSearchParams({
            purpose,
            location,
            type: propertyType
        });

        navigate(`/properties?${params.toString()}`);
    };

    return (
        <main className="home-page">

            <section className="home-hero">

                <div className="hero-left">

                    <span className="hero-eyebrow">
                        <span></span>
                        YOUR WORLD. YOUR PROPERTY.
                    </span>

                    <h1>
                        Discover a place
                        <br />
                        <span>you'll love</span>
                        <br />
                        to call home.
                    </h1>

                    <p className="hero-description">
                        Explore exceptional properties across the world.
                        From beautiful apartments to extraordinary homes,
                        find the place that matches your lifestyle.
                    </p>

                    <div className="hero-buttons">
                        <button
                            className="explore-btn"
                            onClick={() => navigate("/properties")}
                        >
                            Explore Properties
                            <ArrowUpRight size={18} />
                        </button>

                        <span className="hero-note">
                            Find your next chapter.
                        </span>
                    </div>

                    <div className="hero-stats">
                        <div>
                            <h3>Global</h3>
                            <p>Property Discovery</p>
                        </div>

                        <div>
                            <h3>Premium</h3>
                            <p>Property Collection</p>
                        </div>
                    </div>

                </div>

                <div className="hero-right">

                    <div className="hero-image">
                        <img
                            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
                            alt="Luxury modern house"
                        />

                        <div className="image-label">
                            <span>CURATED LIVING</span>
                            <h3>Find your kind of home.</h3>
                        </div>
                    </div>

                    <div className="image-decoration"></div>

                </div>

            </section>

            <section className="home-search-section">

                <div className="search-heading">
                    <div>
                        <span>START YOUR SEARCH</span>
                        <h2>Find your perfect property</h2>
                    </div>

                    <p>One search. Endless possibilities.</p>
                </div>

                <form className="home-search-form" onSubmit={handleSearch}>

                    <div className="purpose-options">
                        {["Buy", "Rent", "Sell"].map((item) => (
                            <button
                                type="button"
                                key={item}
                                className={purpose === item ? "selected" : ""}
                                onClick={() => setPurpose(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    <div className="search-inputs">

                        <div className="home-search-field">
                            <label>LOCATION</label>
                            <div className="search-input-wrap">
                                <MapPin size={18} />
                                <input
                                    type="text"
                                    placeholder="Enter city or country"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="home-search-field">
                            <label>PROPERTY TYPE</label>
                            <select
                                value={propertyType}
                                onChange={(e) => setPropertyType(e.target.value)}
                            >
                                <option>All Properties</option>
                                <option>Apartment</option>
                                <option>House</option>
                                <option>Villa</option>
                                <option>Land</option>
                            </select>
                        </div>

                        <button className="home-search-btn" type="submit">
                            <Search size={18} />
                            Search
                        </button>

                    </div>

                </form>

            </section>
            <FeaturedProperties />
            <PropertyCategories />
            <WhyChooseUs />
            <ClientReviews />

        </main>
    );
}

export default Home;
