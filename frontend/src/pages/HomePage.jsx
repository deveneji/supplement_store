import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ModernProductCard from '../components/ModernProductCard';
import HeroSection from '../components/HeroSection';


const ModernHomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchFeaturedProducts();
  }, []);
  
  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/products/featured/');
      setFeaturedProducts(response.data.slice(0, 4));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <HeroSection />
      
      {/* Category Grid - 3 Column Layout from Screenshot 101 */}
      <section className="py-16 bg-off-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Foundation<span className="text-sage">.</span> Lifestyle<span className="text-sage">.</span> Performance</h2>
          <p className="section-subtitle">
            From foundational health to peak performance - find your perfect supplement
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Foundation', 
                desc: 'Fill nutrient gaps with foundational supplements for optimal health.', 
                image: '/images/foundation.png',
                bgGradient: 'from-sage/5 to-teal/5',
                link: 'foundation'
              },
              { 
                title: 'Lifestyle', 
                desc: 'Enhance your lifestyle with products for gut health, focus, energy and more.', 
                image: '/images/lifestyle.png',
                bgGradient: 'from-teal/5 to-sage/5',
                link: 'lifestyle'
              },
              { 
                title: 'Performance', 
                desc: 'Train to be the best version of yourself with proper fuel and recovery.', 
                image: '/images/performance.png',
                bgGradient: 'from-sage/5 to-navy/5',
                link: 'performance'
              }
            ].map((category, idx) => (
              <div key={idx} className="group bg-white rounded-card overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300">
                {/* Image Container */}
                <div className={`relative h-56 overflow-hidden bg-gradient-to-br ${category.bgGradient}`}>
                  <img 
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback images if the actual images don't exist yet
                      const fallbacks = {
                        'Foundation': 'https://images.unsplash.com/photo-1579722821273-0f6c7d443f9f?w=400&h=300&fit=crop',
                        'Lifestyle': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
                        'Performance': 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop'
                      };
                      e.target.src = fallbacks[category.title];
                    }}
                  />
                  
                  {/* Overlay gradient for better text readability if needed */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Content */}
                <div className="p-6 text-center">
                  {/* Optional: Small category badge */}
                  <div className="inline-block mb-3">
                    <span className="text-xs font-medium text-sage bg-sage/10 px-3 py-1 rounded-full">
                      {category.title} Series
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-navy mb-3 group-hover:text-sage transition-colors">
                    {category.title}
                  </h3>
                  
                  <p className="text-text-light mb-5 leading-relaxed">
                    {category.desc}
                  </p>
                  
                  <Link 
                    to={`/products?category=${category.link}`} 
                    className="inline-flex items-center gap-2 text-sage font-medium hover:gap-3 transition-all duration-300 group/link"
                  >
                    Learn More 
                    <span className="text-lg group-hover/link:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Featured<span className="text-sage"> Products</span></h2>
          <p className="section-subtitle">
            Our most trusted supplements, backed by science and customer satisfaction
          </p>
          
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ModernProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Trust Signals / Certifications */}
      <section className="py-16 bg-off-white">
        <div className="container mx-auto px-4">
          <div className="trust-grid">
            <div className="trust-item">
              <div className="text-3xl mb-2">✓</div>
              <div className="font-semibold">NSF Certified</div>
              <div className="text-xs text-text-light">Third-party tested</div>
            </div>
            <div className="trust-item">
              <div className="text-3xl mb-2">🌱</div>
              <div className="font-semibold">Non-GMO</div>
              <div className="text-xs text-text-light">100% plant-based</div>
            </div>
            <div className="trust-item">
              <div className="text-3xl mb-2">🏭</div>
              <div className="font-semibold">FDA Registered</div>
              <div className="text-xs text-text-light">cGMP certified</div>
            </div>
            <div className="trust-item">
              <div className="text-3xl mb-2">💳</div>
              <div className="font-semibold">Secure Payment</div>
              <div className="text-xs text-text-light">Money-back guarantee</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials - from screenshots 113-114 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Moda<span className="text-sage"> Testimonials</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              { quote: "100% RECOMMENDED", text: "As a trainer, I have long work days. Life Performance bundle has definitely helped my energy levels.", author: "MICKLE LEWIES", rating: 4.9 },
              { quote: "FULLY SATISFIED", text: "I take Life Focus in the mornings to get my day started. No jitters, just clean energy.", author: "JULIA KARNIA", rating: 4.9 },
              { quote: "LOVELY ACTIVENESS", text: "Love the Aminos + Energy. It's smooth and feels clear. Raspberry iced tea flavor is amazing.", author: "BEN MICKLE", rating: 4.9 },
              { quote: "HIGHLY RECOMMENDED", text: "Noticeable difference in my daily energy and recovery. Will be ordering again.", author: "SARAH CHEN", rating: 4.9 }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-off-white rounded-card p-6 shadow-card">
                <div className="text-gold mb-3">★★★★★</div>
                <h4 className="font-bold text-navy mb-3">{testimonial.quote}</h4>
                <p className="text-text-light text-sm mb-4">{testimonial.text}</p>
                <p className="font-semibold text-sm">{testimonial.author}</p>
                <p className="text-xs text-text-light">{testimonial.rating} ★ Ratings</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Signup */}
      <section className="bg-navy py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-white mb-4">Subscribe Our Newsletter</h2>
          <p className="text-white/70 mb-8 max-w-md mx-auto">
            Get the latest updates on new products and exclusive offers
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Your Email Address..."
              className="form-input flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <button type="submit" className="btn-secondary border-white text-white hover:bg-white hover:text-navy">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ModernHomePage;