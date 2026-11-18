
import { useState } from "react";
import {
    MapPin,
    Mail,
    Phone,
    Clock,
    Send
} from "lucide-react";

import toast from "react-hot-toast";
import "./Contact.css";

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        toast.success("Message submitted successfully!");

        setFormData({
            name: "",
            email: "",
            subject: "",
            message: ""
        });
    };

    return (
        <main className="contact-page">

            {/* CONTACT HERO */}
            <section className="contact-hero">
                <span>GET IN TOUCH</span>
                <h1>We'd Love to Hear From You</h1>
                <p>
                    Have a question or need assistance?
                    Get in touch with our team.
                </p>
            </section>

            {/* CONTACT CONTENT */}
            <section className="contact-container">

                <div className="contact-info">
                    <h2>Contact Information</h2>
                    <p>
                        Reach out to us for any questions
                        about properties or our platform.
                    </p>

                    <div className="contact-info-item">
                        <div className="contact-icon">
                            <MapPin size={21} />
                        </div>
                        <div>
                            <h3>Our Location</h3>
                            <p>Worldwide Property Network</p>
                        </div>
                    </div>

                    <div className="contact-info-item">
                        <div className="contact-icon">
                            <Mail size={21} />
                        </div>
                        <div>
                            <h3>Email Address</h3>
                            <p>hello@globalestate.com</p>
                        </div>
                    </div>

                    <div className="contact-info-item">
                        <div className="contact-icon">
                            <Phone size={21} />
                        </div>
                        <div>
                            <h3>Phone Number</h3>
                            <p>+1 234 567 890</p>
                        </div>
                    </div>

                    <div className="contact-info-item">
                        <div className="contact-icon">
                            <Clock size={21} />
                        </div>
                        <div>
                            <h3>Working Hours</h3>
                            <p>Monday - Friday, 9 AM - 6 PM</p>
                        </div>
                    </div>
                </div>

                {/* CONTACT FORM */}
                <div className="contact-form-card">
                    <h2>Send Us a Message</h2>
                    <p>Fill out the form below and we'll get back to you.</p>

                    <form onSubmit={handleSubmit}>

                        <div className="contact-form-row">
                            <div className="contact-input-group">
                                <label>Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="contact-input-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="contact-input-group">
                            <label>Subject</label>
                            <input
                                type="text"
                                name="subject"
                                placeholder="Enter subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="contact-input-group">
                            <label>Your Message</label>
                            <textarea
                                name="message"
                                placeholder="Write your message..."
                                rows="6"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="contact-submit-btn">
                            <Send size={17} />
                            Send Message
                        </button>

                    </form>
                </div>

            </section>

        </main>
    );
}

export default Contact;
