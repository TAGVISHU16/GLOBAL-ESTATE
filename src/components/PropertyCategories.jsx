
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import "./PropertyCategories.css";

const categories = [
    {
        name: "Apartments",
        count: "Explore Apartments",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00"
    },
    {
        name: "Villas",
        count: "Explore Villas",
        image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800"
    },
    {
        name: "Houses",
        count: "Explore Houses",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
    },
    {
        name: "Land",
        count: "Explore Land",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef"
    }
];

function PropertyCategories() {
    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        navigate(`/properties?type=${encodeURIComponent(category)}`);
    };

    return (
        <section className="categories-section">

            <div className="categories-heading">
                <div>
                    <span>EXPLORE BY CATEGORY</span>
                    <h2>Find What You're Looking For</h2>
                    <p>
                        Discover properties that match your lifestyle.
                    </p>
                </div>
            </div>

            <div className="categories-grid">

                {categories.map((category) => (
                    <article
                        className="category-card"
                        key={category.name}
                        onClick={() => handleCategoryClick(category.name)}
                    >

                        <img
                            src={category.image}
                            alt={category.name}
                        />

                        <div className="category-overlay">
                            <div>
                                <h3>{category.name}</h3>
                                <p>{category.count}</p>
                            </div>

                            <span className="category-arrow">
                                <ArrowUpRight size={19} />
                            </span>
                        </div>

                    </article>
                ))}

            </div>

        </section>
    );
}

export default PropertyCategories;
