
import {
    Globe2,
    Gem,
    Search,
    ShieldCheck
} from "lucide-react";

import "./WhyChooseUs.css";

const features = [
    {
        icon: Globe2,
        title: "Worldwide Discovery",
        description:
            "Explore properties from different cities and countries around the world."
    },
    {
        icon: Gem,
        title: "Premium Collection",
        description:
            "Discover carefully selected properties with exceptional designs and locations."
    },
    {
        icon: Search,
        title: "Easy Property Search",
        description:
            "Find suitable properties with simple search and useful property filters."
    },
    {
        icon: ShieldCheck,
        title: "Trusted Experience",
        description:
            "Enjoy a smooth and organized property discovery experience."
    }
];

function WhyChooseUs() {
    return (
        <section className="why-section">

            <div className="why-heading">
                <span>THE GLOBAL ESTATE DIFFERENCE</span>
                <h2>Why Choose Us</h2>
                <p>
                    Everything you need to discover your next property,
                    all in one place.
                </p>
            </div>

            <div className="why-grid">

                {features.map((feature, index) => {
                    const Icon = feature.icon;

                    return (
                        <div className="why-card" key={feature.title}>

                            <div className="why-icon">
                                <Icon size={25} strokeWidth={1.6} />
                            </div>

                            <span className="why-number">
                                0{index + 1}
                            </span>

                            <h3>{feature.title}</h3>

                            <p>{feature.description}</p>

                        </div>
                    );
                })}

            </div>

        </section>
    );
}

export default WhyChooseUs;
