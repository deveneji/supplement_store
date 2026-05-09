import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Product Info */}
          <div>
            {/* Welcome Badge */}
            <div className="inline-block mb-4">
              <span className="text-sm font-medium text-sage bg-sage/10 px-4 py-1.5 rounded-full">
                Welcome to VitalityPlus
              </span>
            </div>
            
            {/* Product Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-3">
              Life Omega<span className="text-sage">.</span>
            </h1>
            
            {/* Subtitle / Tagline */}
            <p className="text-lg text-text-light mb-4">
              EPA & DHA
            </p>
            
            {/* Description */}
            <p className="text-text-body leading-relaxed mb-6 max-w-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            
            {/* Price and CTA */}
            <div className="flex items-center gap-4 mb-6">
              <div>
                <span className="text-3xl font-bold text-navy">$49.99</span>
                <span className="text-text-light line-through ml-2">$79.99</span>
              </div>
              <Link to="/products" className="btn-primary">
                Add to Cart
              </Link>
            </div>
            
            {/* Rating */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-5 h-5 ${i < 4 ? 'text-gold' : 'text-border'} fill-current`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <span className="text-text-light">4.5 Ratings Of 5 Stars</span>
            </div>
            
            {/* Social Media Follow */}
            <div className="flex items-center gap-4">
              <span className="text-text-body font-medium">Follow Us On Social Media:</span>
              <div className="flex gap-3">
                <a href="#" className="w-8 h-8 bg-off-white rounded-full flex items-center justify-center text-navy hover:bg-sage hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 bg-off-white rounded-full flex items-center justify-center text-navy hover:bg-sage hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.5-5.732 3.916 3.916 0 00.209-2.6 10.14 10.14 0 002.33-2.427z" />
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 bg-off-white rounded-full flex items-center justify-center text-navy hover:bg-sage hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Right Side - Product Image */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-sage/5 to-teal/5 rounded-2xl p-8 flex items-center justify-center min-h-[400px]">
              <img 
                src='/images/hero-section.png'
                alt="Life Omega"
                className="max-w-full h-auto max-h-96 object-contain"
              />
            </div>
            
            {/* Floating Badge - EPA & DHA */}
            <div className="absolute -top-4 -right-4 bg-white rounded-full shadow-lg px-4 py-2 flex items-center gap-2">
              <span className="text-2xl">🐟</span>
              <div>
                <div className="font-bold text-navy text-sm">LIFE OMEGA</div>
                <div className="text-xs text-text-light">EPA & DHA</div>
              </div>
            </div>
            
            {/* Floating Badge Bottom */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-full shadow-lg px-4 py-2 flex items-center gap-2">
              <span className="text-2xl">🍋</span>
              <div>
                <div className="font-bold text-navy text-sm">Lemon</div>
                <div className="text-xs text-text-light">Best for Joint Health</div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;