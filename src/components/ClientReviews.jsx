
import { Star, Quote } from "lucide-react";
import "./ClientReviews.css";

const reviews = [
    {
        name: "James Anderson",
        location: "New York, USA",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
        review: "The entire property discovery experience was smooth. I found exactly the kind of home I was looking for.",
        rating: 5
    },
    {
        name: "Sophia Williams",
        location: "London, UK",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
        review: "Beautiful property collection and a very clean platform. Exploring properties from different countries is easy.",
        rating: 5
    },
    {
        name: "Michael Brown",
        location: "Dubai, UAE",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
        review: "I really like how organized everything is. Finding properties and comparing different options feels simple.",
        rating: 5
    }
];

function ClientReviews() {
    return (
        <section className="client-reviews-section">

            <div className="reviews-heading">
                <span>CLIENT EXPERIENCES</span>
                <h2>What Our Clients Say</h2>
                <p>
                    Hear about the experiences of people exploring
                    properties with GLOBAL ESTATE.
                </p>
            </div>

            <div className="reviews-grid">

                {reviews.map((item) => (
                    <article className="review-card" key={item.name}>

                        <div className="review-top">
                            <Quote size={28} />
                            <div className="review-stars">
                                {Array.from({ length: item.rating }).map((_, i) => (
                                    <Star
                                        key={i}
                                        size={15}
                                        fill="currentColor"
                                    />
                                ))}
                            </div>
                        </div>

                        <p className="review-text">
                            "{item.review}"
                        </p>

                        <div className="review-user">

                            <img
                                src={item.image}
                                alt={item.name}
                            />

                            <div>
                                <h3>{item.name}</h3>
                                <p>{item.location}</p>
                            </div>

                        </div>

                    </article>
                ))}

            </div>

        </section>
    );
}

export default ClientReviews;
