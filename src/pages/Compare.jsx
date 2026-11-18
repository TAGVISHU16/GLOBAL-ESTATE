
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    MapPin,
    BedDouble,
    Bath,
    Maximize,
    X,
    ArrowLeft
} from "lucide-react";

import { propertyData } from "../data/properties";
import { useCompare } from "../context/CompareContext";
import { getProperties } from "../services/propertyService";

import "./Compare.css";

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
        price: formatPrice(price)
    };
};

function Compare() {
    const { compareList, toggleCompare } = useCompare();

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch API Properties
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
                console.error("Compare API Error:", error);

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

    // Get Selected Properties
    const selectedProperties = properties.filter((property) =>
        compareList.some((id) => String(id) === String(property.id))
    );

    const comparisonItems = [
        {
            label: "Location",
            getValue: (property) => (
                <>
                    <MapPin size={16} />
                    {property.location}
                </>
            )
        },
        {
            label: "Price",
            getValue: (property) => property.price
        },
        {
            label: "Purpose",
            getValue: (property) => property.purpose
        },
        {
            label: "Property Type",
            getValue: (property) => property.type
        },
        {
            label: "Bedrooms",
            getValue: (property) => (
                <>
                    <BedDouble size={17} />
                    {property.beds ?? "N/A"}
                </>
            )
        },
        {
            label: "Bathrooms",
            getValue: (property) => (
                <>
                    <Bath size={17} />
                    {property.baths ?? "N/A"}
                </>
            )
        },
        {
            label: "Area",
            getValue: (property) => (
                <>
                    <Maximize size={17} />
                    {property.area}
                </>
            )
        }
    ];

    if (loading) {
        return (
            <main className="compare-page">
                <div className="compare-empty">
                    <h2>Loading Properties...</h2>
                    <p>Please wait while we load your comparison.</p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="compare-page">
                <div className="compare-empty">
                    <h2>Something Went Wrong</h2>
                    <p>{error}</p>
                    <Link to="/properties">Back to Properties</Link>
                </div>
            </main>
        );
    }

    if (selectedProperties.length === 0) {
        return (
            <main className="compare-page">
                <div className="compare-empty">
                    <h2>No Properties Selected</h2>
                    <p>
                        Select properties from the listing page
                        to compare their details.
                    </p>
                    <Link to="/properties">Explore Properties</Link>
                </div>
            </main>
        );
    }

    return (
        <main className="compare-page">

            <section className="compare-heading">
                <span>PROPERTY COMPARISON</span>
                <h1>Compare Properties</h1>
                <p>
                    Compare your selected properties and find
                    the right one for you.
                </p>
            </section>

            <Link to="/properties" className="back-to-properties">
                <ArrowLeft size={17} />
                Back to Properties
            </Link>

            <div className="comparison-table-wrapper">
                <table className="comparison-table">

                    <thead>
                        <tr>
                            <th>Property Details</th>

                            {selectedProperties.map((property) => (
                                <th key={property.id}>
                                    <div className="compare-property">

                                        <button
                                            className="remove-compare-btn"
                                            onClick={() => toggleCompare(property.id)}
                                            aria-label={`Remove ${property.name}`}
                                        >
                                            <X size={17} />
                                        </button>

                                        <img
                                            src={property.image}
                                            alt={property.name}
                                        />

                                        <h3>{property.name}</h3>

                                        <Link to={`/properties/${property.id}`}>
                                            View Details
                                        </Link>

                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {comparisonItems.map((item) => (
                            <tr key={item.label}>
                                <th>{item.label}</th>

                                {selectedProperties.map((property) => (
                                    <td key={property.id}>
                                        {item.getValue(property)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            <p className="compare-note">
                You can compare up to 3 properties at a time.
            </p>

        </main>
    );
}

export default Compare;
