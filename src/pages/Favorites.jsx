
import { Link } from "react-router-dom";
import { MapPin, BedDouble, Bath, Maximize, Heart } from "lucide-react";

import { propertyData } from "../data/properties";
import { useFavorites } from "../context/FavoritesContext";

import "./Favorites.css";

function Favorites() {
    const { favorites, toggleFavorite } = useFavorites();

    const savedProperties = propertyData.filter((property) =>
        favorites.includes(property.id)
    );

    return (
        <main className="favorites-page">
            <section className="favorites-heading">
                <span>YOUR COLLECTION</span>
                <h1>My Favorite Properties</h1>
                <p>
                    All the properties you have saved in one place.
                </p>
            </section>

            <section className="favorites-listing">
                <div className="favorites-listing-heading">
                    <h2>Saved Properties</h2>
                    <span>{savedProperties.length} Properties</span>
                </div>

                {savedProperties.length > 0 ? (
                    <div className="favorites-grid">
                        {savedProperties.map((property) => (
                            <article className="favorite-card" key={property.id}>
                                <div className="favorite-image">
                                    <img
                                        src={property.image}
                                        alt={property.name}
                                    />

                                    <button
                                        className="remove-favorite-btn"
                                        onClick={() => toggleFavorite(property.id)}
                                        aria-label="Remove from favorites"
                                    >
                                        <Heart size={20} fill="currentColor" />
                                    </button>

                                    <span>{property.purpose}</span>
                                </div>

                                <div className="favorite-info">
                                    <p className="favorite-location">
                                        <MapPin size={15} />
                                        {property.location}
                                    </p>

                                    <h3>{property.name}</h3>

                                    <div className="favorite-details">
                                        {property.beds > 0 && (
                                            <span>
                                                <BedDouble size={16} />
                                                {property.beds} Beds
                                            </span>
                                        )}

                                        {property.baths > 0 && (
                                            <span>
                                                <Bath size={16} />
                                                {property.baths} Baths
                                            </span>
                                        )}

                                        <span>
                                            <Maximize size={15} />
                                            {property.area}
                                        </span>
                                    </div>

                                    <div className="favorite-bottom">
                                        <h4>{property.price}</h4>

                                        <Link to={`/properties/${property.id}`}>
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="empty-favorites">
                        <Heart size={42} />
                        <h3>No Favorites Yet</h3>
                        <p>
                            You haven't saved any properties yet.
                            Explore properties and add your favorites.
                        </p>
                        <Link to="/properties">Explore Properties</Link>
                    </div>
                )}
            </section>
        </main>
    );
}

export default Favorites;
