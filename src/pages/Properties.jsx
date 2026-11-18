
import { useEffect, useState } from "react";
import {
    Search,
    MapPin,
    BedDouble,
    Bath,
    Maximize,
    Heart,
    GitCompareArrows
} from "lucide-react";

import { propertyData } from "../data/properties";
import "./Properties.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { useCompare } from "../context/CompareContext";
import { getProperties } from "../services/propertyService";

const PAGE_SIZE = 6;
const STORAGE_KEY = "globalEstatePropertiesState";

const formatPrice = (price) => {
    if (price === null || price === undefined || price === "") {
        return "Price on Request";
    }

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
    }).format(Number(price));
};

const formatType = (type) => {
    if (!type) return "Property";

    return type
        .replace(/_/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const formatProperty = (item) => {
    const image = item.images?.[0];

    const transaction =
        item.transaction?.toLowerCase() === "sale"
            ? "Buy"
            : item.transaction?.toLowerCase() === "rent" ||
                item.transaction?.toLowerCase() === "lease"
                ? "Rent"
                : "Buy";

    const price = item.price_usd ?? item.price;

    return {
        id: item.id,
        name: item.title || "Untitled Property",
        location: [item.address, item.country]
            .filter(Boolean)
            .join(", ") || "Location unavailable",
        image:
            typeof image === "string"
                ? image
                : image?.url || image?.src || propertyData[0]?.image,
        purpose: transaction,
        type: formatType(item.property_subtype || item.type),
        beds: item.bedrooms,
        baths: item.bathrooms,
        area: item.sqm ? `${item.sqm} sqm` : "N/A",
        price: formatPrice(price),
        priceValue: Number(price) || 0
    };
};

function Properties() {
    const navigate = useNavigate();
    const locationState = useLocation();

    // Restore only when returning from Property Details
    const [savedState] = useState(() => {
        const saved = sessionStorage.getItem(STORAGE_KEY);

        if (
            saved &&
            locationState.state?.fromPropertyDetails
        ) {
            try {
                return JSON.parse(saved);
            } catch {
                return null;
            }
        }

        // Fresh visit or hard refresh
        sessionStorage.removeItem(STORAGE_KEY);
        return null;
    });

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [visibleCount, setVisibleCount] = useState(
        savedState?.visibleCount || 6
    );

    const [purpose, setPurpose] = useState(
        savedState?.purpose || "All"
    );

    const [propertyType, setPropertyType] = useState(
        savedState?.propertyType || "All Properties"
    );

    const [location, setLocation] = useState(
        savedState?.location || ""
    );

    const [sortBy, setSortBy] = useState(
        savedState?.sortBy || "default"
    );

    const { toggleFavorite, isFavorite } = useFavorites();
    const { compareList, toggleCompare, isInCompare } = useCompare();

    // Fetch Properties
    useEffect(() => {
        let isMounted = true;

        const loadProperties = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getProperties();

                if (isMounted) {
                    setProperties(data.map(formatProperty));
                }
            } catch (error) {
                console.error("API CONNECTION FAILED:", error);

                if (isMounted) {
                    setError("Unable to load properties. Please try again.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadProperties();

        return () => {
            isMounted = false;
        };
    }, []);

    // Restore Scroll Position
    useEffect(() => {
        if (loading || !savedState) return;

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                window.scrollTo(0, savedState.scrollPosition || 0);
            });
        });

        sessionStorage.removeItem(STORAGE_KEY);

    }, [loading, savedState]);

    // Save State Before Opening Details
    const handlePropertyClick = (id) => {
        sessionStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
                visibleCount,
                purpose,
                propertyType,
                location,
                sortBy,
                scrollPosition: window.scrollY
            })
        );

        navigate(`/properties/${id}`);
    };

    // Property Types
    const propertyTypes = [
        ...new Set(properties.map((property) => property.type))
    ];

    // Filter Properties
    const filteredProperties = properties.filter((property) => {
        const matchesPurpose =
            purpose === "All" || property.purpose === purpose;

        const matchesType =
            propertyType === "All Properties" ||
            property.type === propertyType;

        const matchesLocation =
            property.location.toLowerCase().includes(location.toLowerCase());

        return matchesPurpose && matchesType && matchesLocation;
    });

    // Sort Properties
    const sortedProperties = [...filteredProperties].sort((a, b) => {
        if (sortBy === "low-high") {
            return a.priceValue - b.priceValue;
        }

        if (sortBy === "high-low") {
            return b.priceValue - a.priceValue;
        }

        if (sortBy === "newest") {
            return b.id - a.id;
        }

        return 0;
    });

    const visibleProperties = sortedProperties.slice(0, visibleCount);

    // Load More
    const handleLoadMore = () => {
        setVisibleCount((previous) => previous + PAGE_SIZE);
    };

    return (
        <main className="properties-page">

            <section className="properties-heading">
                <span>EXPLORE OUR COLLECTION</span>
                <h1>Discover Your Perfect Property</h1>
                <p>
                    Explore exceptional homes, apartments and villas
                    from destinations around the world.
                </p>
            </section>

            <section className="properties-search-section">
                <div className="properties-search-top">
                    <h2>Find Your Property</h2>
                    <Search size={21} />
                </div>

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="properties-purpose">
                        {["All", "Buy", "Rent"].map((item) => (
                            <button
                                type="button"
                                key={item}
                                className={purpose === item ? "active" : ""}
                                onClick={() => setPurpose(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    <div className="properties-search-fields">
                        <div className="properties-field">
                            <label>LOCATION</label>
                            <div>
                                <MapPin size={18} />
                                <input
                                    type="text"
                                    placeholder="Enter city or country"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="properties-field">
                            <label>PROPERTY TYPE</label>
                            <select
                                value={propertyType}
                                onChange={(e) => setPropertyType(e.target.value)}
                            >
                                <option>All Properties</option>

                                {propertyTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="properties-search-btn">
                            <Search size={18} />
                            Search
                        </button>
                    </div>
                </form>
            </section>

            <section className="properties-listing">

                <div className="properties-listing-heading">
                    <div>
                        <h2>Explore Properties</h2>
                        <p>Discover properties that match your preferences.</p>
                    </div>

                    <div className="properties-sort">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="default">Default</option>
                            <option value="low-high">Price: Low to High</option>
                            <option value="high-low">Price: High to Low</option>
                            <option value="newest">Newest First</option>
                        </select>

                        <span>{sortedProperties.length} Properties Found</span>

                        <button
                            className="go-to-compare-btn"
                            onClick={() => navigate("/compare")}
                        >
                            <GitCompareArrows size={17} />
                            Compare Properties ({compareList.length})
                        </button>
                    </div>
                </div>

                {loading && (
                    <div className="no-properties">
                        <h3>Loading Properties...</h3>
                        <p>Please wait while we fetch property listings.</p>
                    </div>
                )}

                {!loading && error && (
                    <div className="no-properties">
                        <h3>Something Went Wrong</h3>
                        <p>{error}</p>
                    </div>
                )}

                {!loading && !error && (
                    <>
                        <div className="properties-grid">

                            {visibleProperties.map((property) => (
                                <article
                                    className="listing-card"
                                    key={property.id}
                                    onClick={() => handlePropertyClick(property.id)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <div className="listing-image">

                                        <button
                                            className="favorite-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleFavorite(property.id);
                                            }}
                                        >
                                            <Heart
                                                size={20}
                                                fill={
                                                    isFavorite(property.id)
                                                        ? "currentColor"
                                                        : "none"
                                                }
                                            />
                                        </button>

                                        <img
                                            src={property.image}
                                            alt={property.name}
                                        />

                                        <span>{property.purpose}</span>
                                    </div>

                                    <div className="listing-info">

                                        <p className="listing-location">
                                            <MapPin size={14} />
                                            {property.location}
                                        </p>

                                        <h3>{property.name}</h3>

                                        <div className="listing-details">

                                            {property.beds != null && (
                                                <span>
                                                    <BedDouble size={16} />
                                                    {property.beds} Beds
                                                </span>
                                            )}

                                            {property.baths != null && (
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

                                        <div className="listing-bottom">

                                            <div>
                                                <small>PRICE</small>
                                                <h4>{property.price}</h4>
                                            </div>

                                            <button
                                                className={`compare-btn ${
                                                    isInCompare(property.id)
                                                        ? "active"
                                                        : ""
                                                }`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleCompare(property.id);
                                                }}
                                            >
                                                <GitCompareArrows size={16} />

                                                {isInCompare(property.id)
                                                    ? "Selected"
                                                    : "Compare"}
                                            </button>

                                        </div>
                                    </div>
                                </article>
                            ))}

                        </div>

                        {sortedProperties.length === 0 && (
                            <div className="no-properties">
                                <h3>No Properties Found</h3>
                                <p>Try changing your search filters.</p>
                            </div>
                        )}

                        {visibleCount < sortedProperties.length && (
                            <div className="load-more-container">
                                <button
                                    className="load-more-btn"
                                    onClick={handleLoadMore}
                                >
                                    Load More Properties
                                </button>
                            </div>
                        )}

                    </>
                )}

            </section>
        </main>
    );
}

export default Properties;
