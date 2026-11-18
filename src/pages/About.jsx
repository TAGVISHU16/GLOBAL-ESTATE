
import {
    Globe2,
    ShieldCheck,
    House,
    Users
} from "lucide-react";

import "./About.css";

function About() {
    return (
        <main className="about-page">

            {/* ABOUT HERO */}
            <section className="about-hero">
                <span>ABOUT GLOBAL ESTATE</span>
                <h1>Making Your Property Journey Simple</h1>
                <p>
                    We help people discover exceptional properties
                    and find spaces they are proud to call home.
                </p>
            </section>

            {/* OUR STORY */}
            <section className="about-story">
                <div className="about-story-image">
                    <img
                        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000"
                        alt="Modern luxury home"
                    />
                </div>

                <div className="about-story-content">
                    <span>OUR STORY</span>
                    <h2>Creating Better Ways to Find Your Home</h2>

                    <p>
                        GLOBAL ESTATE is a real estate platform
                        designed to make property discovery easier
                        and more convenient.
                    </p>

                    <p>
                        From modern apartments to beautiful villas
                        and residential properties, we bring
                        different property options together in
                        one place.
                    </p>
                </div>
            </section>

            {/* MISSION & VISION */}
            <section className="about-purpose">
                <div className="purpose-card">
                    <h2>Our Mission</h2>
                    <p>
                        To make property searching simple,
                        accessible and convenient for everyone.
                    </p>
                </div>

                <div className="purpose-card">
                    <h2>Our Vision</h2>
                    <p>
                        To create a trusted platform where people
                        can explore property opportunities worldwide.
                    </p>
                </div>
            </section>

            {/* WHY CHOOSE US */}
            <section className="about-why">
                <div className="about-section-heading">
                    <span>WHY GLOBAL ESTATE</span>
                    <h2>What Makes Us Different</h2>
                </div>

                <div className="about-why-grid">

                    <div className="about-why-card">
                        <Globe2 size={30} />
                        <h3>Global Reach</h3>
                        <p>
                            Explore property opportunities
                            across different destinations.
                        </p>
                    </div>

                    <div className="about-why-card">
                        <ShieldCheck size={30} />
                        <h3>Trusted Experience</h3>
                        <p>
                            Enjoy a simple and organised
                            property discovery experience.
                        </p>
                    </div>

                    <div className="about-why-card">
                        <House size={30} />
                        <h3>Property Choices</h3>
                        <p>
                            Discover apartments, houses,
                            villas and more.
                        </p>
                    </div>

                    <div className="about-why-card">
                        <Users size={30} />
                        <h3>User Focused</h3>
                        <p>
                            Designed to make your property
                            search more convenient.
                        </p>
                    </div>

                </div>
            </section>

        </main>
    );
}

export default About;
