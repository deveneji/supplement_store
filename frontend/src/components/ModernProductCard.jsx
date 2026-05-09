import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ModernProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  return (
    <div className="product-card group">
      <Link to={`/product/${product.slug}`}>
        <div className="relative aspect-square bg-off-white flex items-center justify-center p-6">
          {product.image ? (
            <img 
              src={`http://localhost:8000${product.image}`}
              alt={product.name}
              className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <span className="text-6xl">💊</span>
          )}
          
          {/* Certification Badge */}
          {product.is_featured && (
            <div className="absolute top-3 left-3">
              <span className="cert-badge">⭐ NSF Certified</span>
            </div>
          )}
          
          {/* Discount Badge */}
          {product.discount_percentage > 0 && (
            <div className="absolute top-3 right-3">
              <span className="cert-badge-gold">-{product.discount_percentage}%</span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-5">
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-semibold text-lg mb-2 text-navy hover:text-sage transition line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        {/* Star Rating */}
        <div className="star-rating mb-3">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < 4 ? "star-filled" : "star-empty"}>★</span>
          ))}
          <span className="text-xs text-text-light ml-2">4.8 (128)</span>
        </div>
        
        <p className="text-text-light text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        {/* Free From Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs text-sage bg-sage/10 px-2 py-0.5 rounded">Non-GMO</span>
          <span className="text-xs text-sage bg-sage/10 px-2 py-0.5 rounded">No Gluten</span>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div>
            <span className="text-2xl font-bold text-navy">${product.price}</span>
            {product.original_price && (
              <span className="text-text-light line-through text-sm ml-2">
                ${product.original_price}
              </span>
            )}
          </div>
          <button
            onClick={() => addToCart(product, 1)}
            className="bg-navy text-white px-4 py-2 rounded-button text-sm font-medium hover:bg-opacity-90 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModernProductCard;