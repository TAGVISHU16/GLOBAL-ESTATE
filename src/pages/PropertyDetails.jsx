
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    MapPin,
    BedDouble,
    Bath,
    Maximize,
    ArrowLeft,
    Mail,
    X,
    ChevronLeft,
    ChevronRight
} from "lucide-react";

import { getProperties } from "../services/propertyService";
import "./PropertyDetails.css";

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

function PropertyDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeImage, setActiveImage] = useState(null);

    // Back to Properties with restoration information
    const handleBack = () => {
        navigate("/properties", {
            state: {
                fromPropertyDetails: true
            }
        });
    };

    useEffect(() => {
        let isMounted = true;

        const loadProperty = async () => {
            try {
                setLoading(true);
                setError("");

                // Fetch all available API listings
                const data = await getProperties();

                const item = data.find(
                    (property) => property.id === Number(id)
                );

                if (!isMounted) return;

                if (!item) {
                    setProperty(null);
                    return;
                }

                const images = (item.images || [])
                    .map((image) =>
                        typeof image === "string"
                            ? image
                            : image?.url || image?.src
                    )
                    .filter(Boolean);

                const transaction =
                    item.transaction?.toLowerCase() === "rent" ||
                    item.transaction?.toLowerCase() === "lease"
                        ? "Rent"
                        : "Buy";

                setProperty({
                    id: item.id,
                    name: item.title || "Untitled Property",
                    location: [item.address, item.country]
                        .filter(Boolean)
                        .join(", ") || "Location unavailable",
                    purpose: transaction,
                    images,
                    beds: item.bedrooms,
                    baths: item.bathrooms,
                    area: item.sqm ? `${item.sqm} sqm` : "N/A",
                    price: formatPrice(item.price_usd ?? item.price),
                    description:
                        item.description ||
                        "Detailed description is not available for this property."
                });

            } catch (error) {
                console.error("PROPERTY DETAILS API ERROR:", error);

                if (isMounted) {
                    setError(
                        "Unable to load property details. Please try again."
                    );
                }

            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadProperty();

        return () => {
            isMounted = false;
        };
    }, [id]);

    const galleryImages = property?.images || [];

    const showNextImage = () => {
        setActiveImage((prev) =>
            (prev + 1) % galleryImages.length
        );
    };

    const showPreviousImage = () => {
        setActiveImage((prev) =>
            (prev - 1 + galleryImages.length) % galleryImages.length
        );
    };

    // Loading State
    if (loading) {
        return (
            <main className="property-not-found">
                <h2>Loading Property Details...</h2>
            </main>
        );
    }

    // Error / Not Found State
    if (error || !property) {
        return (
            <main className="property-not-found">
                <h2>
                    {error
                        ? "Something Went Wrong"
                        : "Property Not Found"}
                </h2>

                {error && <p>{error}</p>}

                <button onClick={handleBack}>
                    <ArrowLeft size={18} />
                    Back to Properties
                </button>
            </main>
        );
    }

    return (
        <main className="property-details-page">

            {/* Back Button */}
            <button
                className="back-properties-btn"
                onClick={handleBack}
            >
                <ArrowLeft size={18} />
                Back to Properties
            </button>

            {/* Property Gallery */}
            {galleryImages.length > 0 ? (
                <div className="details-gallery">

                    <div
                        className="gallery-main-image"
                        onClick={() => setActiveImage(0)}
                    >
                        <img
                            src={galleryImages[0]}
                            alt={property.name}
                        />

                        <span>{property.purpose}</span>
                    </div>

                    <div className="gallery-side-images">

                        {galleryImages.slice(1, 4).map((image, index) => (
                            <div
                                key={index}
                                onClick={() => setActiveImage(index + 1)}
                            >
                                <img
                                    src={image}
                                    alt={`${property.name} ${index + 2}`}
                                />

                                {index === 2 && galleryImages.length > 4 && (
                                    <span>View Gallery</span>
                                )}
                            </div>
                        ))}

                    </div>
                </div>
            ) : (
                <div className="details-gallery">
                    <div className="gallery-main-image">
                        <p>Property images are not available.</p>
                    </div>
                </div>
            )}

            {/* Image Lightbox */}
            {activeImage !== null && (
                <div
                    className="gallery-lightbox"
                    onClick={() => setActiveImage(null)}
                >
                    <button
                        className="gallery-close"
                        onClick={() => setActiveImage(null)}
                    >
                        <X size={25} />
                    </button>

                    <button
                        className="gallery-arrow gallery-prev"
                        onClick={(e) => {
                            e.stopPropagation();
                            showPreviousImage();
                        }}
                    >
                        <ChevronLeft size={30} />
                    </button>

                    <img
                        src={galleryImages[activeImage]}
                        alt={property.name}
                        onClick={(e) => e.stopPropagation()}
                    />

                    <button
                        className="gallery-arrow gallery-next"
                        onClick={(e) => {
                            e.stopPropagation();
                            showNextImage();
                        }}
                    >
                        <ChevronRight size={30} />
                    </button>

                    <p>
                        {activeImage + 1} / {galleryImages.length}
                    </p>
                </div>
            )}

            {/* Property Information */}
            <section className="details-content">

                <div className="details-main">

                    <p className="details-location">
                        <MapPin size={17} />
                        {property.location}
                    </p>

                    <h1>{property.name}</h1>

                    <div className="details-features">

                        {property.beds != null && (
                            <div>
                                <BedDouble size={21} />
                                <span>{property.beds} Bedrooms</span>
                            </div>
                        )}

                        {property.baths != null && (
                            <div>
                                <Bath size={21} />
                                <span>{property.baths} Bathrooms</span>
                            </div>
                        )}

                        <div>
                            <Maximize size={20} />
                            <span>{property.area}</span>
                        </div>

                    </div>

                    <div className="details-description">
                        <h2>About This Property</h2>
                        <p>{property.description}</p>
                    </div>

                </div>

                {/* Price Card */}
                <aside className="details-price-card">

                    <span>PROPERTY PRICE</span>

                    <h2>{property.price}</h2>

                    <div className="details-divider"></div>

                    <p>Interested in this property?</p>

                    <button onClick={() => navigate("/contact")}>
                        <Mail size={18} />
                        Contact Us
                    </button>

                </aside>

            </section>

        </main>
    );
}

export default PropertyDetails;
