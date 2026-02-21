import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Landing() {
    const [faqOpen, setFaqOpen] = useState(null);

    const toggleFaq = (index) => {
        setFaqOpen(faqOpen === index ? null : index);
    };

    return (
        <div className="landing-page">
            {/* Header / Nav */}
            <nav className="landing-nav">
                <div className="landing-container">
                    <div className="landing-logo">
                        <span className="icon">🚀</span>
                        <span className="logo-text">HabitFlow</span>
                    </div>
                    <div className="nav-links">
                        <Link to="/login" className="nav-btn-link">Login</Link>
                        <Link to="/signup" className="btn btn-primary btn-sm">Join Free</Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="landing-container">
                    <div className="hero-content">
                        <div className="announcement-badge">
                            <span className="badge-text">New: AI Insights 2.0 is live!</span>
                        </div>
                        <h1 className="hero-title">
                            Master Your Habits, <br />
                            <span className="accent-text">Level Up Your Life.</span>
                        </h1>
                        <p className="hero-subtitle">
                            The science-backed way to build better routines and stick to them.
                            Simplify your growth with powerful tracking and beautiful analytics.
                        </p>
                        <div className="hero-actions">
                            <Link to="/signup" className="btn btn-primary btn-lg ripple">Get Started — It's Free</Link>
                            <Link to="/login" className="btn btn-ghost btn-lg">View Demo</Link>
                        </div>

                    </div>

                    {/* Floating Decorative Cards */}
                    <div className="hero-visual-enhanced">
                        <div className="floating-card card-1">
                            <div className="card-icon">🔥</div>
                            <div className="card-info">
                                <span>Current Streak</span>
                                <strong>12 Days</strong>
                            </div>
                        </div>
                        <div className="floating-card card-2">
                            <div className="card-icon">📊</div>
                            <div className="card-info">
                                <span>Consistency</span>
                                <strong>94%</strong>
                            </div>
                        </div>
                        <div className="floating-card card-3">
                            <div className="card-icon">✅</div>
                            <div className="card-info">
                                <span>Habits Done</span>
                                <strong>5 / 6</strong>
                            </div>
                        </div>
                        <div className="hero-mockup-main">
                            <img
                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                                alt="Dashboard Analytics Preview"
                                className="hero-mockup-img"
                            />
                        </div>
                    </div>
                </div>

                {/* Background Decor */}
                <div className="hero-glow hero-glow-1"></div>
                <div className="hero-glow hero-glow-2"></div>
                <div className="hero-grid-pattern"></div>
            </section>

            {/* Logo Cloud / Trust Bar moved below visuals */}
            <section className="trust-section">
                <div className="landing-container">
                    <p className="trust-text">Trusted by over 10,000+ high achievers</p>
                    <div className="trust-logos">
                        <span className="trust-logo">ProductHunt</span>
                        <span className="trust-logo">TechCrunch</span>
                        <span className="trust-logo">IndieHackers</span>
                        <span className="trust-logo">YCombinator</span>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works">
                <div className="landing-container">
                    <div className="section-header">
                        <span className="section-tag">Simple 3-Step Process</span>
                        <h2 className="section-title">How HabitFlow Works</h2>
                    </div>
                    <div className="steps-grid">
                        <div className="step-item">
                            <div className="step-image">
                                <img src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=600&q=80" alt="Planning habits" />
                            </div>
                            <div className="step-number">01</div>
                            <h3>Define Your Habits</h3>
                            <p>Categorize and prioritize the routines that matter most to your growth.</p>
                        </div>
                        <div className="step-item">
                            <div className="step-image">
                                <img src="https://images.unsplash.com/photo-1543286386-2e659306cd6c?auto=format&fit=crop&w=600&q=80" alt="Tracking progress" />
                            </div>
                            <div className="step-number">02</div>
                            <h3>Track Daily Progress</h3>
                            <p>Consistency is key. One-tap tracking makes it easy to stay on course.</p>
                        </div>
                        <div className="step-item">
                            <div className="step-image">
                                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80" alt="Analyzing data" />
                            </div>
                            <div className="step-number">03</div>
                            <h3>Analyze & Improve</h3>
                            <p>Use our data-driven insights to find patterns and crush your goals.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="landing-container">
                    <div className="section-header">
                        <span className="section-tag">Powerful Features</span>
                        <h2 className="section-title">Everything you need to succeed.</h2>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon-wrapper">📊</div>
                            <h3>Analytics Dashboard</h3>
                            <p>Deep dive into your progress with heatmaps, charts, and weekly trends.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon-wrapper">🔥</div>
                            <h3>Streak Protection</h3>
                            <p>Never lose your momentum. Our system motivates you to keep going every day.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon-wrapper">🎨</div>
                            <h3>Customized Themes</h3>
                            <p>Midnight, OLED, or Light mode. Choose the look that fits your workflow.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon-wrapper">🔒</div>
                            <h3>Private & Secure</h3>
                            <p>Your data is yours. We use high-end encryption to keep your habits private.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials-section">
                <div className="landing-container">
                    <div className="section-header">
                        <span className="section-tag">User Stories</span>
                        <h2 className="section-title">Loved by thousands.</h2>
                    </div>
                    <div className="testimonials-grid">
                        <div className="testimonial-card">
                            <p className="testimonial-text">"HabitFlow changed my life. I've never been this consistent with my morning routine."</p>
                            <div className="testimonial-user">
                                <div className="user-avatar">JD</div>
                                <div>
                                    <strong>Jane Doe</strong>
                                    <span>Product Designer</span>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-card">
                            <p className="testimonial-text">"The analytics are mind-blowing. Seeing my heatmap green is such a huge motivator."</p>
                            <div className="testimonial-user">
                                <div className="user-avatar">MS</div>
                                <div>
                                    <strong>Mike Smith</strong>
                                    <span>Software Engineer</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="faq-section">
                <div className="landing-container">
                    <div className="section-header">
                        <h2 className="section-title">Common Questions</h2>
                    </div>
                    <div className="faq-list">
                        {[
                            { q: "Is HabitFlow free to use?", a: "Yes! The core features of HabitFlow are completely free for everyone." },
                            { q: "Can I use it on my phone?", a: "HabitFlow is a fully responsive web app, meaning it works perfectly on mobile browsers." },
                            { q: "Is my data secure?", a: "Yes, we use Supabase with row-level security to ensure only you can access your data." }
                        ].map((item, id) => (
                            <div key={id} className={`faq-item ${faqOpen === id ? 'open' : ''}`} onClick={() => toggleFaq(id)}>
                                <div className="faq-question">
                                    <h3>{item.q}</h3>
                                    <span className="faq-icon">{faqOpen === id ? '−' : '+'}</span>
                                </div>
                                <div className="faq-answer">
                                    <p>{item.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="landing-container">
                    <div className="cta-card">
                        <h2 className="cta-title">Ready to level up?</h2>
                        <p className="cta-subtitle">Start your journey toward a better you today. No credit card required.</p>
                        <Link to="/signup" className="btn btn-primary btn-lg">Get Started Now</Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="landing-container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <span className="logo-text">HabitFlow</span>
                            <p>Building better routines, one day at a time.</p>
                        </div>
                        <div className="footer-links">
                            <div className="link-group">
                                <h4>Product</h4>
                                <Link to="/signup">Features</Link>
                                <Link to="/analytics">Analytics</Link>
                            </div>
                            <div className="link-group">
                                <h4>Support</h4>
                                <Link to="/settings">Settings</Link>
                                <Link to="/login">Account</Link>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2026 HabitFlow Technologies. Built for achievers.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
