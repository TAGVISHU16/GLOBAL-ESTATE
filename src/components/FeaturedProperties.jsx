
import { useNavigate } from "react-router-dom";
import { MapPin, BedDouble, Bath, ArrowUpRight } from "lucide-react";
import "./FeaturedProperties.css";

const featuredProperties = [
    {
        id: 1,
        name: "Modern Luxury Villa",
        location: "Beverly Hills, California",
        price: "$850,000",
        beds: 4,
        baths: 3,
        area: "2,400 sq.ft",
        image: "https://images.unsplash.com/photo-1613490493576-7eerde",
        fallback: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
    },
    {
        id: 2,
        name: "Elegant City Apartment",
        location: "Dubai, United Arab Emirates",
        price: "$420,000",
        beds: 3,
        baths: 2,
        area: "1,800 sq.ft",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
    },
    {
        id: 3,
        name: "Contemporary Dream Home",
        location: "London, United Kingdom",
        price: "$690,000",
        beds: 4,
        baths: 3,
        area: "2,100 sq.ft",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
    }
];

function FeaturedProperties() {
    const navigate = useNavigate();

    return (
        <section className="featured-section">

            <div className="featured-heading">
                <div>
                    <span>HANDPICKED FOR YOU</span>
                    <h2>Featured Properties</h2>
                    <p>
                        Explore some of our finest property collections.
                    </p>
                </div>

                <button
                    className="view-all-btn"
                    onClick={() => navigate("/properties")}
                >
                    View All Properties
                    <ArrowUpRight size={17} />
                </button>
            </div>

            <div className="featured-grid">

                {featuredProperties.map((property) => (
                    <article className="property-card" key={property.id}>

                        <div className="property-image">
                            <img
                                src={property.image}
                                alt={property.name}
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = property.fallback ||
                                        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c";
                                }}
                            />

                            <span className="property-badge">
                                FEATURED
                            </span>
                        </div>

                        <div className="property-info">

                            <div className="property-location">
                                <MapPin size={14} />
                                {property.location}
                            </div>

                            <h3>{property.name}</h3>

                            <div className="property-details">
                                <span>
                                    <BedDouble size={16} />
                                    {property.beds} Beds
                                </span>

                                <span>
                                    <Bath size={16} />
                                    {property.baths} Baths
                                </span>

                                <span>{property.area}</span>
                            </div>

                            <div className="property-bottom">
                                <div>
                                    <small>PRICE</small>
                                    <h4>{property.price}</h4>
                                </div>

                                <button
                                    aria-label={`View ${property.name}`}
                                    onClick={() => navigate("/properties")}
                                >
                                    <ArrowUpRight size={19} />
                                </button>
                            </div>

                        </div>

                    </article>
                ))}

            </div>

        </section>
    );
}

export default FeaturedProperties;
